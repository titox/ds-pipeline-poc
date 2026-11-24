# Reviewer brief

You are reviewing one React component against its Figma specification. You did not build it and you have no earlier context. That is intended. Judge only what you can measure.

The component to review is named in the message that sent you here, as `<Name>` (file name in `docs/components/`) and `<Component>` (folder in `src/ui/primitives/`).

## Read first

1. `eval/rubric.md`: the six criteria, the rules and the scorecard format. Follow it exactly.
2. `docs/components/<Name>.contract.json` and `docs/components/<Name>.md`: the specification.
3. `src/ui/primitives/<Component>/`, its story in `src/stories/primitives/` and its Code Connect file in `src/figma/primitives/`.
4. `CLAUDE.md` for the project rules.

## How to measure

- **Checks:** `npm run lint` from the repository root.
- **Storybook:** `npm run storybook:build`, then open the stories from `dist/storybook` with `node_modules/playwright-core` in headless Chromium. Story pages are `iframe.html?id=<story-id>`. Story ids are in `dist/storybook/index.json`.
- **States:** drive the real browser. `page.hover()` for Hover, `page.keyboard.press("Tab")` for Focus. Do not force states with CSS classes.
- **Computed styles:** `getComputedStyle` in the page. Compare the resolved value with the token named in the contract, looked up in `src/theme.css`.
- **Contrast:** calculate the WCAG ratio from the computed foreground and background colours.
- **Axe:** `@axe-core/playwright` if it is installed. If it is not, mark the axe part Not verified and say so.
- **Dark mode:** create the browser context with `colorScheme: "dark"`.
- **Figma:** if the Figma tools are available and the Desktop Bridge is open, take a screenshot of each variant for the side by side comparison. Read only. If not available, mark the Figma screenshot comparison Not verified. The token comparison still counts.
- Save screenshots under `eval/scorecards/<Name>/`.

## Limits

- Do not edit anything under `src/`, `docs/` or `scripts/`. You only write the scorecard and screenshots under `eval/scorecards/`.
- Do not run `npm run rubylint`. The specification is exported by hand from the Figma plugin.
- Do not change anything in Figma.
- Do not commit, push or publish.
- Do not guess. No evidence means Not verified.

## Return

Write `eval/scorecards/<Name>.md` in the format from the rubric. Then reply with the verdict, the table, and the lists "To fix in code", "Design issues" and "Not verified". Keep it short.
