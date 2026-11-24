# Design System Pipeline PoC

This repo tests one idea: a design system can move from Figma to production code through a pipeline that checks itself, with very little hand copying in between.

It is a proof of concept, not a product. The demo is a recorded video, not a live system.

- Storybook: https://titox.github.io/ds-pipeline-poc/storybook/

## What we want to find out

Design and code usually drift apart. Someone changes a colour in Figma, someone else forgets to update the CSS, and a month later nobody knows which one is right.

We want to see if we can stop that with a small set of rules:

- Figma is where design decisions are made.
- Tokens are exported from Figma by a script. Nobody edits `src/theme.css` by hand.
- Components only use tokens, never raw hex or pixel values.
- Every component in code is linked back to its Figma component with Code Connect.
- Checks run before anything is published, so a mismatch shows up as a failed build and not as a surprise in review.

## The pipeline

1. **Figma.** Components, variables and modes live in one file.
2. **Tokens.** A script turns Figma variables into CSS custom properties (`--sds-*`).
3. **Docs.** The RubyLint plugin audits components in Figma and exports a Markdown and JSON description of each one.
4. **Code.** React components consume the tokens. The JSON contract says which props and tokens they should have.
5. **Checks.** Token lint, a contract check and the type checker run in CI.
6. **Storybook.** Every component has stories, with switches for brand and mode.
7. **Code Connect.** Figma shows the real code snippet next to each component.
8. **Supernova.** Connected for reading. Its place in the flow is still undecided.

The full step-by-step for a new or changed component is in [docs/PROCESS.md](./docs/PROCESS.md).

## Scope

- Web and React only. iOS and Android are out of scope.
- Four themes: two brands, each with a Light and a Dark mode.
- The second brand uses a fictional placeholder palette. No real branding is used anywhere.
- The Figma file is a modified copy of the Figma Simple Design System.

## Where things are

| Path | What it holds |
| --- | --- |
| `src/ui/` | Components, layout, hooks and icons |
| `src/theme.css` | Generated tokens |
| `src/figma/` | Code Connect files |
| `src/stories/` | Storybook stories |
| `scripts/` | Token, icon and dev resource scripts |
| `docs/` | Process notes and component docs |
| `figma.config.json` | Figma URLs used by Code Connect |

## Running it

```sh
npm install
npm run storybook     # Storybook at localhost:6006
npm run app:dev       # demo app at localhost:8000
npm run script:tokens # regenerate src/theme.css
```

Code Connect and the REST scripts need a Figma access token. Copy `.env-rename` to `.env` and set `FIGMA_ACCESS_TOKEN` and `FIGMA_FILE_KEY`. The file is ignored by git.

## Credits

Built on [figma/sds](https://github.com/figma/sds), the Simple Design System by Figma, used under its original licence.
