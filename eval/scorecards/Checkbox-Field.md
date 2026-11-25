# Checkbox-Field scorecard

Round: 2  |  Date: 2026-11-25  |  Verdict: Fail

The two failing criteria (2 and 3) fail on points where code and Figma agree with a recorded design decision but the rubric gives no exemption. One real code error remains (`errorMessage` renders nothing). Everything that failed on measurement in round 1 (gap token, `aria-describedby`, nested label, `aria-hidden` on the glyph, `placeholder` prop) now measures correct.

Scope: `CheckboxField` in `src/ui/primitives/Checkbox/`. Measured from scratch on the running Storybook dev server (`http://localhost:6006`), not on a fresh `npm run storybook:build`. Stories `sds-primitives-inputs--story-checkbox-field` (driven through URL args) and `sds-primitives-inputs--story-checkbox-states`. Headless Chromium through `node_modules/playwright-core`, `@axe-core/playwright`, light and dark (`colorScheme` on the browser context). Hover with the real mouse, Focus with the Tab key, Disabled through `isDisabled`.

Figma reference: live component set `9762:1441` in file `huu1as0pMzvGdqqDpQ5JyE`, read only through the Desktop Bridge: all 12 variants (layers, auto layout, bound variables on every fill, stroke, radius, stroke weight and gap, text styles) and the SDS Light and SDS Dark value of each variable. Where the contract export of 24 November differs from live Figma, live Figma is the reference (see "Contract differences").

Screenshots of this round are the files starting with `r2-` in `eval/scorecards/Checkbox-Field/`. Files without that prefix are from round 1.

| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | Checks | Pass | `npm run lint` exit code 0. Token lint: 151 files, 0 errors. Contract check: 16 contracts, 0 errors, no warning for Checkbox Field. |
| 2 | Properties | Fail | All five Figma properties are covered: Label → `label`; Description → `description`; Has Description → presence of `description` (Code Connect maps it, reason written in the story); Value Type → `isSelected` / `defaultSelected` + `isIndeterminate`; State: Disabled → `isDisabled`, Hover and Focus → browser. `placeholder` is now omitted from the type. But `errorMessage` is a prop that Figma does not have, and it is not an HTML or accessibility attribute. Recorded decision: it stays and an Error variant will be designed later. The rubric has no exemption for that, so the criterion fails until the variant exists in Figma. In addition the prop does nothing (see To fix in code). |
| 3 | States | Fail | Default, Focus and Disabled exist, are triggered for real and differ from Default. Hover is triggered (`data-hovered="true"` under the real mouse) but looks the same as Default: no computed style changes and the screenshots before and during hover are byte-identical, for all three value types, in light and dark. The three Figma Hover variants are also identical to Default, and the designer has recorded that this is intended. The code matches Figma; the rubric still requires every state to look different from Default, so this is a design issue, not a code fix. Screenshots: `r2-light-hover-real-*.png`, `r2-light-focus-real-*.png`, `r2-light-variant-*.png`. |
| 4 | Visual match | Pass | Every measured value resolves to the variable that live Figma binds (table below), for all 12 variants. Side by side of the 12 variants: `r2-side-by-side-figma-vs-storybook.png` (Figma source: `r2-figma-light-all-variants.png`). No visible difference in layout, colour or glyph placement. |
| 5 | Accessibility | Pass | Axe on both stories plus disabled and no-description: 0 serious, 0 critical; only moderate page-level rules from the bare story page (`landmark-one-main`, `page-has-heading-one`, `region`). Keyboard: Tab reaches the nine enabled fields in order and skips the three disabled ones; Space toggles; Enter toggles; a click on the label or on the description toggles; a disabled field takes no focus and does not change on Tab, Space or click. Focus ring: `box-shadow: 0 0 0 2px rgb(236, 34, 31)` with `data-focus-visible`, gone after a mouse click. Light contrast: label 16.67, description 4.61, unchecked border 4.61, checked fill 13.97, glyph on fill 12.81, focus ring 4.36 against the page and 3.20 against the checked fill. Accessible name `Label`, accessible description `Description` (`aria-labelledby` and `aria-describedby`), `checked` = false / true / mixed, `disabled` exposed. |
| 6 | Themes | Pass | Dark: every colour resolves to the SDS Dark value of the same Figma variable (table below). Dark contrast: label 16.67, description 8.69, unchecked border 7.95, checked fill 15.29, glyph on fill 15.29, focus ring 3.82 against the page and 4.00 against the checked fill. Axe in dark: same result as light. Screenshots: `r2-dark-states-rest.png`, `r2-dark-variant-*.png`, `r2-dark-focus-real-*.png`. The Figma screenshot in dark is Not verified (see below); the token comparison counts. |

## Measured values against Figma

| Part | Figma (live) | Browser, light | Browser, dark |
|---|---|---|---|
| Box size, radius | 16 × 16, Radius/100 = 4 | 16 × 16, 4px | same |
| Box, Unchecked | Background/Default/Default #ffffff, 1px inside Border/Brand/Tertiary #757575 (dark #1e1e1e, #b3b3b3) | rgb(255,255,255), inset 1px rgb(117,117,117) | rgb(30,30,30), inset 1px rgb(179,179,179) |
| Box, Checked and Indeterminate | Background/Brand/Default #2c2c2c, no stroke (dark #f5f5f5) | rgb(44,44,44), inset 1px of the same colour | rgb(245,245,245), inset 1px of the same colour |
| Glyph | Check 10.67 × 7.33 at 2.67, 4; Minus 9.33 wide at 3.33, 8; stroke 1.6; Icon/Brand/On Brand #f5f5f5 (dark #1e1e1e) | same path extents in a 16 × 16 svg, 1.6px, rgb(245,245,245) | rgb(30,30,30) |
| Box, Disabled | Background/Disabled/Default #d9d9d9, 1px inside Border/Disabled/default #b3b3b3 (dark #383838, #444444) | rgb(217,217,217), inset 1px rgb(179,179,179) | rgb(56,56,56), inset 1px rgb(68,68,68) |
| Glyph, Disabled | Icon/Disabled/On Disabled #b3b3b3 in both modes | rgb(179,179,179) | rgb(179,179,179) |
| Box, Focus | 2px outside Stroke/Focus Ring, Border/Focus/Default #ec221f in both modes, replaces the border | 0 0 0 2px rgb(236,34,31), no inset border | same |
| Label | Text/Default/Default #1e1e1e (dark #ffffff), Body Base: Inter 400 16px, line height 140% | rgb(30,30,30), Inter, 16px, 400, 22.4px | rgb(255,255,255) |
| Label, Disabled | Text/Disabled/Default #b3b3b3 (dark #757575) | rgb(179,179,179) | rgb(117,117,117) |
| Description | Text/Default/Secondary #757575 (dark #ffffff at 70%), Body Base | rgb(117,117,117), 16px, 400, 22.4px | rgba(255,255,255,0.698) |
| Description, Disabled | same colour, row opacity 0.5 (raw value) | opacity 0.5 | opacity 0.5 |
| Gap box to label | Space/300 = 12 | `column-gap` 12px, first column 16px | same |
| Positions | box at x 0, y 3; label at x 28; description at x 28, y 22; variant 44 high | box x 0, y 3.19; label x 28; description x 28, y 22.39; 44.78 high | same |
| Has Description off | Description Row hidden | 22.39 high, no description element, no `aria-describedby` | same |
| Hover | identical to Default | identical to Default | identical to Default |

## Contrast, all values

| Pair | Light | Dark | Minimum |
|---|---|---|---|
| Label on page | 16.67 | 16.67 | 4.5 |
| Description on page | 4.61 | 8.69 | 4.5 |
| Unchecked border on page | 4.61 | 7.95 | 3 |
| Checked fill on page | 13.97 | 15.29 | 3 |
| Glyph on checked fill | 12.81 | 15.29 | 3 |
| Focus ring on page | 4.36 | 3.82 | 3 |
| Focus ring on checked fill | 3.20 | 4.00 | 3 |
| Disabled label on page | 2.10 | 3.62 | exempt |
| Disabled description on page (opacity 0.5) | 1.94 | 3.20 | exempt |
| Disabled box fill on page | 1.41 | 1.42 | exempt |
| Disabled border on page | 2.10 | 1.71 | exempt |
| Disabled border on disabled fill | 1.49 | 1.20 | exempt |
| Disabled glyph on disabled fill | 1.49 | 5.59 | exempt |

## Contract differences

`docs/components/Checkbox-Field.contract.json` (exported 24 November) against live Figma:

- The contract does not list `Text/Disabled/Default`. Live Figma binds it to the label of the three Disabled variants. The code follows live Figma.
- The contract lists `Icon/Brand/Default`. In live Figma it is only on the hidden Check layer of the Unchecked variants (Default, Hover, Focus), so it is never drawn. The code does not use it.
- The Disabled description opacity of 0.5 is not in the contract (it is a raw value, not a variable).

The contract should be exported again so that the contract check compares against the current design.

## To fix in code
- `src/ui/primitives/Checkbox/Checkbox.tsx:70` `errorMessage` renders nothing on a single `CheckboxField`. Measured by rendering `<CheckboxField label="…" errorMessage="Error text" isInvalid />` in the Storybook page: 0 `.error-message` elements, box-shadow unchanged, only `aria-invalid="true"` on the input. `FieldError` only renders inside a field that provides validation context, which a standalone checkbox does not. Since the decision is to keep the prop, it has to show its text (and link it to the input) or it is a dead prop. The look of the error state waits for the Error variant.
- `src/ui/primitives/Checkbox/checkbox.css:49-52` not gating: the rule sets `--checkbox-icon` to `--sds-color-icon-disabled-default` for `.checkbox-field[data-selected][data-disabled] > .checkbox`. It has the same specificity as the rule at lines 105-111, which sets `--sds-color-icon-disabled-on-disabled` (the Figma variable) and wins only because it comes later. Measured result is correct (dark: rgb(179,179,179), not rgb(117,117,117)), but reordering the file would silently break it. Remove the `.checkbox-field` selector from lines 49-52.

## Design issues (for the designer)
- Hover: the three `State=Hover` variants are identical to `State=Default` (decision recorded: intended). The rubric requires each state to look different from Default, so criterion 3 stays Fail while the Hover variants exist without a difference. The component description also says State controls the visual treatment across Default, Hover, Focus and Disabled, which contradicts the layers. Either give Hover a treatment, or remove the Hover variants and the sentence so that Figma no longer declares a state with no design.
- Error: the code has `errorMessage` and `isInvalid`, Figma has no Error variant (decision recorded: variant to be designed). Criterion 2 stays Fail until it exists.
- Disabled description: dimmed with a raw row opacity of 0.5 over `Text/Default/Secondary`, while the label next to it uses the variable `Text/Disabled/Default`. Two different mechanisms for the same state, and one is not a variable.
- Disabled, light: glyph on disabled fill 1.49:1 and border on fill 1.49:1, so a disabled checked box is hard to tell from a disabled unchecked one (in dark the glyph measures 5.59:1). Exempt from the minimum, reported as required.
- The hidden Check layer in the Unchecked variants is bound to `Icon/Brand/Default`, which puts an unused token in the export.
- The `Checkbox` frame has an item spacing of 10 that is not bound to a variable (single child, no visible effect).
- Variable name `Border/Disabled/default` has a lower-case last segment, unlike the other variables.
- With Has Description off the clickable row is 22.39px high (16px box). Not a rubric criterion; worth a decision on minimum target height.

## Not verified
- Criterion 4 and 6: side-by-side screenshot against Figma in dark. The component set is drawn in SDS Light only and switching the mode would change the file, which is read-only. Dark was compared variable by variable against the live SDS Dark values instead.
- Criterion 3: the look of the Checkbox States story exactly as loaded (its play function). States were triggered with the real mouse and keyboard after the play function had finished.
- Measured on the dev server, not on `npm run storybook:build`.
- Second brand: not applicable until the Brand collection exists in Figma.
