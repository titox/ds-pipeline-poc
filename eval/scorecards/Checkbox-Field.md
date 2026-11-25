# Checkbox-Field scorecard

Round: 3  |  Date: 2026-11-25  |  Verdict: Fail

No code error was found in this round. The two failing criteria (5 and 6) fail on the design: the code reproduces Figma exactly, and Figma's Error treatment on a selected box does not reach 3:1. Three points where Figma disagrees with itself or with the code are listed for the designer.

Scope: `CheckboxField` in `src/ui/primitives/Checkbox/`. Measured from scratch on the running Storybook (`http://localhost:6006`), not on a fresh `npm run storybook:build`. Stories `sds-primitives-inputs--story-checkbox-states` (15 variants) and `sds-primitives-inputs--story-checkbox-field` (driven through URL args). Headless Chromium through `node_modules/playwright-core`, `@axe-core/playwright`, light and dark through `colorScheme`. Hover with the real mouse, Focus with the real Tab key.

Figma reference: live component set `9762:1441`, file `huu1as0pMzvGdqqDpQ5JyE`, read only: all 15 variants (layers, auto layout, bound variables, text styles, property references) and the SDS Light and SDS Dark value of each variable. Live Figma agrees with the contract of 25 November on every token.

Screenshots of this round start with `r3-` in `eval/scorecards/Checkbox-Field/`. Other files are from earlier rounds.

| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | Checks | Pass | `npm run lint` exit code 0. Token lint: 151 files, 0 errors. Contract check: 16 contracts, 0 errors, 12 warnings, none for Checkbox-Field. |
| 2 | Properties | Pass | All seven Figma properties are covered. `Label` → `label`. `Description` → `description`. `Has Description` → presence of `description` (reason: optional text prop, no separate boolean). `Error` → `errorMessage`. `Has Error` → presence of `errorMessage` (same reason; shown only with `isInvalid`). `Value Type` → `isSelected`/`defaultSelected` and `isIndeterminate`. `State`: Disabled → `isDisabled`, Error → `isInvalid`, Hover and Focus handled by the browser. No invented prop: the rest is the React Aria checkbox API. Code Connect maps all seven. See design issue 2 for the `Has Error` wiring. |
| 3 | States | Pass | All five triggered for real. Hover: `data-hovered`, fill changes (`r3-hover-*.png`). Focus: `data-focus-visible` after Tab, 2px ring (`r3-focus-*.png`). Disabled: `disabled` attribute, not focusable, not activated by Space or click. Error: `data-invalid`, `aria-invalid="true"`, danger border. Overview: `r3-states-light-after-play.png`, `r3-states-dark-hover-focus.png`. Error on a selected box differs from Default only faintly (see criterion 5). |
| 4 | Visual match | Pass | Every computed value resolves to the token Figma binds, in all 15 variants (table below). Layout: box 16×16, 3.19px from the top of a 22.39px row (Figma 3px of 22px), column gap 12px, field 44.78px high (Figma 44px), error line as third row under the description. Side by side: `r3-figma-set-light.png` against `r3-states-light-after-play.png`. |
| 5 | Accessibility | Fail (design) | Axe: no serious or critical violation in any story or arg combination (only moderate page-level `landmark-one-main`, `page-has-heading-one`, `region`, caused by the bare story page). Keyboard, name, description and focus indicator pass (below). Text contrast passes. Fails on non-text contrast: the Error border on a Checked or Indeterminate box is 1.49:1 against the box fill it is drawn in. |
| 6 | Themes | Fail (design) | Dark: every value resolves to the SDS Dark value of the same token. Text contrast and focus ring pass. Same failure as criterion 5, worse: Error border 1.25:1 against the selected fill, 1.04:1 on hover. Second brand not applicable. |

## Measured values against Figma

| Part | Token (Figma binding) | Light | Dark |
|---|---|---|---|
| Box fill, Unchecked | Background/Default/Default | #ffffff | #1e1e1e |
| Box border, Unchecked, 1px inside | Border/Brand/Tertiary, Stroke/Border | #757575 | #b3b3b3 |
| Box fill, Checked and Indeterminate | Background/Brand/Default | #2c2c2c | #f5f5f5 |
| Glyph, stroke 1.6px, 16×16 | Icon/Brand/On Brand | #f5f5f5 | #1e1e1e |
| Hover fill, Unchecked | Background/Default/Default Hover | #f5f5f5 | #383838 |
| Hover fill, Checked and Indeterminate | Background/Brand/Hover | #1e1e1e | #d9d9d9 |
| Focus ring, 2px outside, replaces the border | Border/Focus/Default, Stroke/Focus Ring | #ec221f | #ec221f |
| Error border, 1px inside | Border/Danger/Default | #900b09 | #fdd3d0 |
| Error text | Text/Danger/Default | #900b09 | #fdd3d0 |
| Disabled fill / border / glyph | Background/Disabled/Default, Border/Disabled/default, Icon/Disabled/On Disabled | #d9d9d9 / #b3b3b3 / #b3b3b3 | #383838 / #444444 / #b3b3b3 |
| Label | Text/Default/Default | #1e1e1e | #ffffff |
| Label, Disabled | Text/Disabled/Default | #b3b3b3 | #757575 |
| Description | Text/Default/Secondary | #757575 | #ffffff at 70% |
| Description, Disabled | Text/Default/Secondary at 50% opacity | opacity 0.5 | opacity 0.5 |
| Radius | Radius/100 | 4px | 4px |
| Gap box to text | Space/300 | 12px | 12px |
| Label, description, error text | Body Base | Inter 16px / 22.4px, weight 400 | same |

Hover on a Disabled field changes nothing. Focus ring does not appear on mouse click.

## Contrast, all values

Page background: #ffffff light, #1e1e1e dark.

| Pair | Light | Dark | Minimum | Result |
|---|---|---|---|---|
| Label on page | 16.67 | 16.67 | 4.5 | Pass |
| Description on page | 4.61 | 8.69 | 4.5 | Pass |
| Error text on page | 9.38 | 12.23 | 4.5 | Pass |
| Unchecked border on page | 4.61 | 7.95 | 3 | Pass |
| Checked fill on page | 13.97 | 15.29 | 3 | Pass |
| Glyph on checked fill | 12.81 | 15.29 | 3 | Pass |
| Hover, Unchecked: border on hover fill | 4.23 | 5.59 | 3 | Pass |
| Hover, Unchecked: hover fill on page | 1.09 | 1.42 | none (hover cue) | Reported |
| Hover, Checked: fill on page | 16.67 | 11.81 | 3 | Pass |
| Hover, Checked: glyph on fill | 15.29 | 11.81 | 3 | Pass |
| Focus ring on page | 4.36 | 3.82 | 3 | Pass |
| Focus ring on checked fill | 3.20 | 4.00 | 3 | Pass |
| Error border on page (Unchecked) | 9.38 | 12.23 | 3 | Pass |
| Error border on checked fill | 1.49 | 1.25 | 3 | **Fail (design)** |
| Error border on checked hover fill | 1.78 | 1.04 | 3 | **Fail (design)** |
| Error border against Default border, Unchecked (colour-only cue) | 2.04 | 1.54 | none | Reported |
| Disabled label on page | 2.10 | 3.62 | exempt | Reported |
| Disabled description on page (effective #bababa / #6d6d6d) | 1.94 | 3.20 | exempt | Reported |
| Disabled fill on page | 1.41 | 1.42 | exempt | Reported |
| Disabled border on page | 2.10 | 1.71 | exempt | Reported |
| Disabled glyph on disabled fill | 1.49 | 5.59 | exempt | Reported |

## Keyboard and accessible name

Same result in light and dark.

- Tab reaches the checkbox, `data-focus-visible` is set and the ring shows. Tab order in the states story follows the reading order; the three Disabled fields are skipped.
- Space toggles (off → on → off). Enter also toggles (React Aria press handling). Click on the label, the description or the box toggles.
- Disabled: `disabled` attribute, Tab skips it, Space and forced clicks on label and box do not change it.
- Role `checkbox`, accessible name "Label" from `aria-labelledby` (the id resolves). One wrapping `label` element, no nested label.
- Accessible description "Description" from `aria-describedby`; with `isInvalid` and `errorMessage` it is "Description Error" and `aria-invalid="true"`; without a description it is "Error"; without both there is no `aria-describedby`.
- Indeterminate: `checked` is `mixed`, DOM `indeterminate` is true. Glyphs are `aria-hidden`.
- At 320px the label, description and error wrap under each other (`r3-field-longText-light.png`).

## To fix in code

- Nothing.

## Design issues (for the designer)

1. Design fails a criterion. Error border on a selected box: `State=Error`, `Value Type=Checked` and `Indeterminate` (nodes `3168:13224`, `3168:13246`). Border/Danger/Default, 1px inside, on Background/Brand/Default measures 1.49:1 in light and 1.25:1 in dark (1.04:1 on hover in dark). With `Has Error` off, which is the default, this border is the only error cue, so the Error state is close to invisible on a selected box.
2. Figma disagrees with itself and with the code. The three `State=Error` variants have no property references at all: `Label`, `Description`, `Has Description`, `Has Error` and `Error` do nothing there. The error line can therefore be shown in Default, Hover, Focus and Disabled but never in Error. The code does the opposite and follows the written guidance: the message shows only while `isInvalid`. Result: a Figma instance with `State=Default` and `Has Error=true` shows the error line, and its Code Connect snippet (`errorMessage` without `isInvalid`) renders none (`r3-field-hasErrorNotInvalid-light.png`).
3. Figma disagrees with itself. The component set description in Figma still says "12 variants covering four states" and does not mention Error. The set has 15 variants and five states.
4. Figma disagrees with itself. Disabled label uses Text/Disabled/Default, while the disabled description uses Text/Default/Secondary with 50% layer opacity, a value with no token. The code copies both.
5. Not designed. There is no Focus and Error combination. In code the focus ring replaces the danger border while the field has focus (`r3-focus-on-error-light.png`). There is no Disabled and Error combination either: the code keeps the disabled border and still shows the error text in the danger colour.
6. Design, reported only. Hover on an unchecked box is 1.09:1 against the page in light. In dark the hover fill of an unchecked box (#383838) is the same colour as the disabled fill.
7. Design, reported only. On an unchecked box the Error state with `Has Error` off is a colour-only cue (#900b09 against #757575).

## Not verified

- Criterion 4 and 6: Figma screenshot in SDS Dark. Figma is read only and the mode cannot be switched without writing; dark was compared on token values only.
- Criterion 4: measured on the running Storybook dev server, not on `npm run storybook:build`.
- Criterion 6: second brand, not applicable until the Brand collection exists.
