# Radio Field — Handoff

Open in Figma: https://www.figma.com/design/huu1as0pMzvGdqqDpQ5JyE/?node-id=9762-1412

**Design system readiness:** 92%

## Summary

Checked / Unchecked is a property within the design file only. Coded Radio Fields are grouped and the value of the field indicates its state.

## Acceptance criteria

- [ ] Variants: State (Default, Disabled) × Value Type (Unchecked, Checked)
- [ ] Properties: Has Description, Description, Label, State, Value Type with the defaults below
- [ ] Radio Field: states Default, Disabled, Hover, Focus, Pressed, Selected (design missing: Hover, Focus, Pressed, Selected)
- [ ] Radio Field uses `<input type="checkbox|radio">`; keyboard Space toggles; radios move with arrow keys
- [ ] Visible focus ring on every interactive element (WCAG 2.4.7)
- [ ] Uses design tokens only, no hard-coded values

## Variants & properties

| Property | Values | Default |
|---|---|---|
| Has Description | true, false | true |
| Description | Description | Description |
| Label | Label | Label |
| State | Default, Disabled | Default |
| Value Type | Unchecked, Checked | Checked |

## States

**Radio Field** (Checkbox / radio / switch)

- Pass: Default
- Pass: Disabled
- Missing: Hover — Pointer is over it (web, iPad, desktop) — a subtle fill or underline change shows it is clickable.
- Missing: Focus — Reached by keyboard or switch control — needs a clearly visible focus ring (WCAG 2.4.7).
- Missing: Pressed — While tapped or clicked — immediate feedback that the press registered (HIG Pressed, M3 Pressed).
- Missing: Selected — On / checked / current — must differ from unselected by more than colour (WCAG 1.4.1).

## Tokens

**19 tokens in use · 0 hard-coded values to map**

### Tokens in use

| Category | Token | Value | Property | Source |
|---|---|---|---|---|
| Colors | `Background/Brand/Secondary` | #e6e6e6 | fills | Variable |
| Colors | `Border/Brand/Default` | #2c2c2c | strokes | Variable |
| Colors | `Icon/Brand/On Brand Secondary` | #1e1e1e | fills | Variable |
| Colors | `Text/Default/Default` | #1e1e1e | fills | Variable |
| Colors | `Text/Default/Secondary` | #757575 | fills | Variable |
| Colors | `Background/Default/Default` | #ffffff | fills | Variable |
| Colors | `Border/Brand/Tertiary` | #757575 | strokes | Variable |
| Colors | `Icon/Brand/On Brand` | #f5f5f5 | fills | Variable |
| Colors | `Background/Disabled/Default` | #d9d9d9 | fills | Variable |
| Colors | `Border/Disabled/default` | #b3b3b3 | strokes | Variable |
| Colors | `Icon/Disabled/Default` | #b3b3b3 | fills | Variable |
| Colors | `Text/Disabled/Default` | #b3b3b3 | fills | Variable |
| Spacing | `Space/300` | 12px | item spacing | Variable |
| Typography | `Body Base` | unresolved | text | Style |
| Typography | `Body/Font Family` | Inter | font family | Variable |
| Typography | `Body/Font Weight Regular` | 400 | font weight | Variable |
| Typography | `Body/Size Medium` | 16px | font size | Variable |
| Borders | `Stroke/Border` | 1px | border width | Variable |
| Borders | `Radius/Full` | 9999px | top left radius | Variable |

## Accessibility · ARIA

| Item | Element | Role | States → ARIA | Keyboard | Accessible name |
|---|---|---|---|---|---|
| Radio Field | `<input type="checkbox\|radio">` | checkbox, radio, or switch (role="switch") | Selected → checked / aria-checked="true\|false\|mixed"<br>Disabled → disabled | Space toggles; radios move with arrow keys | <label for> wrapping or pointing at the input |

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Open issues

| Platform | Check | Status | Details |
|---|---|---|---|
| Web · WCAG 2.2 + Ruby DS | Hover, Focus and Disabled states | Fail | Missing state: Hover, Focus — a visible focus state is required (WCAG 2.4.7) |
| Web · WCAG 2.2 + Ruby DS | Text contrast ≥ 4.5:1 (3:1 large) | Warning | 8 text layers with unmeasurable contrast: 'Label' (no solid fill behind the text), 'Description' (no solid fill behind the text), 'Label' (no solid fill behind the text), … — not measurable, check manually |
| Web · WCAG 2.2 + Ruby DS | Ruby font (Fira Sans) | Warning | 8 text layers not using Fira Sans: 'Label' Inter, 'Description' Inter, 'Label' Inter, … |
| Web · WCAG 2.2 + Ruby DS | Real copy, not placeholders | Warning | 4 text layers use placeholder copy ('Label'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: no API key saved

