---
component: Input Field
figmaNode: "2136:2263"
storybook: sds-primitives-inputs--story-input-field
source: src/ui/primitives/Input/Input.tsx
summary: Input Field lets a person type one line of free text.
updated: 2026-11-25
---

<!--
Neutral source for the Input Field documentation page. Every destination
(Supernova, Docusaurus) is produced from this file.
Sources: the Figma description and variants of node 2136:2263, Input.tsx, fieldset.css,
InputField.figma.ts, the contract in docs/components/ and eval/scorecards/Input-Field.md.
-->

## Images

Alternative text for the illustrations. They are frames on the Figma page "Docs / Input Field".

| Node | Alt |
|---|---|
| 3161:12920 | A field with the label Email address above the input and a placeholder inside it |
| 3161:12928 | A field with no label; the words Email address appear only as the placeholder |
| 3161:12936 | A Postcode field holding a short value on one line |
| 3161:12944 | A Delivery notes field with a long sentence squeezed into the input |
| 3161:12952 | A Password field with the description At least 12 characters under the input |
| 3161:12960 | A Password field with the rule At least 12 characters shown only as the placeholder |
| 3161:12968 | An Email address field with a red border and the message Enter a full email address |
| 3161:12976 | An Email address field with a red border and no message |
| 3161:12984 | A Country field shown as a Select Field with United Kingdom chosen |
| 3161:12999 | A Country field shown as an Input Field with the placeholder Type your country |

## Tab: Usage

### Status

<!-- block: status -->
| Area | Status | Detail |
|---|---|---|
| Design | Ready | 10 variants in Figma. Readiness audit: 97%. |
| React | Ready | Matches the 10 Figma variants in light and dark. |
| Review | Known issues | Four of six criteria pass, 25 November 2026. Two fail on contrast values that come from the design. |
| Code Connect | Ready | Published on 25 November 2026. |
| Screen reader | Not tested | See Code and accessibility. |

### What it is

Input Field is a single-line text field with an optional label, description and error message. It has five states and shows either a value or a placeholder.

The label says what to enter, the description gives extra help and the error message says what to fix.

### Links

<!-- block: cards -->
| Logo | Title | Subtitle | Target |
|---|---|---|---|
| Figma | Input Field | Figma component set | Node 2136:2263 in the Figma file |
| Storybook | Input Field | Storybook | Story `sds-primitives-inputs--story-input-field` |
| Code | Input.tsx | Source code | `src/ui/primitives/Input/Input.tsx` |

### When to use it

Use it for

- One line of free text, such as a name, an email address or a postcode.

Not for this

- Several lines of text. Use Textarea Field.
- A fixed list of options. Use Select Field.
- A search query. Use Search.

### Do and don't

<!-- block: do-dont -->
<!-- Sources: 1, 2 and 5 from USAGE in the Figma description; 3 from PURPOSE and the
placeholder contrast in the scorecard; 4 from PURPOSE and BEHAVIOUR. -->
| Do | Don't | Figma frame |
|---|---|---|
| Keep a visible label. | Use a placeholder as the only label. | 3161:12920, 3161:12928 |
| Use it for one line of free text, such as a name or a postcode. | Use it for several lines of text. Use Textarea Field. | 3161:12936, 3161:12944 |
| Use the description for extra help. | Put help a person needs in the placeholder. The value replaces it, and its contrast is low. | 3161:12952, 3161:12960 |
| Write an error message that says what to fix. | Show the error border with no message. | 3161:12968, 3161:12976 |
| Use Select Field when the options are a fixed list. | Ask people to type a value from a fixed list. | 3161:12984, 3161:12999 |

### Related components

<!-- block: cards -->
| Logo | Title | Subtitle | Target |
|---|---|---|---|
| Figma preview | Textarea Field | For several lines of text. | Story `sds-primitives-inputs--story-textarea-field` |
| Figma preview | Select Field | For a fixed list of options. | Story `sds-primitives-inputs--story-select-field` |
| Figma preview | Search | For a search query. | Story `sds-primitives-inputs--story-search` |

### Need help?

<!-- block: callout -->
Not sure which field to use? Ask the design system team.

<!-- block: contact -->
Contact the design system team, Microsoft Teams channel, placeholder link

## Tab: Design

### Anatomy

<!-- block: image -->
An Input Field with four numbered markers: 1 label, 2 input, 3 description, 4 error message. Figma frame 3161:13007

1. **Label (optional):** says what to enter.
2. **Input:** the box that holds the value or the placeholder. It carries the fill and the border.
3. **Description (optional):** extra help.
4. **Error message (optional):** says what to fix.

### Variants

| Value Type | What it shows |
|---|---|
| Default | An entered value, in the default text colour. |
| Placeholder | A placeholder, in a lighter text colour. |

### Size

Input Field has one size.

| Part | Value |
|---|---|
| Input height | 40px |
| Padding | 12px above and below (`Space/300`), 16px left and right (`Space/400`) |
| Gap between label, input, description and error message | 8px (`Space/200`) |
| Text | 16px |

### States

| State | What changes |
|---|---|
| Default | Resting look. |
| Hover | The border changes to `Border/Default/Secondary`. |
| Focus | A 2px border in `Border/Focus/Default`. It takes priority over Hover and Error. It shows on any focus, pointer or keyboard. |
| Error | The border changes to `Border/Danger/Default`. |
| Disabled | Disabled background, text and border colours. It does not react to Hover or Focus. |

There is no Pressed state.

### Tokens

<!-- block: tabs-in-page -->

#### Colour

| Part | Default | Hover | Focus | Error | Disabled |
|---|---|---|---|---|---|
| Fill | `Background/Default/Default` | same | same | same | `Background/Disabled/Default` |
| Border | `Border/Default/Default` | `Border/Default/Secondary` | `Border/Focus/Default` | `Border/Danger/Default` | `Border/Disabled/default` |
| Value | `Text/Default/Default` | same | same | same | `Text/Disabled/On Disabled` |
| Placeholder | `Text/Default/Tertiary` | same | same | same | `Text/Disabled/On Disabled` |
| Label | `Text/Default/Default` | same | same | same | `Text/Disabled/Default` |
| Description | `Text/Default/Secondary` | same | same | same | same |

#### All states

| Part | Token |
|---|---|
| Error message | `Text/Danger/Default` |
| Border width | `Stroke/Border` (1px) |
| Focus border width | `Stroke/Focus Ring` (2px) |
| Corner radius | `Radius/200` (8px) |
| Value and placeholder text | `Single Line/Body Base` (16px, regular) |
| Label, description and error message text | `Body Base` (16px, regular, line height 140%) |

## Tab: Code and accessibility

### Import

<!-- block: code -->
```tsx
import { InputField } from "primitives";
```

### Example

<!-- block: code -->
```tsx
<InputField
  label="Email"
  description="We only use it to confirm your order."
  placeholder="name@example.com"
  type="email"
  isRequired
/>
```

<!-- block: storybook -->
sds-primitives-inputs--story-input-field

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | string | | Text of the label. Leave it out to hide the label. |
| `description` | string | | Help text under the input. Leave it out to hide it. |
| `placeholder` | string | | Shown while the field is empty. |
| `errorMessage` | string or function | | Shown under the field while it is invalid. |
| `isInvalid` | boolean | `false` | Shows the error border and the error message. |
| `isDisabled` | boolean | `false` | Blocks typing and focus. |
| `isRequired` | boolean | `false` | Marks the field as required. |
| `value`, `defaultValue` | string | | The text, controlled or uncontrolled. |
| `onChange` | function | | Called with the new text. |
| `type` | string | `"text"` | Standard HTML input type. |

InputField also accepts the other props of the react-aria-components TextField.

### From Figma to code

| Figma property | Code |
|---|---|
| Has Label = true | `<InputField label="…">` |
| Has Label = false | `<InputField aria-label="…">`, so the field still has a name |
| Label | `label` |
| Has Description, Description | `description` |
| Value, Value Type = Default | `defaultValue` |
| Value, Value Type = Placeholder | `placeholder` |
| State = Error | `isInvalid` |
| Has Error, Error | `errorMessage` |
| State = Disabled | `isDisabled` |
| State = Hover, Focus | Handled by the browser. No prop. |

### Notes

- Label, description and error message are shown by passing their text. Leave the prop out to hide the part.
- The error message only appears while the field is invalid.
- InputField is built from Label, Input, Description and FieldError. Reuse them; do not create new ones.

### Accessibility

The component handles

- It is built on React Aria Components, which link the label, the description and the error message to the input.
- The error is announced when the field is invalid.
- Disabled sets the `disabled` attribute.

You must do

- Keep a visible label. A placeholder alone is not a label.

### Accessibility test results

Tested on 25 November 2026, in light and dark.

| Check | Result |
|---|---|
| Automated scan (axe-core) | 0 issues |
| Keyboard | Pass. Tab reaches the input, typing works, a disabled field is skipped and cannot be edited. |
| Name and description | The label names the input. The description and the error message are linked to it. |
| Value and label contrast | 16.67:1 in light and in dark |
| Description contrast | 4.61:1 in light, 8.69:1 in dark |
| Error message contrast | 9.38:1 in light, 12.23:1 in dark |
| Focus border contrast | 4.36:1 in light, 3.82:1 in dark |
| Placeholder contrast | 2.1:1 in light, 3.78:1 in dark. Below the 4.5:1 minimum. |
| Default border contrast | 1.41:1 in light, 1.71:1 in dark. Below the 3:1 minimum. |
| Screen reader | Not tested |

### Known accessibility issues

- The placeholder text is below the minimum contrast in light and in dark.
- The default border is below the minimum contrast in light and in dark.
- Focus is shown by a 2px red border. On a field with an error it changes from red to red.
- The error message is linked to the input but is not a live region.

### Changelog

<!-- block: changelog -->
| Date | Version | Notes |
|---|---|---|
| 25 November 2026 | Unreleased | Documentation page written: usage, design, code and accessibility. |
| 25 November 2026 | Unreleased | The input is 40px high with 12px padding, as in Figma. Disabled value and placeholder use `Text/Disabled/On Disabled`. The description keeps its colour when the field is disabled. |
| 25 November 2026 | Unreleased | Label, description and error message use the Body Base line height (140%). |
| 25 November 2026 | Unreleased | Code Connect published: Has Error maps to `errorMessage`. A field without a label keeps `InputField` with `aria-label`. |
| 24 November 2026 | Unreleased | Hover and Focus states added. |
