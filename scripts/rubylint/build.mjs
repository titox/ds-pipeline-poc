// Bundles the RubyLint audit code into a headless script that runs through the
// Figma Desktop Bridge. No plugin window, no AI provider, no knowledge service.
//
// Usage: node scripts/rubylint/build.mjs
// Env:   RUBYLINT_DIR (default ~/RubyLint), path to a local RubyLint checkout.

import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const RUBYLINT_DIR = process.env.RUBYLINT_DIR || path.join(homedir(), "RubyLint");
export const OUT_FILE = path.join(here, ".build", "headless.js");

// Entry point: resolve the node the same way the plugin does, then run the
// local-only analysis (aiEnabled and the knowledge service both off).
const entry = `
import { processEnhancedAnalysis, extractComponentContext } from "./core/component-analyzer";
import { isValidNodeForAnalysis } from "./utils/figma-helpers";

async function resolve(node) {
  if (node.type === "INSTANCE") node = (await node.getMainComponentAsync()) || node;
  if (node.type === "COMPONENT" && node.parent && node.parent.type === "COMPONENT_SET") node = node.parent;
  return node;
}

export async function run(nodeId) {
  const raw = await figma.getNodeByIdAsync(nodeId);
  if (!raw) throw new Error("Node not found: " + nodeId);
  if (raw.type === "PAGE" || raw.type === "DOCUMENT") throw new Error("Link points at a page, not a component: " + raw.name);
  const node = await resolve(raw);
  if (!isValidNodeForAnalysis(node)) throw new Error("Not an analysable node: " + node.type);
  const context = await extractComponentContext(node);
  const result = await processEnhancedAnalysis(context, "", "", {
    batchMode: false,
    enableAudit: true,
    includeTokenAnalysis: true,
    enableMCPEnhancement: false,
    useMCP: false,
    aiEnabled: false,
    node,
  }, "anthropic");
  return {
    ...result,
    analyzedNodeId: node.id,
    analyzedNode: { id: node.id, name: node.name, type: node.type },
    analyzedAt: Date.now(),
    fromCache: false,
    fileKey: figma.fileKey || null,
  };
}
`;

// Headless: the plugin's UI messages have no receiver, so turn them into no-ops.
const noUiMessages = {
  name: "no-ui-messages",
  setup(build) {
    build.onLoad({ filter: /utils[\\/]figma-helpers\.ts$/ }, (args) => ({
      contents: readFileSync(args.path, "utf8").replace(
        /export function sendMessageToUI\(([^)]*)\)[^{]*\{/,
        "export function sendMessageToUI($1): void { return;",
      ),
      loader: "ts",
    }));
  },
};

export async function build() {
  const require = createRequire(path.join(RUBYLINT_DIR, "package.json"));
  const esbuild = require("esbuild");
  mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  await esbuild.build({
    stdin: { contents: entry, resolveDir: path.join(RUBYLINT_DIR, "src"), loader: "ts", sourcefile: "headless.ts" },
    bundle: true,
    outfile: OUT_FILE,
    platform: "neutral",
    target: "es2017",
    format: "iife",
    globalName: "__rubylint",
    define: { __DEBUG__: "false" },
    plugins: [noUiMessages],
    logLevel: "warning",
  });
  return OUT_FILE;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = await build();
  console.log(`built ${path.relative(process.cwd(), out)} from ${RUBYLINT_DIR}`);
}
