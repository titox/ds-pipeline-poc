# Design System Pipeline PoC

PoC of a design system pipeline: Figma → tokens → docs (RubyLint plugin) → Storybook →
Code Connect, with Supernova as source of truth. Based on figma/sds (remote: `upstream`).

## Scope
- Platform: Web React only. iOS, Android and other devices are out of scope for this PoC.
- Multi-theming demo: 2 brands × 2 modes (Light, Dark) = 4 combinations.
  - Mode: Figma "Color" collection modes (SDS Light, SDS Dark).
  - Brand: separate "Brand" Figma collection aliasing into the semantic Color tokens,
    independent of mode. Default brand = SDS; extra brand = neutral placeholder palette
    (fictional, no real branding), with its own Light and Dark.
  - Code: `data-brand` + `data-theme` attributes, two Storybook toolbar switches.
- Figma source: file key `huu1as0pMzvGdqqDpQ5JyE` (modified copy of Figma SDS).

## Hard rules
- No raw hex/px values in components; use `--sds-*` tokens. `src/theme.css` is generated
  by `npm run script:tokens`; never edit by hand.
- Never invent a component prop; confirm in Storybook or the `.tsx` source first.
- Code Connect files live in `src/figma/`; URLs go through `figma.config.json`.
- Keep the repo anonymous: no client names, personal names or emails in code, commits or docs.
- Missing or ambiguous info (RubyLint, Supernova): stop and ask, don't guess.

## Pipeline
- RubyLint: Figma plugin (local build, no API key needed for audit and exports). Export
  Markdown/JSON from Figma and commit to the repo. Keep the optional Southleft knowledge
  service off (it sends component names to a third party).
- Supernova: not set up yet. TODO: workspace and token sync direction.
- RubyLint exports live in `docs/components/` (`<Name>.md`, `<Name>.contract.json`, `<Name>.jira.md`).
  Generate them with `npm run rubylint -- "<component or page link>"` (scripts/rubylint/README.md).

- Demo flow: Figma → RubyLint (Figma docs, JSON contract, Jira spec) → code from spec →
  CI (contract check, token lint, tests) → Storybook → Supernova. Recorded video, not live.
- Contract check: `npm run check:contracts` (scripts/contract-check.mjs, runs in CI) compares the
  RubyLint JSON to Code Connect, component props and theme.css tokens.
- Supernova position in the flow: undecided, don't assume.

- When a component is created or updated in Figma, follow the 11-step workflow in
  `docs/PROCESS.md` (tokens, component, Code Connect, Storybook, checks, publish, deploy).

## Pointers
- Component rules: `src/AGENTS.md`
- Token pipeline: `scripts/tokens/README.md`
- Storybook: `npm run storybook`; published by `.github/workflows/main.yml` (GitHub Pages)

## Verification
Token lint runs before any review. After building or changing a component, score it with
`eval/rubric.md`: a fresh subagent with no build context follows `eval/reviewer-brief.md`
and writes `eval/scorecards/<Name>.md`. Fix, re-score, stop after three rounds.
RubyLint audits are exported by hand from the Figma plugin; do not run the headless runner
on components unless asked. TODO: critic panel once real screens exist.
