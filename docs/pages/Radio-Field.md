---
component: Radio Field
figmaNode: "9762:1412"
storybook: sds-primitives-inputs--story-radio-field
source: src/ui/primitives/Radio/Radio.tsx
summary: Radio Field is one option in a set where only one can be picked.
updated: 2026-11-25
---

<!--
Neutral source for the Radio Field documentation page. Every destination
(Supernova, Docusaurus) is produced from this file.
Sources: the Figma description and variants of node 9762:1412, Radio.tsx, radio.css,
RadioField.figma.ts, the contract in docs/components/ and eval/scorecards/Radio-Field.md.
-->

## Images

Alternative text for the illustrations. They are frames on the Figma page "Docs / Radio Field".

| Node | Alt |
|---|---|
| 3179:22114 | Three radios for Standard delivery, Express delivery and Collect in store, with Standard delivery checked |
| 3179:22149 | Three radios for Email updates, Text message updates and Updates by post, with only Email updates checked |
| 3179:22184 | Three radios for Small, Medium and Large, with Medium checked |
| 3179:22219 | A list of ten countries shown as radios, with Finland checked |
| 3179:22331 | Two radios for Standard delivery and Express delivery, without descriptions |
| 3179:22355 | Two radios for Standard delivery and Express delivery, each with a description that repeats its label |

## Tab: Usage

### Status

<!-- block: status -->
| Area | Status | Detail |
|---|---|---|
| Design | Ready | 10 variants in Figma. Readiness audit: 97%. |
| React | Ready | Matches the 10 Figma variants in light and dark. |
| Review | Passed | All six criteria pass, 25 November 2026, round 2. |
| Code Connect | Ready | Published on 25 November 2026. |
| Screen reader | Not tested | See Code and accessibility. |

### What it is

Radio Field is a single radio choice with a label, an optional description line and an optional error message. It has five states and two value types: unchecked and checked.

It lets a person pick one option from a set of mutually exclusive choices. Each Radio Field is one option in that set.

### Links

<!-- block: cards -->
| Logo | Title | Subtitle | Target |
|---|---|---|---|
| Figma | Radio Field | Figma component set | Node 9762:1412 in the Figma file |
| Storybook | Radio Field | Storybook | Story `sds-primitives-inputs--story-radio-field` |
| Code | Radio.tsx | Source code | `src/ui/primitives/Radio/Radio.tsx` |

### When to use it

Use it for

- Picking one option from a set, where every option stays visible.

Not for this

- Choices where more than one answer can be picked. Use Checkbox Field.
- A long list of options. Use Select Field.

### Do and don't

<!-- block: do-dont -->
<!-- Sources: all three pairs from USAGE in the Figma description. -->
| Do | Don't | Figma frame |
|---|---|---|
| Use it when only one option can be picked. | Use it when more than one answer can be picked. Use Checkbox Field. | 3179:22114, 3179:22149 |
| Use it when every option can stay visible. | Use it for a long list. Use Select Field. | 3179:22184, 3179:22219 |
| Turn the description off when the label is clear on its own. | Keep a description that adds nothing to the label. | 3179:22331, 3179:22355 |

### Related components

<!-- block: cards -->
| Logo | Title | Subtitle | Target |
|---|---|---|---|
| Figma preview | Radio Group | Holds the Radio Fields of one set. | Story `sds-primitives-inputs--story-radio-group` |
| Figma preview | Checkbox Field | For choices where more than one answer can be picked. | Story `sds-primitives-inputs--story-checkbox-field` |
| Figma preview | Select Field | For a long list of options. | Story `sds-primitives-inputs--story-select-field` |

### Need help?

<!-- block: callout -->
Not sure which control to use? Ask the design system team.

<!-- block: contact -->
Contact the design system team, Microsoft Teams channel, placeholder link

## Tab: Design

### Anatomy

<!-- block: image -->
A Radio Field with five numbered markers: 1 radio, 2 dot, 3 label, 4 description, 5 error message. Figma frame 3179:22379

1. **Radio:** the circle. It carries the fill, the border and the dot.
2. **Dot:** shown when the radio is checked.
3. **Label:** the text next to the circle.
4. **Description (optional):** supporting text under the label.
5. **Error message (optional):** says what to fix. It sits under the description.

### Variants

| Value Type | What it shows |
|---|---|
| Unchecked | An empty circle with a border. |
| Checked | A filled circle with a dot. This is the default in Figma. |

Checked and Unchecked are a property of the design file only. In code the checked option comes from the value of the Radio Group.

### Size

Radio Field has one size.

| Part | Value |
|---|---|
| Circle | 16px by 16px |
| Dot | 10px by 10px |
| Gap between circle and label | 12px (`Space/300`) |
| Gap between label and description | None |
| Text | 16px |

The description and the error message are aligned with the label, not with the circle.

### States

| State | What changes |
|---|---|
| Default | Resting look. |
| Hover | The circle fill changes: `Background/Default/Default Hover` when unchecked, `Background/Brand/Secondary Hover` when checked. |
| Focus | The border becomes a 2px ring in `Border/Focus/Default`, inside the circle. It shows on keyboard focus. |
| Disabled | Disabled fill, border and dot colours on the circle. The label and the description use the disabled text colour. |
| Error | The border uses `Border/Danger/Default`. The error message shows when Has Error is on. |

There is no Pressed state.

### Tokens

<!-- block: tabs-in-page -->

#### Colour

| Part | Default | Hover | Focus | Error | Disabled |
|---|---|---|---|---|---|
| Circle fill, unchecked | `Background/Default/Default` | `Background/Default/Default Hover` | same | same | `Background/Disabled/Default` |
| Circle fill, checked | `Background/Brand/Secondary` | `Background/Brand/Secondary Hover` | same | same | `Background/Disabled/Default` |
| Circle border, unchecked | `Border/Brand/Tertiary` | same | `Border/Focus/Default` | `Border/Danger/Default` | `Border/Disabled/default` |
| Circle border, checked | `Border/Brand/Default` | same | `Border/Focus/Default` | `Border/Danger/Default` | `Border/Disabled/default` |
| Dot | `Icon/Brand/On Brand Secondary` | same | same | same | `Icon/Disabled/Default` |
| Label | `Text/Default/Default` | same | same | same | `Text/Disabled/Default` |
| Description | `Text/Default/Secondary` | same | same | same | `Text/Disabled/Default` |

#### All states

| Part | Token |
|---|---|
| Error message | `Text/Danger/Default` |
| Border width | `Stroke/Border` (1px) |
| Focus ring width | `Stroke/Focus Ring` (2px) |
| Corner radius | `Radius/Full` |
| Gap between circle and label | `Space/300` (12px) |
| Label, description and error message text | `Body Base` (16px, regular, line height 140%) |

## Tab: Code and accessibility

### Import

<!-- block: code -->
```tsx
import { RadioField, RadioGroup } from "primitives";
```

### Example

<!-- block: code -->
```tsx
<RadioGroup aria-label="Radio field example" defaultValue="hello">
  <RadioField value="hello" label="Label" description="Description" />
</RadioGroup>
```

<!-- block: storybook -->
sds-primitives-inputs--story-radio-field

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | string | | The value of this option inside its Radio Group. Required. |
| `label` | string | | Text of the label. |
| `description` | string | | Supporting text under the label. Leave it out to hide it. |
| `isDisabled` | boolean | `false` | Blocks clicks and focus. |
| `errorMessage` | string | | Shown under the description while the Radio Group is invalid. |
| `children` | text | | Used as the label when `label` is not set. |

RadioField also accepts the other props of the react-aria-components Radio. The checked option (`value`, `defaultValue`) and the error state (`isInvalid`) are set on RadioGroup.

### From Figma to code

| Figma property | Code |
|---|---|
| Label | `label` |
| Has Description, Description | `description` |
| State = Disabled | `isDisabled` |
| Has Error, Error | `errorMessage` |
| State = Error | No prop on the field. Set `isInvalid` on RadioGroup. |
| Value Type | No prop on the field. Set `value` or `defaultValue` on RadioGroup. |
| State = Hover, Focus | Handled by the browser. No prop. |

### Notes

- A Radio Field must sit inside a Radio Group.
- The description and the error message are shown by passing their text. Leave the prop out to hide the part.
- The error message only appears while the Radio Group is invalid.

### Accessibility

The component handles

- It is built on React Aria Components. It renders an input of type radio inside a real label, so the whole row is clickable.
- The label names the radio. The description and, while the group is invalid, the error message are linked to it with `aria-describedby`.
- Arrow keys move between the options of a group.
- Disabled sets the `disabled` attribute, so clicks and focus are blocked.
- The dot is hidden from assistive technology.
- The focus ring shows on keyboard focus only, not after a mouse click.

You must do

- Give every radio a label.
- Give the Radio Group a label, visible or with `aria-label`.

### Accessibility test results

Tested on 25 November 2026, in light and dark.

| Check | Result |
|---|---|
| Automated scan (axe-core) | 0 serious or critical issues |
| Keyboard | Pass. Tab reaches the radio, Space and Enter select it, arrow keys move inside a group, a disabled radio is skipped and cannot be selected. |
| Name and description | The label names the radio. The description and the error message are linked to it. |
| Label contrast | 16.67:1 in light and in dark |
| Description contrast | 4.61:1 in light, 8.68:1 in dark |
| Unchecked border contrast | 4.61:1 in light, 7.95:1 in dark |
| Checked border contrast | 13.97:1 in light, 15.29:1 in dark |
| Dot contrast on the checked fill | 13.36:1 in light, 8.93:1 in dark |
| Focus ring contrast | 4.36:1 in light, 3.82:1 in dark against the page |
| Error message contrast | 9.38:1 in light, 12.23:1 in dark |
| Error border contrast | 9.38:1 in light, 12.23:1 in dark against the page |
| Screen reader | Not tested |

### Known accessibility issues

- Error without a message is shown by the border colour alone. The danger border differs from the resting border by 1.49:1 (checked) and 2.04:1 (unchecked) in light, and 1.25:1 and 1.54:1 in dark. Turn Has Error on with State set to Error.
- Focus on an unchecked radio differs from rest mostly in colour: the ring against the resting border is 1.06:1 in light and 2.08:1 in dark, plus 1px of thickness.
- Focus on a checked radio in dark: the ring against the checked fill is 2.23:1. Against the page it is 3.82:1.
- Focus and Error both use a red border, so a focused unchecked radio looks much like one with an error.
- Hover is a faint change in light: the fill differs from Default by 1.09:1 (unchecked) and 1.13:1 (checked).
- In Figma the error line can be shown in any state. In code it only shows while the Radio Group is invalid.
- Without a description the clickable row is 22px high.

### Changelog

<!-- block: changelog -->
| Date | Version | Notes |
|---|---|---|
| 25 November 2026 | Unreleased | Illustrations added: six do and don't frames and an anatomy frame on the Figma page "Docs / Radio Field". |
| 25 November 2026 | Unreleased | Code Connect published. |
| 25 November 2026 | Unreleased | Documentation page written: usage, design, code and accessibility. |
| 25 November 2026 | Unreleased | Figma: Hover has a look of its own, the circle fill changes. New error message with the Has Error and Error properties. The Hover, Focus and Error variants are connected to the Label, Description and Has Description properties. Disabled uses `Text/Disabled/Default` for label and description in both value types. |
| 25 November 2026 | Unreleased | Aligned with Figma: checked fill, border and dot colours; the unchecked border uses `Border/Brand/Tertiary`; the focus ring replaces the border inside the circle; new Hover and Error looks; 10px dot; 12px gap; no gap between label and description. |
| 25 November 2026 | Unreleased | Accessibility: the description and the error message are linked to the radio with `aria-describedby`, and the description of a radio no longer registers as the description of its group. |
| 25 November 2026 | Unreleased | New story "Radio States" with the ten Figma variants. |
