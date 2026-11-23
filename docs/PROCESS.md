# Design System Pipeline PoC: Process Runbook

Living document. Each step records what we did, why, how to repeat it, and how to verify it.
Placeholders: `<account>` = GitHub account, `<repo>` = repository name, `<FIGMA_FILE_KEY>` = Figma file key.

## Goal and scope

Demonstrate an end-to-end design system pipeline:
Figma → tokens → documentation (RubyLint plugin) → Storybook → Code Connect, with Supernova as source of truth.

- Target (long term): Web React, iOS, Android and other devices, multi-themed.
- This PoC: **Web React only**, 2 brands × 2 modes (Light, Dark) = 4 theme combinations.
- Base: Figma's open-source Simple Design System (SDS), modified, with Code Connect.

## Status

| # | Step | Status |
|---|------|--------|
| 1 | Clone SDS and publish to own GitHub | Done |
| 2 | Publish Storybook on GitHub Pages | Done |
| 3 | Anonymise repo, URLs and history | Done |
| 4 | Update the welcome story | Done |
| 5 | Read the Figma system | Done |
| 6 | Project rules (`CLAUDE.md`) | Done |
| 7 | Token lint | Next |
| 8 | Repoint Code Connect to the modified Figma file | Planned |
| 9 | Fix type errors (`Button.tsx`, `Tag.figma.ts`) | Planned |
| 10 | Multi-theming: Brand collection, `data-brand` + `data-theme`, Storybook switches | Planned |
| 11 | RubyLint documentation export | Planned (destination TODO) |
| 12 | Contract check: RubyLint JSON vs code props and tokens, run in CI | Planned |
| 13 | Demo scenarios: update an existing component and create a new one | Planned |
| 14 | Record the demo as a video (no live demo) | Planned |
| 15 | Supernova as source of truth | Blocked: workspace not set up; position in the flow undecided |

| 5b | Improve the Figma file first: audit every component with RubyLint, add missing states, regenerate documentation | In progress |
| 16 | Later, once everything else is done: improve Figma, Storybook, Code Connect and add interactive prototyping | Parked |

## Figma improvement pilot (Button, Input Field)

State standard for interactive components: Default, Hover, Focus, Disabled, plus Error for form fields and Loading for buttons.
Pressed and Active are out of scope. Selected states such as Tab "Active" stay.

Done so far:
- Button: added `State=Loading` (spinner icon before the label, end icon hidden), 6 variants.
- Input Field: added `State=Hover` (`Border/Default/Secondary`) and `State=Focus`, 2 variants each.
- New token `Border/Focus/Default` (Color collection, Light and Dark, stroke scope, code syntax `--sds-color-border-focus-default`).
  Reason: Button Focus used `Icon/Danger/Tertiary`, an icon status token, as a ring colour. Button Focus and Input Focus now use the new token; the look is unchanged.

- `theme.css` regenerated: `border.focus.default` was added to `scripts/tokens/tokens.json` by a targeted edit, then `node app.mjs --skip-rest-api` (run from `scripts/tokens`, with `FIGMA_FILE_KEY` set) produced `--sds-color-border-focus-default`.
  Caveat: the committed `tokens.json` has a third Color mode (`brand_b_light`) that the Figma copy lacks, so it is out of sync. A full re-export with `scripts/tokens/figma-plugin-token-json` is needed to resync.

Still to do for the pilot: re-run RubyLint (manual, in Figma) to regenerate the handoff text, then update Code Connect and Storybook.

## Tooling upgrades

- Storybook upgraded from 8.6 to 10.6.8 (`npx storybook@latest upgrade`), with `@storybook/addon-mcp` added. Leftover v8 packages removed. Build passes.
- MCP endpoint: `http://localhost:6006/mcp`, only while `npm run storybook` runs. Not registered in Claude Code yet (`claude mcp add --transport http storybook http://localhost:6006/mcp`).
- Playwright installed (`@playwright/test`, `playwright.config.ts`, example spec in `tests/`). Not used yet. Plan: add `@storybook/addon-vitest` (peer of the MCP addon) and axe checks once Button and Input stories have the new states.
- Registry note: always install with `npm_config_registry=https://registry.npmjs.org/`, otherwise a corporate registry URL ends up in `package-lock.json`.

## Next session

1. Check the Pages deploy for the Storybook 10 build; re-run it if it fails with "No artifacts named github-pages".
1b. Register the Storybook MCP in Claude Code (needs user consent) and add `@storybook/addon-vitest`.
2. Decide what to do with `brand_b_light` (use it as the base of the second brand, or drop it) and do the full token re-export.
3. Code Connect for the new states (Button Loading, Input Hover/Focus) and repoint URLs in `figma.config.json` to the modified Figma file.
4. Storybook stories for the new states; token lint; contract check script; fix `Button.tsx` and `Tag.figma.ts` type errors.
5. Roll the state standard out to the remaining interactive components, then re-run RubyLint (manual).
6. Open questions: Supernova position and access; where RubyLint exports live; focus ring colour is still the same red as error (distinct colour wanted).

## Target demo flow

1. Create or update a component in Figma.
2. Audit with RubyLint: documentation in Figma, a JSON contract, and a specification for Jira.
3. Handoff: the specification goes to Jira (pasted manually in the PoC).
4. Code is generated from the specification, following the existing repo conventions.
5. Contract check, token lint and tests pass in CI.
6. Storybook is updated and published.
7. Supernova (position still to be decided).

Known risks: Supernova is untested and on the critical path; tokens must flow alongside components; deploys can need a re-run.

## 1. Clone SDS and publish to own GitHub

Why: start from a maintained React + Code Connect + Storybook reference.

```bash
git clone https://github.com/figma/sds.git sds
cd sds
git remote rename origin upstream          # keep a link to the original
gh repo create <repo> --public --source . --remote origin --push
```

Verify: the repo exists on GitHub and `git remote -v` shows `origin` (yours) and `upstream` (Figma).

Note: clone outside restricted or synced folders if your environment blocks writes to `.git`.

## 2. Publish Storybook on GitHub Pages

The repo already ships a workflow (`.github/workflows/main.yml`) that builds Storybook into `dist/storybook` and deploys `dist/`.

```bash
gh api -X POST repos/<account>/<repo>/pages -f build_type=workflow
```

Verify: the workflow run succeeds and `https://<account>.github.io/<repo>/storybook/` returns 200.

Known issues:
- The first deploy can fail with "No artifacts named github-pages"; re-running the workflow fixed it.
- `npm run build` chains steps with `;`, so Storybook deploys even though the app build fails on type errors (step 9).

## 3. Anonymise

Why: the PoC is public, so it must not expose client or personal details.

- Repo name must be neutral (renamed with `gh repo rename`).
- Commits authored with a neutral identity; amended and force-pushed:
  `git -c user.name="DS PoC" -c user.email="noreply@users.noreply.github.com" commit --amend --reset-author`
- Search the repo for client, company and personal names before every push.
- Limit: GitHub Pages URLs always contain the account name. A neutral org or a private repo is the only way around it.

## 4. Welcome story

`src/stories/_welcome/Hello.stories.tsx` describes the PoC, with white text on the red `danger` token
(`--sds-color-background-danger-default` and `--sds-color-text-danger-on-danger`).

## 5. Read the Figma system

Connection: Figma console MCP with the Desktop Bridge plugin open in the target file.

Findings:
- 347 variables in 6 collections: Color Primitives, Color (SDS Light / SDS Dark), Typography Primitives, Responsive (Desktop / Mobile / Tablet), Size, Typography.
- 1,772 components and 78 component sets (mostly icons).
- Code: `scripts/tokens` generates `src/theme.css` (226 `--sds-color-*` properties). Raw hex values exist only in that generated file.
- Code Connect: 96 `.figma.ts` files; URLs point at the upstream SDS file, not the modified copy.
- Dark mode uses only `prefers-color-scheme`; there is no manual switch.

## 6. Project rules

`CLAUDE.md` holds scope, hard rules (tokens only, never invent props, stay anonymous) and pointers.
Unknowns are explicit `TODO:` lines rather than guesses.

## 7 to 12. Planned

Updated here as each step completes. Open questions:
- Where RubyLint exports live (`docs/components/` or Storybook MDX).
- How Supernova receives tokens (Figma sync, repo JSON, or API/CLI).

## RubyLint in the pipeline

A Figma plugin that audits components (tokens, states, accessibility, naming) and exports Markdown, JSON or an AI prompt.

- The audit and all exports work with no API key.
- Keep the optional design-system knowledge service off: it sends component names to a third party.
- Export from Figma, commit the result to the repo. It cannot run headless in CI.

## Decisions log

| Decision | Choice | Why |
|----------|--------|-----|
| Scope | React only, Light + Dark | Prove the pipeline first |
| Extra theme | Second brand with its own Light and Dark, neutral placeholder palette | Shows brand and mode combine; no real branding |
| Theme structure | Separate Brand collection | Adding brands does not multiply modes |
| Verification | Heavy (rubric + critics) once real screens exist; token lint first | Objective checks before subjective review |
| Ambiguity | Stop and ask | RubyLint and Supernova details are not visible to the assistant |
| Supernova position | Decide later | Build up to Storybook first; keep it an explicit open decision |
| Demo scenarios | Update an existing component and create a new one | Update shows drift and change propagation; create shows the full path |
| Contract check | Script in CI comparing RubyLint JSON to code | Otherwise "tested" only means "it renders" |
| Demo format | Recorded video, not live | Avoids dependence on plugin, AI generation, Jira and deploy timing |
