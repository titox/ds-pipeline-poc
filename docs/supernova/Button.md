# Button: documentation text for Supernova

First version written to Supernova as an unpublished draft on 25 November 2026. The template improvements of the same day (link cards, chips, changelog, related reading, in-page tabs, anatomy illustration, contact card, status board, top bar) are in this file and in the mock-up, not yet in Supernova.

The Button page has three tabs, because the Supernova plan in use allows three: Usage, Design, and Code and accessibility. Each section below becomes one tab.

Everything is taken from the Figma description, `Button.tsx`, the RubyLint export and the review scorecard of 2026-11-24.

Page description (shown under the title): Button triggers an action or submits a form.

---

## Tab 1: Usage

### Status

Status values are always shown as coloured chips: green for Ready and Passed, amber for Pending, grey for Not tested, red for Missing.

| Area | Status | Detail |
|---|---|---|
| Design | Ready | 30 variants in Figma. Readiness audit: 94%. |
| React | Ready | Matches all 30 Figma variants in light and dark. |
| Review | Passed | Six of six criteria, 24 November 2026. |
| Code Connect | Pending | Mapping is written. It is not published yet. |
| Screen reader | Not tested | See Code and accessibility. |

### What it is

Button is the standard way to trigger an action. It has three levels of emphasis, two sizes and five states. It holds a text label and can show one icon before the label and one after it.

### Links

Shown as cards with a logo, not as a list.

| Card | Title | Subtitle | Target |
|---|---|---|---|
| Figma logo | Button | Figma component set | Node 4185:3778 in the Figma file |
| Storybook logo | Button | Storybook | Story "SDS Primitives / Buttons / Button" |
| Code icon | Button.tsx | Source code | `src/ui/primitives/Button/Button.tsx` |

### When to use it

Use it for

- Triggering an action: save, send, add, confirm.
- Submitting a form.

Not for this

- Going to another page. Use a link.
- Destructive actions. Use Button Danger.
- An action with no room for a label. Use Icon Button.

### Button or link

| | Button | Link |
|---|---|---|
| Purpose | Does something | Goes somewhere |
| Example | Save, Add to basket | View details, Read the terms |
| Keyboard | Enter and Space | Enter |

### Choosing a variant

- Use one Primary button per view, for the main action.
- Use Neutral for the actions next to it.
- Use Subtle where the button must sit quietly inside dense content.

### Icons

- Add an icon to add meaning, not decoration.
- Use at most one icon before the label and one after it.
- Do not use an icon without a label here. Use Icon Button.

### Do and don't

| Do | Don't |
|---|---|
| Use one Primary button for the main action in a view. | Place two Primary buttons side by side. |
| Use Loading while an action is in progress. | Use Small as the only action on a touch screen. |

### Related components

- **Button Danger**: for destructive actions, such as delete.
- **Icon Button**: for an action shown by an icon alone.
- **Button Group**: to lay out two or more buttons together.

### Related reading

Suggested from memory. Every title and address must be checked by a person before publishing.

1. "Button States: Communicate Interaction", Nielsen Norman Group. https://www.nngroup.com/articles/button-states-communicate-interaction/ (to verify)
2. "OK-Cancel or Cancel-OK? The Trouble With Buttons", Nielsen Norman Group. https://www.nngroup.com/articles/ok-cancel-or-cancel-ok/ (to verify)
3. "Frustrating Design Patterns: Disabled Buttons", Vitaly Friedman, Smashing Magazine. https://www.smashingmagazine.com/2021/08/frustrating-design-patterns-disabled-buttons/ (to verify)
4. "Fitts's Law", Laws of UX. https://lawsofux.com/fittss-law/ (to verify)
5. "Button design: user interface components series", Taras Bakusevych, UX Collective. Address unknown (to verify)

### Need help?

Callout: Not sure which variant or size to use? Ask the design system team.

Card with the Microsoft Teams logo: "Contact the design system team", subtitle "Microsoft Teams channel". The link is a placeholder until the real channel is added.

---

## Tab 2: Design

### Anatomy

Illustration: Figma frame "Anatomy / Button" on the page "Docs / Button".

1. **Container:** carries the fill, the border and the padding.
2. **Start icon (optional):** shown before the label. The spinner takes this place while loading.
3. **Label:** the text of the button.
4. **End icon (optional):** shown after the label. Hidden while loading.

### Variants

| Variant | Look | Use it for |
|---|---|---|
| Primary | Brand fill | The single most important action in a view. |
| Neutral | Grey surface with a visible border | Supporting actions beside the primary one. |
| Subtle | No fill, no border | A quiet action inside dense content. |

### Sizes

| Size | Height | Padding | Text and icon |
|---|---|---|---|
| Medium (default) | 40px | 12px (`Space/300`) | 16px |
| Small | 32px | 8px (`Space/200`) | 16px |

Small is 32px high. That meets the 24px minimum target size but is below the recommended 44px. Avoid Small as the main action on touch screens.

### States

| State | What changes |
|---|---|
| Default | Resting look. |
| Hover | Primary and Neutral get a darker fill. Subtle gains a 1px border and darker text. |
| Focus | A 2px ring on the edge of the button. It shows for keyboard users only. |
| Disabled | Grey fill, border, text and icon. The button cannot be pressed or focused. |
| Loading | A spinner shows before the label. The end icon is hidden. Presses are blocked. |

There is no Pressed state.

Shown in two in-page tabs: Light and Dark.

### Tokens

Shown in two in-page tabs: Colour and All variants.

Colour

| Part | Primary | Neutral | Subtle |
|---|---|---|---|
| Fill | `Background/Brand/Default` | `Background/Neutral/Tertiary` | none |
| Fill on hover | `Background/Brand/Hover` | `Background/Neutral/Tertiary Hover` | none |
| Border | `Border/Brand/Default` | `Border/Neutral/Secondary` | none, `Border/Default/Default` on hover |
| Label | `Text/Brand/On Brand` | `Text/Default/Default` | `Text/Neutral/Default`, `Text/Default/Default` on hover |
| Icon | `Icon/Brand/On Brand` | `Icon/Default/Default` | `Icon/Default/Default` |

All variants

| Part | Token |
|---|---|
| Disabled fill | `Background/Disabled/Default` |
| Disabled border | `Border/Disabled/default` |
| Disabled label and icon | `Text/Disabled/On Disabled`, `Icon/Disabled/On Disabled` |
| Focus ring | `Border/Focus/Default`, `Stroke/Focus Ring` (2px) |
| Border width | `Stroke/Border` (1px) |
| Corner radius | `Radius/200` (8px) |
| Gap between icon and label | `Space/200` (8px) |
| Label | `Single Line/Body Base` (Inter, 16px, regular) |

The component uses 26 tokens and no hard-coded values. Each token has a light and a dark value, so the button follows the theme with no extra work.

---

## Tab 3: Code and accessibility

### Import

```tsx
import { Button } from "primitives";
```

### Example

```tsx
import { IconArrowLeft } from "icons";

<Button variant="primary" size="medium" onPress={save}>
  <IconArrowLeft />
  Save changes
</Button>
```

(Storybook embed: the "Button" story with its controls.)

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary"`, `"neutral"`, `"subtle"` | `"primary"` | Level of emphasis. |
| `size` | `"medium"`, `"small"` | `"medium"` | Height and padding. |
| `isDisabled` | boolean | `false` | Blocks presses and removes the button from the Tab order. |
| `isLoading` | boolean | `false` | Shows a spinner before the label and blocks presses. |
| `type` | `"button"`, `"submit"`, `"reset"` | `"button"` | Standard HTML button type. |
| `onPress` | function | | Called on click, Enter or Space. |
| `children` | node | | The label. Icons are passed here too, before or after the text. |
| `href` | string | | Renders the button as a link. See the note below. |

Button also accepts the press, focus and ARIA props of react-aria-components.

### From Figma to code

| Figma property | Code |
|---|---|
| Variant | `variant` |
| Size | `size` |
| Label | `children` |
| Has Icon Start, Icon Start | An icon element before the label |
| Has Icon End, Icon End | An icon element after the label |
| State = Disabled | `isDisabled` |
| State = Loading | `isLoading` |
| State = Hover, Focus | Handled by the browser. No prop. |

### Notes

- Icons are children, not props. Leave the icon out to hide it.
- A loading submit button does not submit the form.
- `href` works, but the design guidance is to use a link for navigation. Whether Button keeps `href` is an open decision.

### Accessibility

The component handles

- It renders a real `<button>`, so the role and keyboard behaviour are native.
- Enter and Space activate it.
- The focus ring shows for keyboard users only.
- Disabled sets the `disabled` attribute. The button leaves the Tab order.
- Loading keeps the button focusable, sets `aria-disabled="true"` and blocks presses.

You must do

- Write a label that makes sense out of context.
- Do not rely on an icon alone to carry the meaning.
- When you use Loading, tell screen reader users that work is in progress. The component does not do this yet.

### Accessibility test results

Tested on 24 November 2026, in light and dark.

| Check | Result |
|---|---|
| Automated scan (axe-core 4.14) | 0 serious or critical issues |
| Keyboard | Pass. Tab order, Enter, Space, Disabled and Loading behave as described. |
| Label contrast | 10.5:1 or higher in every variant, at rest and on hover |
| Focus ring contrast | 3.0:1 or higher against every surface |
| Target size | Medium 40px, Small 32px. Both above the 24px minimum, both below the recommended 44px. |
| Screen reader | Not tested |
| Forced colours mode | Not tested |

### Known accessibility issues

- Loading is not announced to screen readers, and the spinner does not move.
- Disabled text has a contrast of 1.49:1 in light mode. Disabled controls are exempt from the contrast rule, but the label is hard to read.
- The hover border of Subtle is faint (1.4:1 in light).
- The focus ring is red, the same colour as errors. A distinct focus colour is planned.

### Changelog

| Date | Version | Notes |
|---|---|---|
| 25 November 2026 | Unreleased | Documentation page written: usage, design, code and accessibility. |
| 24 November 2026 | Unreleased | Loading hides the end icon. A Button used as a link can no longer be activated while loading. |
| 24 November 2026 | Unreleased | Subtle uses `Text/Neutral/Default` for its label in both sizes. |
| 24 November 2026 | Unreleased | Neutral, Disabled and Focus aligned with the Figma tokens. Small uses 16px text and icons. |

The package has no version numbers yet (it is at 0.0.0). The Version column fills in from the first release.

---

## Site level, outside the Button page

- **Top bar with sections:** Get started, Foundations, Components, Patterns, Accessibility, Content, plus search and a "Contact the team" button. Only Foundations and Components exist in Supernova today.
- **Status board:** a page "Components / Overview" with one row per component and chips for Design audit, React, Review, Code Connect and Documentation. The mock-up shows the 16 audited components of the Buttons and Inputs pages.
