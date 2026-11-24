// Talks to Figma through the Desktop Bridge plugin without the Figma REST API.
// Opens a local server on a free port in 9223-9232; the plugin scans that range,
// connects within about 10 seconds and runs the code we send in the open file.
import http from "node:http";
import { WebSocketServer } from "ws";

export const TIMEOUT_MS = 180_000;

function listen(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      if (req.url === "/health") {
        res.writeHead(200, { "content-type": "application/json", "access-control-allow-origin": "*" });
        res.end(JSON.stringify({ status: "ok", version: "ds-poc-bridge", clients: 0 }));
      } else {
        res.writeHead(404).end();
      }
    });
    server.once("error", reject);
    // Figma resolves localhost to ::1; binding it also detects ports taken by other sessions.
    server.listen(port, "::1", () => resolve(server));
  });
}

async function openServer() {
  for (let port = 9223; port <= 9232; port++) {
    try {
      return { server: await listen(port), port };
    } catch {
      /* port busy, try the next one */
    }
  }
  throw new Error("No free port in 9223-9232 (close an unused Figma MCP session).");
}

/** Accepts a Figma link or a bare node id. Returns { fileKey, nodeId }. */
export function parseFigmaTarget(value) {
  let fileKey = null;
  let nodeId = value;
  if (/^https?:\/\//.test(value)) {
    const url = new URL(value);
    fileKey = url.pathname.match(/\/(?:design|file|proto)\/([^/]+)/)?.[1] ?? null;
    nodeId = url.searchParams.get("node-id");
  }
  return { fileKey, nodeId: nodeId ? nodeId.replace("-", ":") : null };
}

/**
 * Waits for the bridge of the given file (any file if fileKey is null).
 * Returns { run(code), close() }. `run` executes plugin-API code and resolves with its return value.
 */
export async function connectBridge(fileKey) {
  const { server, port } = await openServer();
  const wss = new WebSocketServer({ server });
  const close = () => {
    for (const c of wss.clients) c.close(1000, "Manual disconnect");
    wss.close();
    server.close();
  };
  console.log(`Waiting for the Figma Desktop Bridge on port ${port} (it rescans every 10 s)...`);

  try {
    const run = await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("Timed out. Is the Desktop Bridge plugin open in the right file?")), 60_000);
      wss.on("connection", (ws) => {
        const pending = new Map();
        let seq = 0;
        ws.on("message", (buf) => {
          const msg = JSON.parse(buf.toString());
          if (msg.type === "FILE_INFO") {
            const info = msg.data || {};
            if (fileKey && info.fileKey && info.fileKey !== fileKey) return; // another open file
            clearTimeout(timer);
            console.log(`Connected to "${info.fileName}".`);
            resolve((code) => new Promise((res, rej) => {
              const id = `ds-poc-${++seq}`;
              pending.set(id, { res, rej });
              ws.send(JSON.stringify({ id, method: "EXECUTE_CODE", params: { code, timeout: TIMEOUT_MS } }));
            }));
          } else if (pending.has(msg.id)) {
            const { res, rej } = pending.get(msg.id);
            pending.delete(msg.id);
            const r = msg.result || {};
            if (msg.error || r.success === false) rej(new Error(msg.error || r.error || "Bridge call failed"));
            else res(r.result ?? r);
          }
        });
      });
    });
    return { run, close };
  } catch (e) {
    close();
    throw e;
  }
}
