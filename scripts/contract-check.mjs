// Contract check. Run with: npm run check:contracts
// Compares each RubyLint JSON contract (docs/components/*.contract.json) with the code:
//   1. Figma properties <-> Code Connect mapping (src/figma/**/*.figma.ts)
//   2. Code Connect props <-> React component props (TypeScript)
//   3. Figma tokens <-> src/theme.css
// Errors fail the build. Warnings are listed for review.
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const rel = (p) => path.relative(root, p);
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
const nodeIdOf = (url) => (url?.match(/node-id=([\d]+[-:][\d]+)/)?.[1] ?? "").replace("-", ":");

// --- Inputs ------------------------------------------------------------------

const contractDir = path.join(root, "docs/components");
const contracts = fs.existsSync(contractDir)
  ? fs.readdirSync(contractDir).filter((f) => f.endsWith(".contract.json")).map((f) => {
      const file = path.join(contractDir, f);
      return { file, data: JSON.parse(fs.readFileSync(file, "utf8")) };
    })
  : [];

const config = JSON.parse(fs.readFileSync(path.join(root, "figma.config.json"), "utf8"));
const substitutions = config.codeConnect.documentUrlSubstitutions || {};

// Code Connect files indexed by Figma node id.
const codeConnect = new Map();
for (const file of walk(path.join(root, "src/figma")).filter((f) => f.endsWith(".figma.ts"))) {
  const text = fs.readFileSync(file, "utf8");
  const header = (key) => text.match(new RegExp(`^// ${key}=(.+)$`, "m"))?.[1].trim();
  const url = header("url");
  const id = nodeIdOf(substitutions[url] ?? url);
  if (id) codeConnect.set(id, { file, text, component: header("component"), source: header("source") });
}

const theme = fs.readFileSync(path.join(root, "src/theme.css"), "utf8");
const themeVars = [...new Set([...theme.matchAll(/(--sds-[a-z0-9-]+)\s*:/g)].map((m) => m[1]))];

// --- Code Connect parsing ----------------------------------------------------

// Reads the object literal that starts at text[start] ("{") and returns its top-level keys.
function objectKeys(text, start) {
  const keys = [];
  let depth = 0;
  let quote = null;
  let token = "";
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (quote) {
      if (c === "\\") i++;
      else if (c === quote) quote = null;
      if (depth === 1) token += c;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      quote = c;
      if (depth === 1) token += c;
      continue;
    }
    if (c === "{" || c === "(" || c === "[") depth++;
    else if (c === "}" || c === ")" || c === "]") {
      depth--;
      if (depth === 0) break;
    } else if (depth === 1 && c === ":") {
      const key = token.trim().replace(/^["']|["']$/g, "");
      if (key) keys.push(key);
      token = "";
      continue;
    } else if (depth === 1 && c === ",") {
      token = "";
      continue;
    }
    if (depth === 1 && !(c === "{" && token === "")) token += c;
  }
  return keys;
}

function parseCodeConnect(text) {
  const props = new Map(); // Figma property -> Set of mapped values (enum keys)
  const re = /instance\.(getEnum|getBoolean|getString|getPropertyValue|getInstanceSwap)\(\s*["']([^"']+)["']\s*(,\s*\{)?/g;
  for (const m of text.matchAll(re)) {
    const [, method, name, hasMap] = m;
    if (!props.has(name)) props.set(name, { method, values: new Set() });
    if (method === "getEnum" && hasMap) {
      for (const k of objectKeys(text, m.index + m[0].length - 1)) {
        if (k !== "default") props.get(name).values.add(k);
      }
    }
  }
  // React props written by the template: renderProp("x", ...) and literal x= / x={ attributes.
  const codeProps = new Set([...text.matchAll(/\brp\(\s*["']([A-Za-z]\w*)["']/g)].map((m) => m[1]));
  for (const tpl of text.matchAll(/figma\.code`([\s\S]*?)`\s*,/g)) {
    const body = tpl[1].replace(/\$\{[^}]*\}/g, " ");
    for (const a of body.matchAll(/\s([a-z][A-Za-z0-9]*)=["{]/g)) codeProps.add(a[1]);
  }
  return { props, codeProps };
}

// --- React props through TypeScript -------------------------------------------

const tsconfigPath = ts.findConfigFile(root, ts.sys.fileExists, "tsconfig.app.json") || ts.findConfigFile(root, ts.sys.fileExists);
const parsedConfig = ts.parseJsonConfigFileContent(ts.readConfigFile(tsconfigPath, ts.sys.readFile).config, ts.sys, path.dirname(tsconfigPath));

const sourceFiles = new Set();
for (const cc of codeConnect.values()) {
  const local = cc.source?.match(/\/blob\/[^/]+\/(.+)$/)?.[1];
  if (local && fs.existsSync(path.join(root, local))) {
    cc.sourceFile = path.join(root, local);
    sourceFiles.add(cc.sourceFile);
  }
}
const program = ts.createProgram([...sourceFiles], { ...parsedConfig.options, noEmit: true });
const checker = program.getTypeChecker();

// Returns a function that says whether the component accepts a prop, or null if not found.
function propsOf(sourceFile, componentName) {
  const sf = program.getSourceFile(sourceFile);
  if (!sf) return null;
  const symbol = checker.getExportsOfModule(checker.getSymbolAtLocation(sf)).find((s) => s.name === componentName);
  if (!symbol) return null;
  const type = checker.getTypeOfSymbolAtLocation(symbol, sf);
  const signature = type.getCallSignatures()[0];
  const param = signature?.getParameters()[0];
  if (!param) return null;
  const propsType = checker.getTypeOfSymbolAtLocation(param, sf);
  const members = propsType.isUnion() ? propsType.types : [propsType];
  return (name) => members.some((t) => checker.getPropertyOfType(checker.getApparentType(t), name));
}

// --- Token names ----------------------------------------------------------------

// Figma "Border/Disabled/default" or style "Body Base" -> CSS suffix "border-disabled-default".
const kebab = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const tokenExists = (name) => {
  const suffix = kebab(name);
  return themeVars.some((v) => v === `--sds-${suffix}` || v.endsWith(`-${suffix}`));
};

// --- Checks ---------------------------------------------------------------------

if (!contracts.length) warnings.push("No contracts in docs/components/. Run npm run rubylint first.");

for (const { file, data } of contracts) {
  const where = rel(file);
  const name = data.component;
  const nodeId = nodeIdOf(data.figmaUrl);
  const figmaProps = new Map((data.properties || []).map((p) => [p.name, p]));
  const cc = codeConnect.get(nodeId);

  // 1. Figma properties <-> Code Connect
  if (!cc) {
    warnings.push(`${where}: ${name} has no Code Connect file (node ${nodeId})`);
  } else {
    const { props, codeProps } = parseCodeConnect(cc.text);
    for (const [prop, { values }] of props) {
      const figma = figmaProps.get(prop);
      if (!figma) {
        errors.push(`${rel(cc.file)}: maps Figma property "${prop}", which ${name} no longer has`);
        continue;
      }
      for (const v of values) {
        if (!figma.values.includes(v)) {
          errors.push(`${rel(cc.file)}: maps "${prop}=${v}", but ${name} only has ${figma.values.join(", ")}`);
        }
      }
    }
    for (const prop of figmaProps.keys()) {
      if (!props.has(prop)) warnings.push(`${where}: Figma property "${prop}" is not mapped in ${rel(cc.file)}`);
    }

    // 2. Code Connect props <-> React component
    const accepts = cc.sourceFile && cc.component ? propsOf(cc.sourceFile, cc.component) : null;
    if (!accepts) {
      warnings.push(`${rel(cc.file)}: could not resolve React component "${cc.component}" from source= header`);
    } else {
      for (const p of codeProps) {
        if (p !== "key" && !accepts(p)) {
          errors.push(`${rel(cc.file)}: writes prop "${p}", which ${cc.component} does not accept`);
        }
      }
    }
  }

  // 3. Figma tokens <-> theme.css
  const tokens = Object.entries(data.tokens || {})
    .filter(([k, v]) => k !== "summary" && Array.isArray(v))
    .flatMap(([, v]) => v);
  for (const t of tokens) {
    if (t.isActualToken && !tokenExists(t.name)) {
      errors.push(`${where}: token "${t.name}" is used in Figma but missing from src/theme.css`);
    } else if (!t.isToken) {
      warnings.push(`${where}: hard-coded ${t.type || "value"} ${t.value} in Figma`);
    }
  }
}

// --- Report -----------------------------------------------------------------------

for (const e of new Set(errors)) console.log(`error ${e}`);
for (const w of new Set(warnings)) console.log(`warn  ${w}`);
console.log(`contract check: ${contracts.length} contracts, ${new Set(errors).size} errors, ${new Set(warnings).size} warnings`);
process.exit(errors.length ? 1 : 0);
