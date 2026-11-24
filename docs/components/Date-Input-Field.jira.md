# Date Input Field — Handoff

Open in Figma: https://www.figma.com/design/huu1as0pMzvGdqqDpQ5JyE/?node-id=4302-7505

**Design system readiness:** 92%

## Summary

Keywords: dropdown

## Acceptance criteria

- [ ] Variants: State (Default, Error, Disabled) × Value Type (Default, Placeholder)
- [ ] Properties: Has Label, Has Error, Label, Error, Description, Has Description, Day, Month, Year, State, Value Type with the defaults below
- [ ] Date Input Field: states Default, Error, Disabled, Hover, Focus, Filled (design missing: Hover, Focus, Filled)
- [ ] Date Input Field uses `<input> + <label for>`; keyboard Standard text editing; Tab moves on
- [ ] Visible focus ring on every interactive element (WCAG 2.4.7)
- [ ] Lowest contrast 1.5:1, WCAG 2.2 AA needs 4.5:1
- [ ] Uses design tokens only, no hard-coded values

## Variants & properties

| Property | Values | Default |
|---|---|---|
| Has Label | true, false | true |
| Has Error | true, false | true |
| Label | Label | Label |
| Error | Error | Error |
| Description | Description | Description |
| Has Description | true, false | false |
| Day | DD | DD |
| Month | MM | MM |
| Year | YYYY | YYYY |
| State | Default, Error, Disabled | Default |
| Value Type | Default, Placeholder | Default |

## States

**Date Input Field** (Text field)

- Pass: Default
- Pass: Error
- Pass: Disabled
- Missing: Hover — Pointer is over it (web, iPad, desktop) — a subtle fill or underline change shows it is clickable.
- Missing: Focus — Reached by keyboard or switch control — needs a clearly visible focus ring (WCAG 2.4.7).
- Missing: Filled — Has a value — shows the entered text and how the label/placeholder moves.

## Tokens

**20 tokens in use · 0 hard-coded values to map**

### Tokens in use

| Category | Token | Value | Property | Source |
|---|---|---|---|---|
| Colors | `Text/Default/Default` | #1e1e1e | fills | Variable |
| Colors | `Text/Default/Secondary` | #757575 | fills | Variable |
| Colors | `Background/Default/Default` | #ffffff | fills | Variable |
| Colors | `Border/Default/Default` | #d9d9d9 | strokes | Variable |
| Colors | `Text/Default/Tertiary` | #b3b3b3 | fills | Variable |
| Colors | `Border/Danger/Default` | #900b09 | strokes | Variable |
| Colors | `Text/Danger/Default` | #900b09 | fills | Variable |
| Colors | `Text/Disabled/Default` | #b3b3b3 | fills | Variable |
| Colors | `Background/Disabled/Default` | #d9d9d9 | fills | Variable |
| Colors | `Border/Disabled/default` | #b3b3b3 | strokes | Variable |
| Spacing | `Space/200` | 8px | item spacing | Variable |
| Spacing | `Space/300` | 12px | padding top | Variable |
| Spacing | `Space/400` | 16px | padding right | Variable |
| Typography | `Body Base` | unresolved | text | Style |
| Typography | `Body/Font Family` | Inter | font family | Variable |
| Typography | `Body/Font Weight Regular` | 400 | font weight | Variable |
| Typography | `Body/Size Medium` | 16px | font size | Variable |
| Typography | `Single Line/Body Base` | unresolved | text | Style |
| Borders | `Stroke/Border` | 1px | border width | Variable |
| Borders | `Radius/200` | 8px | top left radius | Variable |

## Accessibility · ARIA

| Item | Element | Role | States → ARIA | Keyboard | Accessible name |
|---|---|---|---|---|---|
| Date Input Field | `<input> + <label for>` | textbox (implicit) | Disabled → disabled<br>Error → aria-invalid="true" + aria-describedby → error message id<br>Required → required / aria-required="true" | Standard text editing; Tab moves on | <label for> or aria-labelledby (placeholder is not a label) |

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Open issues

| Platform | Check | Status | Details |
|---|---|---|---|
| Web · WCAG 2.2 + Ruby DS | Text contrast ≥ 4.5:1 (3:1 large) | Fail | 12 text layers below contrast minimum: 'DD' 2.1:1, 'MM' 2.1:1, 'YYYY' 2.1:1, … |
| Web · WCAG 2.2 + Ruby DS | Hover, Focus and Disabled states | Fail | Missing state: Hover, Focus — a visible focus state is required (WCAG 2.4.7) |
| Web · WCAG 2.2 + Ruby DS | Ruby font (Fira Sans) | Warning | 26 text layers not using Fira Sans: 'Label' Inter, 'DD' Inter, 'MM' Inter, … |
| Web · WCAG 2.2 + Ruby DS | Labels in sentence case | Warning | 6 labels not in sentence case: 'YYYY' "YYYY", 'YYYY' "YYYY", 'YYYY' "YYYY", … |
| Web · WCAG 2.2 + Ruby DS | Real copy, not placeholders | Warning | 6 text layers use placeholder copy ('Label'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: no API key saved

