# Checkbox-Field scorecard

Round: 4  |  Date: 2026-11-25  |  Verdict: Pass

Round 4 exists because the design in Figma was changed after round 3 (the rubric normally stops at three rounds). All six criteria pass on the rubric's conditions. One code defect outside those conditions is listed under "To fix in code", and several design points are reported for the designer. None of them is below a minimum the rubric sets.

Scope: `CheckboxField` in `src/ui/primitives/Checkbox/`. Everything was measured from scratch on the running Storybook (`http://localhost:6006`), not on a fresh `npm run storybook:build`. Stories `sds-primitives-inputs--story-checkbox-field` (driven through URL args, one variant at a time) and `sds-primitives-inputs--story-checkbox-states` (15 variants). Headless Chromium through `node_modules/playwright-core`, `@axe-core/playwright`, real mouse hover and real Tab key, `colorScheme: "dark"` for dark mode.

Figma reference: live component set `9762:1441`, file `huu1as0pMzvGdqqDpQ5JyE`, read only: all 15 variants (layers, auto layout, bound variables, text styles, property references) and the SDS Light and SDS Dark value of every variable used. The contract of 25 November and the live file name the same tokens with the same values. The live file differs from the contract in the component description and in the Error border position (now on the outer edge). The live file was used.

Screenshots of this round start with `r4-` in `eval/scorecards/Checkbox-Field/`. Other files are from earlier rounds.

| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | Checks | Pass | `npm run lint` exit code 0. ESLint: no message for Checkbox. Token lint: 151 files, 0 errors. Contract check: 16 contracts, 0 errors, no warning for Checkbox Field. |
| 2 | Properties | Pass | All seven Figma properties are covered and Code Connect maps all seven. `Label` → `label`. `Description` → `description`. `Has Description` → presence of `description` (reason: optional text prop, no separate boolean). `Error` → `errorMessage`. `Has Error` → presence of `errorMessage`, shown only with `isInvalid` (same reason). `Value Type` → `isSelected`/`defaultSelected` plus `isIndeterminate`. `State`: Disabled → `isDisabled`, Error → `isInvalid`, Hover and Focus handled by the browser. No invented prop: the rest is the React Aria checkbox API (standard form and accessibility attributes). See "To fix in code" for `isIndeterminate` used alone. |
| 3 | States | Pass | All five triggered for real, in light and dark, for the three value types. Hover: `data-hovered`, fill changes. Focus: `data-focus-visible` after Tab, 2px ring. Disabled: `disabled` attribute. Error: `data-invalid` and `aria-invalid="true"`, 1px danger border outside the box. Each differs from Default in computed styles. Screenshots `r4-<light or dark>-<state>-<value>.png`, overview `r4-light-states-story.png` and `r4-dark-states-story.png`. |
| 4 | Visual match | Pass | Every computed value equals the Figma variable value (tables below). Side by side: `r4-figma-component-set.png` against `r4-light-states-story.png`, no visible difference in layout, colour or icon placement. |
| 5 | Accessibility | Pass | Axe: no serious or critical violation in 5 scans per theme (only moderate page-level `landmark-one-main`, `page-has-heading-one`, `region`, caused by the bare story page). Keyboard, name and description pass (below). Focus ring 4.36:1. Text at least 4.61:1. Non-text at least 3:1 against the surface each mark sits on. |
| 6 | Themes | Pass | Dark: every value equals the SDS Dark value of the same variable. Text at least 8.69:1, focus ring 3.82:1, Error border 12.23:1, no serious or critical axe violation. Second brand not applicable. |

## Measured values (criteria 4 and 6)

Same in Storybook and in Figma unless stated. Light / dark.

| Part | Token | Light | Dark |
|---|---|---|---|
| Page behind the field | Background/Default/Default | #ffffff | #1e1e1e |
| Box fill, Unchecked | Background/Default/Default | #ffffff | #1e1e1e |
| Box fill, Unchecked Hover | Background/Default/Default Hover | #f5f5f5 | #383838 |
| Box fill, Checked and Indeterminate | Background/Brand/Default | #2c2c2c | #f5f5f5 |
| Box fill, Checked and Indeterminate Hover | Background/Brand/Hover | #1e1e1e | #d9d9d9 |
| Box border, Unchecked, 1px inside | Border/Brand/Tertiary | #757575 | #b3b3b3 |
| Focus ring, 2px outside | Border/Focus/Default, Stroke/Focus Ring | #ec221f | #ec221f |
| Error border, 1px outside | Border/Danger/Default, Stroke/Border | #900b09 | #fdd3d0 |
| Glyph (Check, Minus), stroke 1.6px, 16px | Icon/Brand/On Brand | #f5f5f5 | #1e1e1e |
| Label | Text/Default/Default | #1e1e1e | #ffffff |
| Description | Text/Default/Secondary | #757575 | #ffffff at 70% |
| Error text | Text/Danger/Default | #900b09 | #fdd3d0 |
| Disabled fill / border | Background/Disabled/Default, Border/Disabled/default | #d9d9d9 / #b3b3b3 | #383838 / #444444 |
| Disabled glyph | Icon/Disabled/On Disabled | #b3b3b3 | #b3b3b3 |
| Disabled label | Text/Disabled/Default | #b3b3b3 | #757575 |
| Disabled description | Text/Default/Secondary at 50% opacity | #757575 at 50% | #ffffff at 70%, then 50% |

Layout: box 16×16 (Figma 16×16), radius 4px (Radius/100), gap box to text 12px (Space/300), text 16px, weight 400, Inter, line height 22.4px (Figma Body Base, 140%, drawn as 22). Field height 44.78px with description (Figma 44), 67.17px with error line (Figma 66), 22.39px without description (Figma 22): the difference is the 22.4 against 22 line rounding. Description and error text start at x 44, under the label. At 320px wide the label, description and error wrap inside the field with no horizontal scroll (`r4-light-narrow-320.png`).

## Contrast (criteria 5 and 6)

| Pair | Light | Dark | Minimum | Result |
|---|---|---|---|---|
| Label on page | 16.67 | 16.67 | 4.5 | Pass |
| Description on page | 4.61 | 8.69 | 4.5 | Pass |
| Error text on page | 9.38 | 12.23 | 4.5 | Pass |
| Unchecked border on page / on fill | 4.61 / 4.61 | 7.95 / 7.95 | 3 | Pass |
| Unchecked Hover: border on hover fill | 4.23 | 5.59 | 3 | Pass |
| Checked fill on page | 13.97 | 15.29 | 3 | Pass |
| Checked Hover fill on page | 16.67 | 11.81 | 3 | Pass |
| Glyph on Checked fill | 12.81 | 15.29 | 3 | Pass |
| Glyph on Checked Hover fill | 15.29 | 11.81 | 3 | Pass |
| Focus ring on page | 4.36 | 3.82 | 3 | Pass |
| Focus ring against Checked fill (inner edge) | 3.20 | 4.00 | 3 | Pass |
| Error border on page (what it sits on), all value types | 9.38 | 12.23 | 3 | Pass |
| Error border against Unchecked fill (inner edge) | 9.38 | 12.23 | 3 | Pass |
| Error border against Checked fill (inner edge) | 1.49 | 1.25 | none set | Reported |
| Error border against Checked Hover fill (inner edge) | 1.78 | 1.04 | none set | Reported |
| Error border against Default border, Unchecked | 2.04 | 1.54 | none set | Reported |
| Hover fill against Default fill, Unchecked | 1.09 | 1.42 | none set | Reported |
| Hover fill against Default fill, Checked | 1.19 | 1.29 | none set | Reported |
| Disabled label on page | 2.10 | 3.62 | exempt | Reported |
| Disabled description on page | 1.94 | 3.20 | exempt | Reported |
| Disabled border on page / on fill | 2.10 / 1.49 | 1.71 / 1.20 | exempt | Reported |
| Disabled glyph on disabled fill | 1.49 | 5.59 | exempt | Reported |

The Error border is judged against the page, because since the Figma edit it is drawn outside the box and sits on the page. The inner edge values are reported, not failed.

## Keyboard, name and description (criterion 5)

Same result in light and dark.

- Element: `<label>` wrapping a real `<input type="checkbox">`. Role `checkbox`.
- Accessible name "Label", from `aria-labelledby` pointing at the label text.
- Accessible description "Description" from `aria-describedby`. With `isInvalid` and `errorMessage` it is "Description Error" and `invalid` is true. Without a description there is no `aria-describedby`. With `isInvalid` and no message, `aria-invalid="true"` is still set.
- Indeterminate (with `isSelected`): `checked` is `mixed`. Glyphs are `aria-hidden`.
- Tab reaches the input and sets `data-focus-visible`. A mouse click does not show the ring.
- Space toggles (false → true → false). Enter toggles as well (checked again with 700ms waits: false → true → false).
- Clicking the label or the description toggles: the whole row is the target (at least 44.78px high).
- Disabled: `disabled` attribute, not reached by Tab, not changed by Space or click, exposed as disabled. Hover does not change its fill.

## To fix in code

- `src/ui/primitives/Checkbox/checkbox.css:58` `isIndeterminate` without `isSelected` draws an empty Unchecked box (fill #ffffff, no Minus glyph) while the input is exposed as `mixed`. The selectors on lines 58 to 63 and the fill rule on lines 30 to 34 need `data-selected`. Expected: `Value Type=Indeterminate` (Background/Brand/Default fill and Minus glyph) whenever `data-indeterminate` is set, as React Aria treats it as independent of selection. Stories and Code Connect always send both props, so the 15 variants are not affected and no rubric condition fails. Measured with `args=isSelected:!false;isIndeterminate:!true`.

## Design issues (for the designer)

1. Reported, design. Error on a selected box: `State=Error, Value Type=Checked` (`3168:13222`, box `3168:13224`) and `State=Error, Value Type=Indeterminate` (`3168:13244`, box `3168:13246`). The border now passes against the page (9.38 light, 12.23 dark, minimum 3). Against the box fill it touches it measures 1.49 in light and 1.25 in dark (1.78 and 1.04 on hover), so the ring reads as a slightly larger box, most of all in dark (`r4-dark-error-checked.png`). With `Has Error` off, which is the default, it is the only error cue for sighted users.
2. Reported, design. `State=Error, Value Type=Unchecked` (`3168:13233`, box `3168:13235`) with `Has Error` off is a colour-only cue: Border/Danger/Default against the Default border measures 2.04 in light and 1.54 in dark. The component description asks for `Has Error` on with `State=Error`, yet `Has Error` defaults to off in the Error variants.
3. Figma and code disagree. `Has Error` can be turned on in any state in Figma, and the Error Row then shows. In code the message shows only while `isInvalid`. An instance with `State=Default` and `Has Error` on shows the error line in Figma, and its Code Connect snippet (`errorMessage` without `isInvalid`) renders none (measured: no error element, `aria-invalid` absent).
4. Not designed. There is no Focus with Error variant and no Hover with Error variant. In code the focus ring replaces the danger border while the field has keyboard focus (#ec221f, 2px), and hover keeps the danger border over the hover fill.
5. Reported, design. Hover is a faint change: Unchecked fill 1.09 against Default in light (`3111:3273`), Checked 1.19 (`3111:3264`). No minimum applies.
6. Reported, design. Disabled description uses a fixed 50% layer opacity on the Description Row (for example `565:15666`), not a token. Disabled contrast is exempt; values are in the table.
7. Reported. Focus ring Border/Focus/Default has the same value in both modes (#ec221f) and is at 3.82 in dark, close to the minimum of 3.

## Not verified

- Criterion 4 and 6: Figma screenshot in dark mode. Switching the variable mode would write to Figma, so dark was compared by variable values only.
- Criterion 3 and 4: built Storybook (`npm run storybook:build`). The running Storybook was measured instead.
- Disabled with Error combination: not measured in this round.
- Second brand: not applicable until the Brand collection exists in Figma.
