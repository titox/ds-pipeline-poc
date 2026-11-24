// Writes component descriptions from docs/components/DESCRIPTIONS.md to Figma.
//
// Usage: npm run descriptions -- [figma file link] [--dry-run]
//
// Each "## <Figma component name>" section becomes the description of the
// component set (or standalone component) with that exact name. Components
// without a section are left untouched. Runs through the Desktop Bridge plugin,
// so the file must be open in Figma Desktop with the plugin running.
import { readFileSync } from "node:fs";
import path from "node:path";
import { connectBridge, parseFigmaTarget } from "./bridge.mjs";

const root = path.resolve(import.meta.dirname, "../..");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const link = args.find((a) => !a.startsWith("--"));
const { fileKey } = link ? parseFigmaTarget(link) : { fileKey: null };

// Parse sections. Figma shows plain text, so drop Markdown code marks.
const source = readFileSync(path.join(root, "docs/components/DESCRIPTIONS.md"), "utf8");
const sections = {};
for (const part of source.split(/^## /m).slice(1)) {
  const [title, ...body] = part.split("\n");
  sections[title.trim()] = body.join("\n").replace(/`/g, "").trim();
}
const names = Object.keys(sections);
if (!names.length) {
  console.log("No sections in DESCRIPTIONS.md, nothing to write.");
  process.exit(0);
}
console.log(`${names.length} description(s): ${names.join(", ")}${dryRun ? " (dry run)" : ""}`);

const bridge = await connectBridge(fileKey);
try {
  const report = await bridge.run(`
    const wanted = ${JSON.stringify(sections)};
    const dryRun = ${dryRun};
    const out = { set: [], unchanged: [], missing: [], duplicate: [] };
    const found = {};
    await figma.loadAllPagesAsync();
    for (const page of figma.root.children) {
      for (const n of page.findAllWithCriteria({ types: ["COMPONENT_SET", "COMPONENT"] })) {
        if (n.type === "COMPONENT" && n.parent.type === "COMPONENT_SET") continue;
        if (!(n.name in wanted)) continue;
        (found[n.name] = found[n.name] || []).push(n);
      }
    }
    for (const name of Object.keys(wanted)) {
      const nodes = found[name] || [];
      if (!nodes.length) { out.missing.push(name); continue; }
      if (nodes.length > 1) { out.duplicate.push(name + " (" + nodes.map(n => n.id).join(", ") + ")"); continue; }
      const node = nodes[0];
      if (node.description === wanted[name]) { out.unchanged.push(name); continue; }
      if (!dryRun) node.description = wanted[name];
      out.set.push(name + " (" + node.id + ")");
    }
    return out;
  `);
  if (report.set.length) console.log(`${dryRun ? "Would set" : "Set"}: ${report.set.join(", ")}`);
  if (report.unchanged.length) console.log(`Unchanged: ${report.unchanged.join(", ")}`);
  if (report.missing.length) console.log(`Not found in Figma: ${report.missing.join(", ")}`);
  if (report.duplicate.length) console.log(`Skipped, name used more than once: ${report.duplicate.join(", ")}`);
  if (report.missing.length || report.duplicate.length) process.exitCode = 1;
} finally {
  bridge.close();
}
