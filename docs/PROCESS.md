# Design system pipeline PoC

## In one minute

We are testing whether a design system can move from a Figma file to working code without anyone copying things by hand. A designer changes a component in Figma. A check scores it. Developers get a clear specification. The code is built, tested and shown in this Storybook. A tool called Supernova is meant to hold the official version of everything.

The test covers web only, built with React. It uses two brands, each with a light and a dark mode, so four looks in total. It starts from Figma's open Simple Design System, which we have changed to suit the demo.

The demo will be a recorded video, not a live run. Several steps depend on plugins and external tools, and a recording avoids surprises on the day.

## How a component travels

Click a step in the diagram above, or press Play to walk through it. The table has the same information in text.

| Step | What happens | Who does it | What comes out |
|---|---|---|---|
| 1. Planning | Work starts in the backlog: a new component, or a change to an existing one. The backlog can be Jira or any other project management tool. | Product owner | A backlog item |
| 2. Design | A component is created or changed in Figma, using shared colour and size tokens instead of loose values. | Designer | A Figma component with all its states |
| 3. Audit and hand-off | RubyLint audits the component for tokens, states, accessibility and naming, and generates the documentation automatically. | Designer | Markdown documentation, a JSON contract and a Jira ticket |
| 4. Build | The React component is written to match the specification and the existing code style. Tokens come from Figma and Code Connect links the code to the design. | Developer | Code in the GitHub repository |
| 5. Check and review | Automated checks run, then Storybook is rebuilt and published. | Automated | A live Storybook page for the component |
| 6. Source of truth | Supernova keeps the official record of tokens and components. | Design system team | One place everyone can trust |

## Where we are

| Area | Status | In plain words |
|---|---|---|
| Repository and published Storybook | Done | The code lives on GitHub and this Storybook updates automatically. |
| Reading the Figma file | Done | We know what is in it: 347 variables, 78 component sets and 1,772 components, mostly icons. |
| Button and Input Field states | Done | Button now has a Loading state. Input Field now has Hover and Focus. A new focus colour token ties Figma to the code. |
| Code Connect links | Done | All 96 component links point at our Figma file, and each target was checked. They are not published to Figma yet. |
| Storybook 10 with AI support | Done | The upgrade works and an assistant can now read and preview stories. |
| Other components | In progress | The same set of states still has to be added to the rest of the interactive components. |
| RubyLint documentation | In progress | Runs by hand in Figma. It must be run again after the new states. |
| Automated checks | Planned | A token check and a contract check will compare the code with the Figma specification. |
| Supernova | Planned | Our account is connected, but Supernova is not linked to the Figma file yet. |
| iOS and Android | Out of scope | Not part of this test. |

## What we decided and why

- **React only for now.** One platform is enough to prove the pipeline. Other platforms can follow once it works.
- **Two brands, each with light and dark.** One extra brand shows that theming works without multiplying the effort for every new brand. The second brand uses a made-up colour palette with no real branding.
- **Brand lives in its own Figma collection.** Light and dark are separate from brand, so adding a brand later does not touch the existing modes.
- **Every interactive component gets the same states.** Default, Hover, Focus and Disabled. Form fields also get Error. Buttons also get Loading. Pressed and Active are left out.
- **The code is checked against the Figma contract.** A script in the build will compare what the code offers with what the RubyLint contract says. Without it, "tested" would only mean "it displays".
- **Supernova's place is still open.** It could read from Figma and feed the code, or it could sit at the end as a publishing portal. We have not chosen yet.
- **The repository is public and anonymous.** No client or personal names appear in the code, the history or these pages.

## Risks and open questions

- **Supernova is the least tested link.** It is the final step of the demo and the one we know least about.
- **Tokens and components have to move together.** A new component often needs new tokens, so the token sync needs its own step in the demo.
- **The focus colour is the same red as error states.** A focused field and an invalid field look alike. A separate colour is worth choosing.
- **The token file is out of date.** It contains a third colour mode that the Figma copy does not have. A full export will bring them back in line.
- **Where the RubyLint documents are stored is undecided.** They could sit in the repository or in Storybook pages.
- **Publishing is occasionally flaky.** The deploy step sometimes fails with an "artifact not found" error. Running it again fixes it.

---

## Technical runbook

The rest of this page is for designers and developers who need to repeat or extend the work. Each section says what we did, how to repeat it and how to check it. Placeholders: `<account>` is the GitHub account, `<repo>` the repository name, `<FIGMA_FILE_KEY>` the Figma file key.

## Detailed status

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

## Workflow: a component is created or updated in Figma

Repeat this for every new or changed component. Names in `<>` are placeholders.

1. **Design in Figma.** Use token variables only (no raw colours or sizes). Follow the state standard: Default, Hover, Focus, Disabled, plus Error for form fields and Loading for buttons.
2. **Audit with RubyLint.** Either in the Figma plugin, or from the terminal with `npm run rubylint -- "<component link>"` (see `scripts/rubylint/README.md`; no AI or REST API calls). Fix what it flags. Both give the Markdown spec, the JSON contract and the Jira specification. Commit the exports (location still to be decided).
3. **Sync tokens if any variable changed.** Re-export the tokens with the plugin in `scripts/tokens/figma-plugin-token-json` into `scripts/tokens/tokens.json`, then run `npm run script:tokens` (add `--skip-rest-api` when using the plugin JSON). Review the `src/theme.css` diff.
4. **Build or update the React component** in `src/ui/primitives/<Component>/`, following `src/AGENTS.md`. Props must match the Figma component properties. States map to CSS pseudo-classes, `disabled` and `aria-*`, not to extra components.
5. **Update Code Connect** in `src/figma/primitives/<component>/<Component>.figma.ts`:
   - New component: add a `<FIGMA_..._...>` entry with the Figma URL and node ID in `figma.config.json`, and reference it in the template header (`url=`).
   - Changed component: update the property mappings (`getEnum`, `getBoolean`, `getString`, `getInstanceSwap`) to match renamed, added or removed Figma properties.
   - Point the `source=` header at this repository, not the upstream one (to do: the existing templates still reference upstream).
6. **Update Storybook** in `src/stories/primitives/<Component>.stories.tsx`: one story per variant and state, so the stories are the visual contract.
7. **Check.** Token lint, contract check (RubyLint JSON against the component's props and tokens) and tests must pass. Both scripts are planned, not built yet.
8. **Publish Code Connect:** `npx figma connect publish` (needs a Figma API token with the Code Connect write scope; set it locally, never commit it). Verify in Figma Dev Mode that the code snippet shows for the component.
9. **Update component descriptions in Figma if needed** with `scripts/component-metadata` (descriptions only) and dev resources with `npm run script:dev-resources` (REST API only).
10. **Commit and push** with the neutral identity (`DS PoC`), then check the Pages deploy. Re-run it if it fails with "No artifacts named github-pages".
11. **Update this runbook** if the process changed, and record the component in the status table.

Remap status: all 97 URLs in `figma.config.json` now point at the local Figma file. Verifying that every node ID exists in that file is pending (needs the Figma bridge).

## Tooling upgrades

- Storybook upgraded from 8.6 to 10.6.8 (`npx storybook@latest upgrade`), with `@storybook/addon-mcp` added. Leftover v8 packages removed. Build passes.
- MCP endpoint: `http://localhost:6006/mcp`, only while `npm run storybook` runs. Not registered in Claude Code yet (`claude mcp add --transport http storybook http://localhost:6006/mcp`).
- Playwright installed (`@playwright/test`, `playwright.config.ts`, example spec in `tests/`). Not used yet. Plan: add `@storybook/addon-vitest` (peer of the MCP addon) and axe checks once Button and Input stories have the new states.
- Registry note: always install with `npm_config_registry=https://registry.npmjs.org/`, otherwise a corporate registry URL ends up in `package-lock.json`.

## Next session

1. RubyLint: run `npm run rubylint` on Input Field and Button, fix the Button description (still says 24 variants). Input Field audit flags a missing Filled state and 1.5:1 contrast.
2. Decide where RubyLint exports live (`docs/components/` or Storybook MDX), then build the contract check script on the JSON.
3. Roll the state standard out to the remaining interactive components.
4. Distinct focus colour: `Border/Focus/Default` is still the same red as error.
5. Brand collection in Figma for the second brand; Supernova role in the flow.

Done: Input Hover and Focus in code (`input.css`), "Input States" story, Code Connect maps State=Error to `isInvalid` (published). Text input uses `--sds-font-body-base` (to confirm).

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

## 4. Overview page

`src/stories/_welcome/Overview.mdx` is the single front page of the Storybook (SDS/Overview). It replaces the earlier Hello and Process pages and has three parts:
- **Hero** (`Hero.tsx`, `hero.css`): the starting point, with the project links. White text on `--sds-color-red-600`, a contrast of 6.3:1 (the semantic danger token in light mode only reached 3.7:1, below the 4.5:1 needed for body text).
- **Workflow diagram** (`PipelineFlow.tsx`, `pipeline-flow.css`, `logos.ts`): six swim-lane stages with service logos, a dashed design-token line and a dashed Code Connect line. To change a stage, edit `LANES`, `NODES` and `EDGES` in `PipelineFlow.tsx`.
- **This document**, rendered from `docs/PROCESS.md`.

The diagram is user-triggered (Play), animates only `transform`, `opacity` and stroke, and honours `prefers-reduced-motion`.
Logos for Figma, Jira, GitHub, Storybook, React and GitHub Actions come from the Simple Icons set (CC0). RubyLint and Supernova use simple custom marks, because they are not in that set. Replace the Supernova mark with the official SVG when available.

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
