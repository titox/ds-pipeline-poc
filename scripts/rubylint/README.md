# RubyLint headless runner

Runs the RubyLint audit on a Figma component from the terminal. It writes the same three exports as the plugin: Markdown spec, JSON contract and Jira spec.

No AI provider is called and no Figma REST API quota is used. The audit runs inside Figma through the Desktop Bridge plugin.

## Run

```bash
npm run rubylint -- "<figma link to the component>"
```

Get the link in Figma: right-click the component, Copy link to selection. A bare node id (`2136:2263`) also works.

Options:
- `--out <dir>`: output folder (default `rubylint-out/`, git-ignored until the export location is decided).
- `--raw`: also write the raw audit result.

Output for a component named "Input Field": `Input-Field.md`, `Input-Field.contract.json`, `Input-Field.jira.md`.

## Needs

- Figma Desktop with the Desktop Bridge plugin open in the file that holds the component.
- A local RubyLint checkout. Default `~/RubyLint`, override with `RUBYLINT_DIR`.
- A free port in 9223-9232. Each open Claude session with the Figma MCP takes one.

## How it works

1. `build.mjs` bundles the RubyLint audit code with esbuild. Messages to the plugin window become no-ops. The AI step and the knowledge service are off.
2. `run.mjs` opens a small server on a free port. The bridge finds it within about 10 seconds and runs the bundle in Figma.
3. The result goes to the plugin's own UI page in headless Chromium. Its export functions write the files, so the output matches the plugin.

## Limits

- Same output as the plugin with no API key saved: no AI-written prose.
- If RubyLint changes, the next run rebuilds the bundle automatically. If the plugin renames its export functions (`generateMarkdownDocumentation`, `buildJsonExport`, `generateHandoffSpec`), update `run.mjs`.
