#!/usr/bin/env node
// Exports the Figma illustration frames of one documentation page as PNG files.
//   node export-illustrations.mjs docs/pages/<Name>.md [scale]
// Reads the frame ids from the source file (the "## Images" table, the do-dont
// table and the anatomy image block), asks the Figma REST API for a PNG of each
// at 4x (frames are 640 by 400, so files are 2560 by 1600), and writes them to
// docs/pages/img/<Name>/. docs/pages/img/index.json maps each node id to its file.
// Needs FIGMA_ACCESS_TOKEN in the environment (set -a; . ./.env; set +a). The file
// key comes from docs/pages/supernova.config.json, not from .env.
// It reads the file as saved in Figma's cloud: wait a few seconds after a change.
import fs from "node:fs";
import path from "node:path";

const [src, scaleArg] = process.argv.slice(2);
const token = process.env.FIGMA_ACCESS_TOKEN;
if (!src || !token) {
  console.error("usage: FIGMA_ACCESS_TOKEN=... export-illustrations.mjs docs/pages/<Name>.md [scale 1-4, default 4]");
  process.exit(1);
}
const scale = Math.min(4, Math.max(1, Number(scaleArg) || 4));
const name = path.basename(src, ".md");
const dir = path.dirname(src);
const key = JSON.parse(fs.readFileSync(path.join(dir, "supernova.config.json"), "utf8")).figmaFileKey;
const ids = [...new Set(fs.readFileSync(src, "utf8").match(/\b\d{3,5}:\d{3,6}\b/g) || [])].filter(
  (id) => id !== (fs.readFileSync(src, "utf8").match(/^figmaNode:\s*"?([\d:]+)/m) || [])[1],
);
if (!ids.length) {
  console.error(`No illustration frame ids in ${src}. Build the frames first (SKILL.md, step 12a).`);
  process.exit(1);
}
const api = async (url) => {
  const res = await fetch(url, { headers: { "X-Figma-Token": token } });
  if (!res.ok) throw new Error(`Figma API ${res.status} for ${url.split("?")[0]}`);
  return res.json();
};
const slug = (s) => s.toLowerCase().replace(/don't/g, "dont").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const q = encodeURIComponent(ids.join(","));
const nodes = (await api(`https://api.figma.com/v1/files/${key}/nodes?ids=${q}&depth=1`)).nodes;
const frames = ids.filter((id) => /^(Do|Don't|Anatomy) \//.test(nodes[id]?.document?.name || ""));
const skipped = ids.filter((id) => !frames.includes(id));
if (skipped.length) console.log(`skipped (not an illustration frame): ${skipped.join(", ")}`);
const images = (await api(`https://api.figma.com/v1/images/${key}?ids=${encodeURIComponent(frames.join(","))}&scale=${scale}&format=png`)).images;
const outDir = path.join(dir, "img", name);
fs.mkdirSync(outDir, { recursive: true });
const indexPath = path.join(dir, "img", "index.json");
const index = fs.existsSync(indexPath) ? JSON.parse(fs.readFileSync(indexPath, "utf8")) : { note: "", images: {} };
index.note = "Illustrations exported from Figma as PNG at 4x (frames are 640 by 400, files 2560 by 1600). Regenerate with export-illustrations.mjs after a design change.";
for (const id of frames) {
  if (!images[id]) throw new Error(`Figma returned no image for ${id}`);
  const title = nodes[id].document.name;
  const file = `${slug(title)}.png`;
  const data = Buffer.from(await (await fetch(images[id])).arrayBuffer());
  fs.writeFileSync(path.join(outDir, file), data);
  index.images[id] = { file: `img/${name}/${file}`, frame: title, scale };
  console.log(`img/${name}/${file} ${Math.round(data.length / 1024)} KB`);
}
fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + "\n");
console.log(`${frames.length} files at ${scale}x`);
