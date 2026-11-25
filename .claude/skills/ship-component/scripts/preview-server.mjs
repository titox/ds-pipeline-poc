#!/usr/bin/env node
// Local preview server for documentation pages.
//   node preview-server.mjs <docs-root> [port]
// Serves <docs-root> as static files, serves the edit script at /__editable.js,
// and accepts POST /__edits?page=<Name> to save the designer's text edits to
// <docs-root>/pages/<Name>.edits.json. Listens on localhost only.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(process.argv[2] || "docs");
const port = Number(process.argv[3] || 6100);
const editable = path.join(here, "..", "assets", "editable.js");
const MAX_BODY = 1024 * 1024;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(body);
}

function saveEdits(req, res, url) {
  const page = url.searchParams.get("page") || "";
  if (!/^[A-Za-z0-9-]+$/.test(page)) return send(res, 400, "Bad page name");
  // Only the preview page itself may post edits.
  const origin = req.headers.origin;
  if (origin && origin !== `http://localhost:${port}` && origin !== `http://127.0.0.1:${port}`) {
    return send(res, 403, "Forbidden");
  }
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
    if (body.length > MAX_BODY) req.destroy();
  });
  req.on("end", () => {
    let data;
    try {
      data = JSON.parse(body);
    } catch {
      return send(res, 400, "Not JSON");
    }
    if (!Array.isArray(data.edits)) return send(res, 400, "Missing edits");
    const edits = data.edits
      .filter((e) => e && typeof e.key === "string" && typeof e.before === "string" && typeof e.after === "string")
      .map(({ key, before, after }) => ({ key, before, after }));
    const dir = path.join(root, "pages");
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${page}.edits.json`);
    fs.writeFileSync(file, JSON.stringify({ page, savedAt: new Date().toISOString(), edits }, null, 2) + "\n");
    console.log(`saved ${edits.length} edit(s) to ${file}`);
    send(res, 200, JSON.stringify({ saved: edits.length }), types[".json"]);
  });
}

http
  .createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${port}`);
    if (req.method === "POST" && url.pathname === "/__edits") return saveEdits(req, res, url);
    if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, "Method not allowed");
    const file =
      url.pathname === "/__editable.js" ? editable : path.resolve(root, "." + decodeURIComponent(url.pathname));
    if (file !== editable && file !== root && !file.startsWith(root + path.sep)) return send(res, 403, "Forbidden");
    fs.readFile(file, (err, data) => {
      if (err) return send(res, 404, "Not found");
      send(res, 200, data, types[path.extname(file)] || "application/octet-stream");
    });
  })
  .listen(port, "127.0.0.1", () => console.log(`docs preview on http://localhost:${port} (root ${root})`));
