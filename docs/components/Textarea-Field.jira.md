# Textarea Field — Handoff

Open in Figma: https://www.figma.com/design/huu1as0pMzvGdqqDpQ5JyE/?node-id=9762-3088

**Design system readiness:** 89%

## Summary

_No description set on this component in Figma._

## Acceptance criteria

- [ ] Variants: State (Default, Error, Disabled) × Value Type (Default, Placeholder)
- [ ] Properties: Has Label, Has Error, Label, Error, Description, Has Description, Value, State, Value Type with the defaults below
- [ ] Textarea Field: states Default, Error, Disabled, Hover, Focus, Filled (design missing: Hover, Focus, Filled)
- [ ] Textarea Field uses `<input> + <label for>`; keyboard Standard text editing; Tab moves on
- [ ] Visible focus ring on every interactive element (WCAG 2.4.7)
- [ ] Lowest contrast 1.5:1, WCAG 2.2 AA needs 4.5:1
- [ ] Uses design tokens only, no hard-coded values

## Variants & properties

| Property | Values | Default |
|---|---|---|
| Has Label | true, false | true |
| Has Error | true, false | false |
| Label | Label | Label |
| Error | Hint | Hint |
| Description | Description | Description |
| Has Description | true, false | false |
| Value | Value | Value |
| State | Default, Error, Disabled | Default |
| Value Type | Default, Placeholder | Default |

## States

**Textarea Field** (Text field)

- Pass: Default
- Pass: Error
- Pass: Disabled
- Missing: Hover — Pointer is over it (web, iPad, desktop) — a subtle fill or underline change shows it is clickable.
- Missing: Focus — Reached by keyboard or switch control — needs a clearly visible focus ring (WCAG 2.4.7).
- Missing: Filled — Has a value — shows the entered text and how the label/placeholder moves.

## Tokens

**21 tokens in use · 0 hard-coded values to map**

### Tokens in use

| Category | Token | Value | Property | Source |
|---|---|---|---|---|
| Colors | `Text/Default/Default` | #1e1e1e | fills | Variable |
| Colors | `Text/Default/Secondary` | #757575 | fills | Variable |
| Colors | `Background/Default/Default` | #ffffff | fills | Variable |
| Colors | `Border/Default/Default` | #d9d9d9 | strokes | Variable |
| Colors | `Text/Default/Tertiary` | #b3b3b3 | fills | Variable |
| Colors | `Icon/Default/Tertiary` | #b3b3b3 | strokes | Variable |
| Colors | `Border/Danger/Default` | #900b09 | strokes | Variable |
| Colors | `Text/Danger/Default` | #900b09 | fills | Variable |
| Colors | `Text/Disabled/Default` | #b3b3b3 | fills | Variable |
| Colors | `Background/Disabled/Default` | #d9d9d9 | fills | Variable |
| Colors | `Border/Disabled/default` | #b3b3b3 | strokes | Variable |
| Colors | `Icon/Disabled/On Disabled` | #b3b3b3 | fills | Variable |
| Spacing | `Space/200` | 8px | item spacing | Variable |
| Spacing | `Space/300` | 12px | padding top | Variable |
| Spacing | `Space/400` | 16px | padding right | Variable |
| Typography | `Body Base` | unresolved | text | Style |
| Typography | `Body/Font Family` | Inter | font family | Variable |
| Typography | `Body/Font Weight Regular` | 400 | font weight | Variable |
| Typography | `Body/Size Medium` | 16px | font size | Variable |
| Borders | `Stroke/Border` | 1px | border width | Variable |
| Borders | `Radius/200` | 8px | top left radius | Variable |

## Accessibility · ARIA

| Item | Element | Role | States → ARIA | Keyboard | Accessible name |
|---|---|---|---|---|---|
| Textarea Field | `<input> + <label for>` | textbox (implicit) | Disabled → disabled<br>Error → aria-invalid="true" + aria-describedby → error message id<br>Required → required / aria-required="true" | Standard text editing; Tab moves on | <label for> or aria-labelledby (placeholder is not a label) |

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Open issues

| Platform | Check | Status | Details |
|---|---|---|---|
| Web · WCAG 2.2 + Ruby DS | Text contrast ≥ 4.5:1 (3:1 large) | Fail | 4 text layers below contrast minimum: 'Value' 2.1:1, 'Value' 2.1:1, 'Value' 1.49:1, … |
| Web · WCAG 2.2 + Ruby DS | Hover, Focus and Disabled states | Fail | Missing state: Hover, Focus — a visible focus state is required (WCAG 2.4.7) |
| Web · WCAG 2.2 + Ruby DS | Ruby font (Fira Sans) | Warning | 12 text layers not using Fira Sans: 'Label' Inter, 'Value' Inter, 'Label' Inter, … |
| Web · WCAG 2.2 + Ruby DS | Icon and control sizes on Ruby size scale | Warning | 6 sizes off the Ruby size scale: 'Drag' icon 7×7, 'Drag' icon 7×7, 'Drag' icon 7×7, … |
| Web · WCAG 2.2 + Ruby DS | Real copy, not placeholders | Warning | 12 text layers use placeholder copy ('Label', 'Value'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: no API key saved

