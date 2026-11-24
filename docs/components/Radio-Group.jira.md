# Radio Group — Handoff

Open in Figma: https://www.figma.com/design/huu1as0pMzvGdqqDpQ5JyE/?node-id=624-23642

**Design system readiness:** 86%

## Summary

_No description set on this component in Figma._

## Acceptance criteria

- [ ] Radio Group: states Hover, Focus, Pressed, Disabled, Selected (design missing: Hover, Focus, Pressed, Disabled, Selected)
- [ ] Radio Field: states Default, Disabled, Hover, Focus, Pressed, Selected (design missing: Hover, Focus, Pressed, Selected)
- [ ] Radio Group uses `<input type="checkbox|radio">`; keyboard Space toggles; radios move with arrow keys
- [ ] Radio Field uses `<input type="checkbox|radio">`; keyboard Space toggles; radios move with arrow keys
- [ ] Visible focus ring on every interactive element (WCAG 2.4.7)
- [ ] Lowest contrast 4.6:1, WCAG 2.2 AA needs 4.5:1
- [ ] Uses design tokens only, no hard-coded values

## States

**Radio Group** (Checkbox / radio / switch)

- Missing: Hover — Pointer is over it (web, iPad, desktop) — a subtle fill or underline change shows it is clickable.
- Missing: Focus — Reached by keyboard or switch control — needs a clearly visible focus ring (WCAG 2.4.7).
- Missing: Pressed — While tapped or clicked — immediate feedback that the press registered (HIG Pressed, M3 Pressed).
- Missing: Disabled — Not available right now — dimmed (e.g. 40% opacity) and not focusable; explain why nearby if possible.
- Missing: Selected — On / checked / current — must differ from unselected by more than colour (WCAG 1.4.1).

**Radio Field** (Checkbox / radio / switch)

- Pass: Default
- Pass: Disabled
- Missing: Hover — Pointer is over it (web, iPad, desktop) — a subtle fill or underline change shows it is clickable.
- Missing: Focus — Reached by keyboard or switch control — needs a clearly visible focus ring (WCAG 2.4.7).
- Missing: Pressed — While tapped or clicked — immediate feedback that the press registered (HIG Pressed, M3 Pressed).
- Missing: Selected — On / checked / current — must differ from unselected by more than colour (WCAG 1.4.1).

## Tokens

**15 tokens in use · 0 hard-coded values to map**

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
| Radio Group | `<input type="checkbox\|radio">` | checkbox, radio, or switch (role="switch") | Selected → checked / aria-checked="true\|false\|mixed"<br>Disabled → disabled | Space toggles; radios move with arrow keys | <label for> wrapping or pointing at the input |
| Radio Field | `<input type="checkbox\|radio">` | checkbox, radio, or switch (role="switch") | Selected → checked / aria-checked="true\|false\|mixed"<br>Disabled → disabled | Space toggles; radios move with arrow keys | <label for> wrapping or pointing at the input |

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Open issues

| Platform | Check | Status | Details |
|---|---|---|---|
| Web · WCAG 2.2 + Ruby DS | Hover, Focus and Disabled states | Fail | Missing state: Hover, Focus, Disabled — a visible focus state is required (WCAG 2.4.7) |
| Web · WCAG 2.2 + Ruby DS | Ruby font (Fira Sans) | Warning | 6 text layers not using Fira Sans: 'Label' Inter, 'Description' Inter, 'Label' Inter, … |
| Web · WCAG 2.2 + Ruby DS | Real copy, not placeholders | Warning | 3 text layers use placeholder copy ('Label'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: no API key saved

