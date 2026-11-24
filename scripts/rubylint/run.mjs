// Runs the RubyLint audit on a Figma component from the command line and writes
// the same exports the plugin produces: Markdown spec, JSON contract, Jira spec.
//
// Usage: node scripts/rubylint/run.mjs <figma-url-or-node-id> [--out dir] [--raw]
//
// How it works:
// 1. Bundles the RubyLint audit code (scripts/rubylint/build.mjs).
// 2. Opens a local server on a free port in 9223-9232. The Figma Desktop Bridge
//    plugin scans that range and connects; the bundle runs in Figma through it.
//    No Figma REST API call and no AI provider call.
// 3. Feeds the result to the plugin's own UI page in headless Chromium and calls
//    its export functions, so the files match what the plugin exports.
//
// Needs: Figma Desktop with the Desktop Bridge plugin open in the target file,
// a local RubyLint checkout (RUBYLINT_DIR, default ~/RubyLint).

import http from "node:http";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { WebSocketServer } from "ws";
import { chromium } from "playwright-core";
import { build, RUBYLINT_DIR } from "./build.mjs";

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith("--"));
const outIdx = args.indexOf("--out");
const outDir = outIdx >= 0 ? args[outIdx + 1] : "rubylint-out";
const keepRaw = args.includes("--raw");
if (!target) {
  console.error("Usage: node scripts/rubylint/run.mjs <figma-url-or-node-id> [--out dir] [--raw]");
  process.exit(1);
}

// Accept a full Figma link or a bare node id ("2136:2263" or "2136-2263").
function parseTarget(value) {
  let fileKey = null;
  let nodeId = value;
  if (/^https?:\/\//.test(value)) {
    const url = new URL(value);
    fileKey = url.pathname.match(/\/(?:design|file|proto)\/([^/]+)/)?.[1] ?? null;
    nodeId = url.searchParams.get("node-id");
    if (!nodeId) throw new Error("The link has no node-id. Right-click the component in Figma, Copy link to selection.");
  }
  return { fileKey, nodeId: nodeId.replace("-", ":") };
}

const { fileKey, nodeId } = parseTarget(target);
const bundle = readFileSync(await build(), "utf8");

// --- Bridge server -----------------------------------------------------------

const TIMEOUT_MS = 180_000;

function listen(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      if (req.url === "/health") {
        res.writeHead(200, { "content-type": "application/json", "access-control-allow-origin": "*" });
        res.end(JSON.stringify({ status: "ok", version: "rubylint-runner", clients: 0 }));
      } else {
        res.writeHead(404).end();
      }
    });
    server.once("error", reject);
    server.listen(port, "::1", () => resolve(server)); // Figma resolves localhost to ::1; binding it also detects busy ports
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

const { server, port } = await openServer();
const wss = new WebSocketServer({ server });
console.log(`Waiting for the Figma Desktop Bridge on port ${port} (it rescans every 10 s)...`);

const result = await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error("Timed out. Is the Desktop Bridge plugin open in the right file?")), TIMEOUT_MS);
  let sent = false;
  wss.on("connection", (ws) => {
    console.log("Bridge connected.");
    ws.on("message", (buf) => {
      const msg = JSON.parse(buf.toString());
      if (msg.type === "FILE_INFO" && !sent) {
        const info = msg.data || {};
        if (fileKey && info.fileKey && info.fileKey !== fileKey) return; // another open file
        sent = true;
        console.log(`Connected to "${info.fileName}". Running the audit on ${nodeId}...`);
        ws.send(JSON.stringify({
          id: "rubylint-1",
          method: "EXECUTE_CODE",
          params: { code: `${bundle}\nreturn await __rubylint.run(${JSON.stringify(nodeId)});`, timeout: TIMEOUT_MS - 10_000 },
        }));
      } else if (msg.id === "rubylint-1") {
        clearTimeout(timer);
        if (msg.error) return reject(new Error(msg.error));
        const r = msg.result || {};
        if (r.success === false) return reject(new Error(r.error || "Audit failed"));
        resolve(r.result ?? r);
      }
    });
  });
}).finally(() => {
  for (const c of wss.clients) c.close(1000, "Manual disconnect");
  wss.close();
  server.close();
});

// --- Exports through the plugin's own UI code ---------------------------------

const browser = await chromium.launch();
const page = await browser.newPage();
page.on("pageerror", () => {}); // the UI expects a Figma host; ignore its startup errors
await page.goto(pathToFileURL(path.join(RUBYLINT_DIR, "ui-enhanced.html")).href);
const exports = await page.evaluate((data) => {
  window.dispatchEvent(new MessageEvent("message", { data: { pluginMessage: { type: "enhanced-analysis-result", data } } }));
  // eslint-disable-next-line no-undef
  const meta = currentMetadata;
  if (!meta) throw new Error("The plugin UI did not accept the result");
  return {
    markdown: generateMarkdownDocumentation(meta), // eslint-disable-line no-undef
    json: JSON.stringify(buildJsonExport(), null, 2), // eslint-disable-line no-undef
    jira: generateHandoffSpec(meta), // eslint-disable-line no-undef
  };
}, result);
await browser.close();

const name = (result.analyzedNode?.name || nodeId).replace(/[^\w-]+/g, "-").replace(/^-|-$/g, "");
mkdirSync(outDir, { recursive: true });
const files = {
  [`${name}.md`]: exports.markdown,
  [`${name}.contract.json`]: exports.json + "\n",
  [`${name}.jira.md`]: exports.jira,
};
if (keepRaw) files[`${name}.raw.json`] = JSON.stringify(result, null, 2) + "\n";
for (const [file, body] of Object.entries(files)) writeFileSync(path.join(outDir, file), body);
console.log(`Wrote ${Object.keys(files).map((f) => path.join(outDir, f)).join(", ")}`);
