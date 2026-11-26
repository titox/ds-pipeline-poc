#!/usr/bin/env node
// Builds the hand-off folder for one component: what gets attached to the Jira story.
//   node build-handoff.mjs <Name> [output folder, default docs/handoff]
// Copies the RubyLint JSON contract and Markdown from docs/components/ and the
// exported illustrations (PNG) from docs/pages/img/<Name>/ into <output>/<Name>/,
// and writes a README.md that lists the files. Run export-illustrations.mjs first.
// It stops if any of the three parts is missing, so a story never goes out incomplete.
import fs from "node:fs";
import path from "node:path";

const [name, outArg] = process.argv.slice(2);
if (!name) {
  console.error("usage: build-handoff.mjs <Name> [output folder]");
  process.exit(1);
}
const contract = path.join("docs/components", `${name}.contract.json`);
const spec = path.join("docs/components", `${name}.md`);
const imgDir = path.join("docs/pages/img", name);
const images = fs.existsSync(imgDir) ? fs.readdirSync(imgDir).filter((f) => f.endsWith(".png")).sort() : [];
const missing = [
  !fs.existsSync(contract) && contract,
  !fs.existsSync(spec) && spec,
  !images.length && `${imgDir}/*.png (run export-illustrations.mjs)`,
  !images.some((f) => f.startsWith("anatomy")) && images.length && "an anatomy illustration",
  !images.some((f) => f.startsWith("do-")) && images.length && "a do illustration",
  !images.some((f) => f.startsWith("dont-")) && images.length && "a don't illustration",
].filter(Boolean);
if (missing.length) {
  console.error(`Hand-off for ${name} is incomplete. Missing:\n- ${missing.join("\n- ")}`);
  process.exit(1);
}
const out = path.join(outArg || "docs/handoff", name);
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, "img"), { recursive: true });
fs.copyFileSync(contract, path.join(out, path.basename(contract)));
fs.copyFileSync(spec, path.join(out, path.basename(spec)));
for (const f of images) fs.copyFileSync(path.join(imgDir, f), path.join(out, "img", f));
const exportedAt = JSON.parse(fs.readFileSync(contract, "utf8")).exportedAt || "unknown";
fs.writeFileSync(
  path.join(out, "README.md"),
  [
    `# Hand-off: ${name.replace(/-/g, " ")}`,
    "",
    "Attach every file in this folder to the Jira story.",
    "",
    `- \`${path.basename(contract)}\`: JSON contract (exported ${exportedAt})`,
    `- \`${path.basename(spec)}\`: Markdown specification`,
    ...images.map((f) => `- \`img/${f}\``),
    "",
  ].join("\n"),
);
console.log(`${out}: contract, specification and ${images.length} illustrations`);
