# Component rubric

Scores one coded component against its Figma design. Run it after step 7 of the workflow in `docs/PROCESS.md`, before Code Connect is published.

## Who scores

A reviewer that did not write the code and has not seen the build conversation. It starts with a clean context and reads only the files listed under Inputs. This stops the builder from marking its own work. The reviewer never edits code. It reports, and the builder fixes.

Brief for the reviewer: `eval/reviewer-brief.md`.

## Inputs

| Input | Where |
|---|---|
| Specification | `docs/components/<Name>.contract.json` and `docs/components/<Name>.md` (manual RubyLint exports) |
| Design | The component set in Figma, through the `figmaUrl` in the contract |
| Code | `src/ui/primitives/<Component>/` |
| Stories | `src/stories/primitives/<Component>.stories.tsx`, built with `npm run storybook:build` |
| Code Connect | `src/figma/primitives/` |

## Criteria

Each criterion is Pass, Fail or Not verified. There are no partial marks.

| # | Criterion | How it is measured | Pass when |
|---|---|---|---|
| 1 | Checks | Run `npm run lint` (ESLint, token lint, contract check). | Exit code 0 and no error for this component. |
| 2 | Properties | Compare every property in the contract with the React props and the Code Connect mapping. Read the contract check warnings for this component. | Every Figma property is a prop, or is a state handled by the browser (Hover, Focus, Disabled), or has a written reason in the scorecard. No prop exists that Figma does not have, unless it is a standard HTML or accessibility attribute. |
| 3 | States | Open each state in the built Storybook and trigger it for real: mouse over for Hover, Tab key for Focus, the `disabled` attribute, the loading prop, the invalid prop for Error. Take a screenshot of each. | Every state in the contract exists, can be triggered, and looks different from Default. |
| 4 | Visual match | For each variant, size and state, read the computed styles in the browser (background, border, text colour, radius, padding, gap, font size, weight, line height) and compare them with the token values in the contract. Put the story screenshot next to the Figma variant. | Every value resolves to the token the contract names. No visible difference in layout, colour or icon placement. Font rendering differences between Figma and the browser are ignored. |
| 5 | Accessibility | Automated axe scan of each story. Keyboard walk-through: reach with Tab, activate with Enter and Space, confirm a disabled or loading control cannot be activated. Measure contrast from the computed colours. | No serious or critical axe violation. Fully usable by keyboard. Focus indicator visible. Text contrast at least 4.5:1, non-text contrast at least 3:1. The control has an accessible name. |
| 6 | Themes | Repeat criteria 4 and the contrast part of 5 in dark mode (`prefers-color-scheme: dark`). | Light and dark both pass. The second brand is not applicable until the Brand collection exists in Figma. |

## Rules

- **Evidence or it did not happen.** Every Pass needs evidence in the scorecard: a command and its output, a measured value, or a screenshot path. A criterion without evidence is Not verified, never Pass.
- **Not verified is not Pass.** If a tool is missing (for example the Figma bridge is closed), say so and mark the criterion Not verified.
- **Disabled contrast.** Disabled controls are exempt from the contrast minimum in WCAG. Report the measured value anyway.
- **Verdict.** The component passes only when all six criteria pass.
- **Loop.** Build, score, fix, score again. Stop after three rounds. If it still fails, stop and report to the designer with the open items.
- **Design problems go back to design.** If the code matches Figma but Figma itself fails a criterion (for example low contrast in the design), the reviewer marks it as a design issue. The builder does not change the look on their own.

## Scorecard

Save as `eval/scorecards/<Name>.md`. One file per component, replaced on each round.

```markdown
# <Name> scorecard

Round: <1 to 3>  |  Date: <YYYY-MM-DD>  |  Verdict: <Pass / Fail>

| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | Checks | | |
| 2 | Properties | | |
| 3 | States | | |
| 4 | Visual match | | |
| 5 | Accessibility | | |
| 6 | Themes | | |

## To fix in code
- <file:line> <what is wrong> <expected value from the contract>

## Design issues (for the designer)
- <what, where in Figma, measured value>

## Not verified
- <criterion> <why>
```
