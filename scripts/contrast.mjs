// Contrast check on the colour tokens. Run with: npm run contrast
//   npm run contrast                  every pair, writes docs/contrast.md
//   npm run contrast -- <Name>        only the tokens of one component (docs/components/<Name>.contract.json), printed
//   add --strict                      exit code 1 if a pair that is not exempt fails
// Pairs come from the rules in scripts/contrast-pairs.json and the token names in src/theme.css.
// Light and dark are both measured. Nobody edits docs/contrast.md by hand.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const strict = args.includes("--strict");
const componentArg = args.find((a) => !a.startsWith("--"));

const config = JSON.parse(fs.readFileSync(path.join(root, "scripts/contrast-pairs.json"), "utf8"));
const theme = fs.readFileSync(path.join(root, "src/theme.css"), "utf8");

// --- Read the tokens of each mode ------------------------------------------------

// The dark values sit inside one @media (prefers-color-scheme: dark) block; everything else is light.
function splitModes(css) {
  const start = css.indexOf("@media (prefers-color-scheme: dark)");
  if (start === -1) return { light: css, dark: "" };
  let depth = 0;
  let end = -1;
  for (let i = css.indexOf("{", start); i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}" && --depth === 0) {
      end = i;
      break;
    }
  }
  return { light: css.slice(0, start) + css.slice(end + 1), dark: css.slice(start, end + 1) };
}
const declarations = (css) =>
  new Map([...css.matchAll(/(--sds-[a-z0-9-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));

const parts = splitModes(theme);
const light = declarations(parts.light);
const dark = new Map([...light, ...declarations(parts.dark)]);
const modes = { Light: light, Dark: dark };

function resolve(map, name, seen = new Set()) {
  const value = map.get(name);
  if (!value || seen.has(name)) return null;
  const ref = value.match(/^var\((--sds-[a-z0-9-]+)\)$/);
  return ref ? resolve(map, ref[1], seen.add(name)) : value;
}

// --- Colour maths (WCAG 2) ---------------------------------------------------------

function parseHex(hex) {
  const h = hex?.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i);
  if (!h) return null;
  const n = (i) => parseInt(h[1].slice(i, i + 2), 16);
  return { r: n(0), g: n(2), b: n(4), a: h[2] ? parseInt(h[2], 16) / 255 : 1 };
}
const over = (top, under) => ({
  r: top.r * top.a + under.r * (1 - top.a),
  g: top.g * top.a + under.g * (1 - top.a),
  b: top.b * top.a + under.b * (1 - top.a),
  a: 1,
});
function luminance({ r, g, b }) {
  const c = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function ratio(fg, bg) {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

// --- Build the pairs from the token names -------------------------------------------

const names = [...light.keys()].filter((n) => /^--sds-color-(text|icon|border|background)-/.test(n)).map((n) => n.replace("--sds-color-", ""));
const has = (n) => light.has(`--sds-color-${n}`);
const skipped = (n) => config.skip.some((s) => n.includes(`-${s}-`));
const exempt = (...tokens) => tokens.some((n) => config.exempt.some((e) => n.includes(e)));

const pairs = [];
for (const name of names) {
  if (skipped(name)) continue;
  const [kind, ...rest] = name.split("-");
  if (kind === "background") continue;
  const tail = rest.join("-");
  const on = tail.match(/^([a-z]+)-on-\1(?:-(secondary|tertiary))?$/);
  if (kind === "border") {
    for (const bg of config.surfaces) pairs.push({ fg: name, bg, kind, rule: "border-on-surface" });
  } else if (on) {
    const base = `background-${on[1]}-${on[2] ?? "default"}`;
    const hover = on[2] ? `${base}-hover` : `background-${on[1]}-hover`;
    for (const bg of [base, hover]) if (has(bg)) pairs.push({ fg: name, bg, kind, rule: "on-colour" });
  } else {
    for (const bg of config.surfaces) pairs.push({ fg: name, bg, kind, rule: "on-surface" });
  }
}

// --- Measure ------------------------------------------------------------------------

function measure(pair, mode) {
  const map = modes[mode];
  const page = parseHex(resolve(map, "--sds-color-background-default-default"));
  const bgRaw = parseHex(resolve(map, `--sds-color-${pair.bg}`));
  const fgRaw = parseHex(resolve(map, `--sds-color-${pair.fg}`));
  if (!page || !bgRaw || !fgRaw) return { ...pair, mode, result: "Not measured", ratio: null };
  const bg = over(bgRaw, page);
  const value = ratio(over(fgRaw, bg), bg);
  const minimum = config.minimums[pair.kind];
  const result = value >= minimum ? "Pass" : exempt(pair.fg, pair.bg) ? "Exempt" : "Fail";
  return { ...pair, mode, minimum, ratio: value, result, fgHex: resolve(map, `--sds-color-${pair.fg}`), bgHex: resolve(map, `--sds-color-${pair.bg}`) };
}
let rows = pairs.flatMap((p) => Object.keys(modes).map((mode) => measure(p, mode)));

// --- One component: keep only the colours its contract names --------------------------

const figmaName = (n) => n.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
const kebab = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

if (componentArg) {
  const file = path.join(root, "docs/components", `${componentArg}.contract.json`);
  if (!fs.existsSync(file)) {
    console.log(`error no contract at docs/components/${componentArg}.contract.json`);
    process.exit(1);
  }
  const contract = JSON.parse(fs.readFileSync(file, "utf8"));
  const used = new Set((contract.tokens?.colors ?? []).filter((t) => t.isActualToken).map((t) => kebab(t.name)));
  // A foreground the component uses, against a background it uses. The page surface always counts.
  rows = rows.filter((r) => used.has(r.fg) && (used.has(r.bg) || r.bg === config.surfaces[0]));
  console.log(`contrast: ${contract.component}, ${used.size} colour tokens in the contract (exported ${contract.exportedAt?.slice(0, 10)})`);
  for (const r of rows.filter((r) => r.result !== "Pass")) {
    console.log(`${r.result === "Fail" ? "fail " : "note "} ${r.mode.padEnd(5)} ${r.fg} on ${r.bg}: ${r.ratio.toFixed(2)}:1, minimum ${r.minimum}:1${r.result === "Exempt" ? " (disabled, exempt)" : ""}`);
  }
  const fails = rows.filter((r) => r.result === "Fail").length;
  console.log(`contrast: ${rows.length} pairs measured, ${fails} below the minimum. The pairs are built from token names; which layers really sit on which is read from Figma.`);
  process.exit(strict && fails ? 1 : 0);
}

// --- Whole system: write docs/contrast.md ----------------------------------------------

const count = (mode, result) => rows.filter((r) => r.mode === mode && r.result === result).length;
const line = (r) => `| ${r.fg} | ${r.bg} | ${r.kind} | ${r.ratio.toFixed(2)}:1 | ${r.minimum}:1 | ${r.fgHex} on ${r.bgHex} |`;
const table = (list) =>
  list.length
    ? ["| Foreground | Background | Kind | Measured | Minimum | Values |", "|---|---|---|---|---|---|", ...list.map(line)].join("\n")
    : "None.";
const byRatio = (a, b) => a.ratio - b.ratio;

const out = [
  "# Contrast of the colour tokens",
  "",
  "Generated by `npm run contrast` from `src/theme.css` and the rules in `scripts/contrast-pairs.json`. Do not edit by hand.",
  "",
  "Minimums (WCAG 2.2 AA): text 4.5:1, icons and borders 3:1. Tokens with `disabled` in the name are exempt and listed apart.",
  "",
  "The pairs are built from the token names. A pair listed here may not be used by any component: to see only the pairs of one component, run `npm run contrast -- <Name>`.",
  "",
  "## Rules",
  "",
  ...config.rules.map((r) => `- **${r.id}:** ${r.what}`),
  `- **Surfaces:** ${config.surfaces.map(figmaName).join(", ")}.`,
  "",
  "## Summary",
  "",
  "| Mode | Pairs | Pass | Fail | Exempt |",
  "|---|---|---|---|---|",
  ...Object.keys(modes).map((m) => `| ${m} | ${rows.filter((r) => r.mode === m).length} | ${count(m, "Pass")} | ${count(m, "Fail")} | ${count(m, "Exempt")} |`),
  "",
  ...Object.keys(modes).flatMap((m) => [
    `## ${m}: below the minimum`,
    "",
    table(rows.filter((r) => r.mode === m && r.result === "Fail").sort(byRatio)),
    "",
    `## ${m}: exempt (disabled)`,
    "",
    table(rows.filter((r) => r.mode === m && r.result === "Exempt").sort(byRatio)),
    "",
  ]),
  "## Every pair that passes",
  "",
  "| Mode | Foreground | Background | Measured | Minimum |",
  "|---|---|---|---|---|",
  ...rows.filter((r) => r.result === "Pass").map((r) => `| ${r.mode} | ${r.fg} | ${r.bg} | ${r.ratio.toFixed(2)}:1 | ${r.minimum}:1 |`),
  "",
].join("\n");

fs.writeFileSync(path.join(root, "docs/contrast.md"), out);
const fails = rows.filter((r) => r.result === "Fail").length;
const unmeasured = rows.filter((r) => r.result === "Not measured").length;
console.log(`contrast: ${rows.length} pairs in light and dark, ${fails} below the minimum, ${unmeasured} not measured. Written to docs/contrast.md`);
process.exit(strict && fails ? 1 : 0);
