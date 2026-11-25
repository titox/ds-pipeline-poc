---
component: Checkbox Field
figmaNode: "9762:1441"
storybook: sds-primitives-inputs--story-checkbox-field
source: src/ui/primitives/Checkbox/Checkbox.tsx
summary: Checkbox Field lets a person turn one option on or off.
updated: 2026-11-25
---

<!--
Neutral source for the Checkbox Field documentation page. Every destination
(Supernova, Docusaurus) is produced from this file.
Sources: the Figma description and variants of node 9762:1441, Checkbox.tsx, checkbox.css,
CheckboxField.figma.ts, the contract in docs/components/ and eval/scorecards/Checkbox-Field.md.
-->

## Images

Alternative text for the illustrations. They are frames on the Figma page "Docs / Checkbox Field".

| Node | Alt |
|---|---|
| 3167:13059 | Three checkboxes for Email updates, Text message updates and Updates by post, two of them checked |
| 3167:13085 | Two checkboxes for Standard delivery and Express delivery, both checked |
| 3167:13099 | A Dark mode setting shown as a Switch Field that is on |
| 3167:13116 | A Dark mode setting shown as a checked Checkbox Field |
| 3167:13133 | A Share usage data checkbox with the description Sent without your name |
| 3167:13150 | A Remember me checkbox with the description Remembers you on this device |

## Tab: Usage

### Status

<!-- block: status -->
| Area | Status | Detail |
|---|---|---|
| Design | Ready | 15 variants in Figma. Readiness audit: 97%. |
| React | Ready | Matches the 15 Figma variants in light and dark. |
| Review | Passed | All six criteria pass, 25 November 2026, round 4. |
| Code Connect | Ready | Published on 25 November 2026. |
| Screen reader | Not tested | See Code and accessibility. |

### What it is

Checkbox Field is a checkbox with a label and an optional description line. It has five states and three value types: unchecked, checked and indeterminate. It can show an error message.

It lets people turn a single option on or off, or show a mixed selection, with supporting text underneath when the choice needs explaining.

### Links

<!-- block: cards -->
| Logo | Title | Subtitle | Target |
|---|---|---|---|
| Figma | Checkbox Field | Figma component set | Node 9762:1441 in the Figma file |
| Storybook | Checkbox Field | Storybook | Story `sds-primitives-inputs--story-checkbox-field` |
| Code | Checkbox.tsx | Source code | `src/ui/primitives/Checkbox/Checkbox.tsx` |

### When to use it

Use it for

- Independent on/off choices.
- Parent rows in a nested list, where Indeterminate signals that only some children are selected.

Not for this

- Options that are mutually exclusive. Use Radio Group.
- A change that applies immediately. Use Switch Field.

### Do and don't

<!-- block: do-dont -->
<!-- Sources: all three pairs from USAGE in the Figma description. -->
| Do | Don't | Figma frame |
|---|---|---|
| Use it for independent on/off choices. | Use it when the options are mutually exclusive. Use Radio Group. | 3167:13059, 3167:13085 |
| Use Switch Field when the change applies immediately. | Use a checkbox for a change that applies immediately. | 3167:13099, 3167:13116 |
| Add a description when the choice needs explaining. | Add a description when the label is self-explanatory. | 3167:13133, 3167:13150 |

### Related components

<!-- block: cards -->
| Logo | Title | Subtitle | Target |
|---|---|---|---|
| Figma preview | Checkbox Group | For several checkboxes under one label. | Story `sds-primitives-inputs--story-checkbox-group` |
| Figma preview | Radio Group | For options that are mutually exclusive. | Story `sds-primitives-inputs--story-radio-group` |
| Figma preview | Switch Field | For a change that applies immediately. | Story `sds-primitives-inputs--story-switch-field` |

### Need help?

<!-- block: callout -->
Not sure which control to use? Ask the design system team.

<!-- block: contact -->
Contact the design system team, Microsoft Teams channel, placeholder link

## Tab: Design

### Anatomy

<!-- block: image -->
A Checkbox Field with four numbered markers: 1 checkbox, 2 glyph, 3 label, 4 description. Figma frame 3167:13158

1. **Checkbox:** the box. It carries the fill, the border and the glyph.
2. **Glyph:** a Check icon when checked, a Minus icon when indeterminate, nothing when unchecked.
3. **Label:** the text next to the box.
4. **Description (optional):** supporting text under the label.
5. **Error message (optional):** says what to fix. It sits under the description and is not shown in the illustration.

### Variants

| Value Type | What it shows |
|---|---|
| Unchecked | An empty box with a border. |
| Checked | A filled box with a Check glyph. This is the default in Figma. |
| Indeterminate | A filled box with a Minus glyph. |

### Size

Checkbox Field has one size.

| Part | Value |
|---|---|
| Box | 16px by 16px |
| Glyph | 16px icon |
| Gap between box and label | 12px (`Space/300`) |
| Gap between label and description | None |
| Text | 16px |

The description is aligned with the label, not with the box.

### States

| State | What changes |
|---|---|
| Default | Resting look. |
| Hover | The box fill changes: `Background/Default/Default Hover` when unchecked, `Background/Brand/Hover` when checked or indeterminate. |
| Focus | A 2px ring in `Border/Focus/Default` on the outer edge of the box. It replaces the border. It shows on keyboard focus. |
| Disabled | Disabled fill, border and glyph colours on the box. The label uses the disabled text colour. The description is shown at 50% opacity. |
| Error | A 1px border in `Border/Danger/Default` on the outer edge of the box. The error message shows when Has Error is on. |

There is no Pressed state.

### Tokens

<!-- block: tabs-in-page -->

#### Colour

| Part | Default | Hover | Focus | Error | Disabled |
|---|---|---|---|---|---|
| Box fill, unchecked | `Background/Default/Default` | `Background/Default/Default Hover` | same | same | `Background/Disabled/Default` |
| Box fill, checked and indeterminate | `Background/Brand/Default` | `Background/Brand/Hover` | same | same | `Background/Disabled/Default` |
| Box border, unchecked | `Border/Brand/Tertiary` | same | `Border/Focus/Default` | `Border/Danger/Default` | `Border/Disabled/default` |
| Box border, checked and indeterminate | None | same | `Border/Focus/Default` | `Border/Danger/Default` | `Border/Disabled/default` |
| Glyph | `Icon/Brand/On Brand` | same | same | same | `Icon/Disabled/On Disabled` |
| Label | `Text/Default/Default` | same | same | same | `Text/Disabled/Default` |
| Description | `Text/Default/Secondary` | same | same | same | same, at 50% opacity |

#### All states

| Part | Token |
|---|---|
| Error message | `Text/Danger/Default` |
| Border width | `Stroke/Border` (1px) |
| Focus ring width | `Stroke/Focus Ring` (2px) |
| Corner radius | `Radius/100` (4px) |
| Gap between box and label | `Space/300` (12px) |
| Label, description and error message text | `Body Base` (16px, regular, line height 140%) |

## Tab: Code and accessibility

### Import

<!-- block: code -->
```tsx
import { CheckboxField } from "primitives";
```

### Example

<!-- block: code -->
```tsx
<CheckboxField
  label="Label"
  description="Description"
  defaultSelected
/>
```

<!-- block: storybook -->
sds-primitives-inputs--story-checkbox-field

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | string | | Text of the label. |
| `description` | string | | Supporting text under the label. Leave it out to hide it. |
| `isSelected`, `defaultSelected` | boolean | `false` | Checked or not, controlled or uncontrolled. |
| `isIndeterminate` | boolean | `false` | Shows the filled box with the Minus glyph. |
| `isDisabled` | boolean | `false` | Blocks clicks and focus. |
| `onChange` | function | | Called with the new selected value. |
| `value` | string | | The value of the checkbox inside a Checkbox Group. |
| `isInvalid` | boolean | `false` | Shows the error border and the error message. |
| `errorMessage` | string | | Shown under the description while the field is invalid. |
| `children` | text | | Used as the label when `label` is not set. |

CheckboxField also accepts the other props of the react-aria-components Checkbox.

### From Figma to code

| Figma property | Code |
|---|---|
| Label | `label` |
| Has Description, Description | `description` |
| Value Type = Checked | `defaultSelected` |
| Value Type = Indeterminate | `defaultSelected` and `isIndeterminate` |
| Value Type = Unchecked | No prop. |
| State = Disabled | `isDisabled` |
| State = Error | `isInvalid` |
| Has Error, Error | `errorMessage` |
| State = Hover, Focus | Handled by the browser. No prop. |

### Notes

- The description and the error message are shown by passing their text. Leave the prop out to hide the part.
- The error message only appears while the field is invalid.
- Indeterminate shows the Minus glyph whether or not the checkbox is selected.
- CheckboxField is built from Checkbox and Description, with the Check and Minus icons. Reuse them; do not create new ones.

### Accessibility

The component handles

- It is built on React Aria Components. It renders an input of type checkbox inside a real label, so the whole row is clickable.
- The label names the checkbox. The description and the error message are linked to it with `aria-describedby`.
- Indeterminate is exposed as a mixed value.
- Disabled sets the `disabled` attribute, so clicks and focus are blocked.
- The glyph is hidden from assistive technology.

You must do

- Give every checkbox a label.

### Accessibility test results

Tested on 25 November 2026, in light and dark.

| Check | Result |
|---|---|
| Automated scan (axe-core) | 0 serious or critical issues |
| Keyboard | Pass. Tab reaches the checkbox, Space and Enter toggle it, a disabled checkbox is skipped and cannot be changed. |
| Pointer | A click on the label or on the description toggles the checkbox. |
| Name and description | The label names the checkbox. The description and the error message are linked to it. |
| Label contrast | 16.67:1 in light and in dark |
| Description contrast | 4.61:1 in light, 8.69:1 in dark |
| Unchecked border contrast | 4.61:1 in light, 7.95:1 in dark |
| Checked fill contrast | 13.97:1 in light, 15.29:1 in dark |
| Glyph contrast on the checked fill | 12.81:1 in light, 15.29:1 in dark |
| Focus ring contrast | 4.36:1 in light, 3.82:1 in dark against the page; 3.2:1 in light, 4:1 in dark against the checked fill |
| Error message contrast | 9.38:1 in light, 12.23:1 in dark |
| Error border contrast | 9.38:1 in light, 12.23:1 in dark against the page, for all value types |
| Screen reader | Not tested |

### Known accessibility issues

- Error without a message is shown by the border colour alone. On a checked or indeterminate box the border has little contrast against the fill it touches (1.49:1 in light, 1.25:1 in dark), although it passes against the page. Turn Has Error on with State set to Error.
- Focus on a field with an error replaces the danger border with the focus ring. Focus with Error, Hover with Error and Disabled with Error are not designed.
- Hover is a faint change: the unchecked fill differs from Default by 1.09:1 in light and 1.42:1 in dark.
- In Figma the error line can be shown in any state. In code it only shows while the field is invalid.
- Disabled in light: the glyph and the border have a contrast of 1.49:1 against the disabled fill, so a disabled checked box is hard to tell from a disabled unchecked one. Disabled controls are exempt from the contrast minimum.
- Without a description the clickable row is 22px high.

### Changelog

<!-- block: changelog -->
| Date | Version | Notes |
|---|---|---|
| 25 November 2026 | Unreleased | Documentation page written: usage, design, code and accessibility. |
| 25 November 2026 | Unreleased | Hover has a look of its own: the box fill changes. New Error state: a danger border on the outer edge of the box, and an error message with the Has Error and Error properties. |
| 25 November 2026 | Unreleased | Aligned with Figma: the unchecked border uses `Border/Brand/Tertiary`; the focus ring sits on the edge of the box and uses `Border/Focus/Default`; there is no gap between label and description; when disabled, the description is shown at 50% opacity. |
| 25 November 2026 | Unreleased | Figma: the label of the Disabled variants uses `Text/Disabled/Default`. The Hover and Focus variants are connected to the Label, Description and Has Description properties. |
| 25 November 2026 | Unreleased | Accessibility: the description is linked to the checkbox with `aria-describedby`, the glyph is hidden from assistive technology, and the label is no longer a label inside a label. |
| 25 November 2026 | Unreleased | Code Connect published. |
| 25 November 2026 | Unreleased | New story "Checkbox States" with the twelve Figma variants. |
