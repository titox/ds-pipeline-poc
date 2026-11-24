// Token lint. Run with: npm run lint:tokens
// Errors fail the build. Warnings are listed for review.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const errors = [];
const warnings = [];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}
const rel = (p) => path.relative(root, p);

const theme = fs.readFileSync(path.join(root, "src/theme.css"), "utf8");
const defined = new Set([...theme.matchAll(/(--sds-[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
const themeTokens = new Set(defined);

const files = walk(path.join(root, "src")).filter(
  (f) =>
    /\.(css|tsx?)$/.test(f) &&
    !f.endsWith("theme.css") &&
    !f.includes(`${path.sep}icons${path.sep}`) &&
    !f.endsWith(".figma.tsx") &&
    !f.endsWith(".figma.ts"),
);

// custom properties declared by hand in other stylesheets (e.g. responsive.css) also count as defined
for (const f of files.filter((f) => f.endsWith(".css"))) {
  for (const m of fs.readFileSync(f, "utf8").matchAll(/(--sds-[a-z0-9-]+)\s*:/g)) defined.add(m[1]);
}

const hex = /#[0-9a-fA-F]{3,8}\b/g;
const fn = /\b(?:rgb|rgba|hsl|hsla)\(/g;
const px = /(?<![\w.-])(\d*\.?\d+)px\b/g;

for (const file of files) {
  const isStyle = file.endsWith(".css");
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const where = `${rel(file)}:${i + 1}`;
    for (const m of line.matchAll(/var\((--sds-[a-z0-9-]+)/g)) {
      if (m[1].endsWith("-")) continue; // built dynamically, e.g. space-${n}
      if (!defined.has(m[1])) errors.push(`${where} unknown token ${m[1]}`);
    }
    if (!isStyle && !file.includes(`${path.sep}ui${path.sep}`)) return;
    const code = line.replace(/\/\*.*?\*\//g, "").replace(/\/\/.*$/, "");
    if (/^\s*(\*|\/\*)/.test(line)) return;
    if (hex.test(code) || fn.test(code)) errors.push(`${where} raw colour: ${line.trim()}`);
    hex.lastIndex = fn.lastIndex = 0;
    for (const m of code.matchAll(px)) {
      if (Number(m[1]) !== 0 && Number(m[1]) !== 1) {
        warnings.push(`${where} raw px: ${line.trim()}`);
        break;
      }
    }
  });
}

// tokens.json must only carry the modes Figma has today
const tokens = JSON.parse(fs.readFileSync(path.join(root, "scripts/tokens/tokens.json"), "utf8"));
const colorModes = tokens["@color"]?.$extensions?.["com.figma.sds"]?.modes ?? [];
const expected = ["sds_light", "sds_dark"];
if (JSON.stringify(colorModes) !== JSON.stringify(expected)) {
  errors.push(`tokens.json @color modes are ${JSON.stringify(colorModes)}, expected ${JSON.stringify(expected)}`);
}

// every colour token in tokens.json must exist in theme.css
(function w(o, p) {
  for (const k in o) {
    if (k.startsWith("$")) continue;
    const n = o[k];
    const np = [...p, k];
    if (n.$value !== undefined) {
      if (np[0] === "@color" || np[0] === "@color_primitives") {
        const name = "--sds-color-" + np.slice(1).join("-");
        if (!themeTokens.has(name)) errors.push(`tokens.json ${np.join(".")} missing from theme.css (${name}). Run npm run script:tokens`);
      }
    } else w(n, np);
  }
})(tokens, []);

warnings.slice(0, 15).forEach((w) => console.warn("warn ", w));
if (warnings.length > 15) console.warn(`warn  ... and ${warnings.length - 15} more raw px values`);
errors.forEach((e) => console.error("error", e));
console.log(`token lint: ${files.length} files, ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
