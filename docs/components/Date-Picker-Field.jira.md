# Date Picker Field — Handoff

Open in Figma: https://www.figma.com/design/huu1as0pMzvGdqqDpQ5JyE/?node-id=4300-6892

**Design system readiness:** 86%

## Summary

To be paired with the Calendar component.

## Acceptance criteria

- [ ] Variants: State (Default, Error, Disabled) × Value Type (Default, Placeholder)
- [ ] Properties: Has Label, Has Error, Label, Error, Description, Has Description, Value, State, Value Type with the defaults below
- [ ] Date Picker Field: states Default, Error, Disabled, Hover, Focus, Open (design missing: Hover, Focus, Open)
- [ ] Date Picker Field uses `<select> (or role="combobox" + listbox)`; keyboard Arrow keys move, Enter selects, Esc closes
- [ ] Visible focus ring on every interactive element (WCAG 2.4.7)
- [ ] Lowest contrast 1.5:1, WCAG 2.2 AA needs 4.5:1
- [ ] No hard-coded values: map 1 value to tokens (see Tokens)

## Variants & properties

| Property | Values | Default |
|---|---|---|
| Has Label | true, false | true |
| Has Error | true, false | true |
| Label | Label | Label |
| Error | Error | Error |
| Description | Description | Description |
| Has Description | true, false | false |
| Value | Value | Value |
| State | Default, Error, Disabled | Default |
| Value Type | Default, Placeholder | Default |

## States

**Date Picker Field** (Dropdown)

- Pass: Default
- Pass: Error
- Pass: Disabled
- Missing: Hover — Pointer is over it (web, iPad, desktop) — a subtle fill or underline change shows it is clickable.
- Missing: Focus — Reached by keyboard or switch control — needs a clearly visible focus ring (WCAG 2.4.7).
- Missing: Open — Menu or list expanded — shows the options panel and the open indicator.

## Tokens

**21 tokens in use · 1 hard-coded value to map**

### Tokens in use

| Category | Token | Value | Property | Source |
|---|---|---|---|---|
| Colors | `Text/Default/Default` | #1e1e1e | fills | Variable |
| Colors | `Text/Default/Secondary` | #757575 | fills | Variable |
| Colors | `Background/Default/Default` | #ffffff | fills | Variable |
| Colors | `Border/Default/Default` | #d9d9d9 | strokes | Variable |
| Colors | `Icon/Default/Default` | #1e1e1e | strokes | Variable |
| Colors | `Text/Default/Tertiary` | #b3b3b3 | fills | Variable |
| Colors | `Border/Danger/Default` | #900b09 | strokes | Variable |
| Colors | `Text/Danger/Default` | #900b09 | fills | Variable |
| Colors | `Text/Disabled/Default` | #b3b3b3 | fills | Variable |
| Colors | `Background/Disabled/Default` | #d9d9d9 | fills | Variable |
| Colors | `Icon/Disabled/On Disabled` | #b3b3b3 | strokes | Variable |
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

### Hard-coded values to map

| Category | Value | Uses | Property | Suggested token |
|---|---|---|---|---|
| Colors | #b2b2b2 | 2 | strokes | - |

## Accessibility · ARIA

| Item | Element | Role | States → ARIA | Keyboard | Accessible name |
|---|---|---|---|---|---|
| Date Picker Field | `<select> (or role="combobox" + listbox)` | combobox | Open → aria-expanded="true" + aria-controls → listbox id<br>Disabled → disabled<br>Error → aria-invalid="true" + aria-describedby | Arrow keys move, Enter selects, Esc closes | <label for> or aria-labelledby |

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Open issues

| Platform | Check | Status | Details |
|---|---|---|---|
| Web · WCAG 2.2 + Ruby DS | Text contrast ≥ 4.5:1 (3:1 large) | Fail | 4 text layers below contrast minimum: 'Value' 2.1:1, 'Value' 2.1:1, 'Value' 1.49:1, … |
| Web · WCAG 2.2 + Ruby DS | Hover, Focus and Disabled states | Fail | Missing state: Hover, Focus — a visible focus state is required (WCAG 2.4.7) |
| Web · WCAG 2.2 + Ruby DS | Ruby font (Fira Sans) | Warning | 14 text layers not using Fira Sans: 'Label' Inter, 'Value' Inter, 'Label' Inter, … |
| Web · WCAG 2.2 + Ruby DS | Colours use Ruby tokens | Warning | 2 hard-coded colours: 'Input' fill/stroke, 'Input' fill/stroke |
| Web · WCAG 2.2 + Ruby DS | Real copy, not placeholders | Warning | 12 text layers use placeholder copy ('Label', 'Value'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: no API key saved

