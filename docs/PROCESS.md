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
| 12 | Supernova as source of truth | Blocked: workspace not set up |

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
