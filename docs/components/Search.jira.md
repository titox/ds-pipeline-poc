# Search — Handoff

Open in Figma: https://www.figma.com/design/huu1as0pMzvGdqqDpQ5JyE/?node-id=2236-14989

**Design system readiness:** 78%

## Summary

_No description set on this component in Figma._

## Acceptance criteria

- [ ] Variants: State (Default, Disabled) × Value Type (Filled, Placeholder)
- [ ] Properties: Value, State, Value Type with the defaults below
- [ ] Search: states Default, Disabled, Hover, Focus, Pressed (design missing: Hover, Focus, Pressed)
- [ ] Search uses `<button> or <a href> (avoid <div onclick>)`; keyboard Enter (and Space for buttons)
- [ ] Visible focus ring on every interactive element (WCAG 2.4.7)
- [ ] Lowest contrast 1.5:1, WCAG 2.2 AA needs 4.5:1
- [ ] Uses design tokens only, no hard-coded values

## Variants & properties

| Property | Values | Default |
|---|---|---|
| Value | Value | Value |
| State | Default, Disabled | Default |
| Value Type | Filled, Placeholder | Placeholder |

## States

**Search** (Interactive element)

- Pass: Default
- Pass: Disabled
- Missing: Hover — Pointer is over it (web, iPad, desktop) — a subtle fill or underline change shows it is clickable.
- Missing: Focus — Reached by keyboard or switch control — needs a clearly visible focus ring (WCAG 2.4.7).
- Missing: Pressed — While tapped or clicked — immediate feedback that the press registered (HIG Pressed, M3 Pressed).

## Tokens

**18 tokens in use · 0 hard-coded values to map**

### Tokens in use

| Category | Token | Value | Property | Source |
|---|---|---|---|---|
| Colors | `Background/Default/Default` | #ffffff | fills | Variable |
| Colors | `Border/Default/Default` | #d9d9d9 | strokes | Variable |
| Colors | `Text/Default/Default` | #1e1e1e | fills | Variable |
| Colors | `Icon/Default/Default` | #1e1e1e | strokes | Variable |
| Colors | `Background/Disabled/Default` | #d9d9d9 | fills | Variable |
| Colors | `border/disabled/secondary` | #b2b2b2 | strokes | Variable |
| Colors | `Text/Disabled/On Disabled` | #b3b3b3 | fills | Variable |
| Colors | `Icon/Disabled/On Disabled` | #b3b3b3 | strokes | Variable |
| Colors | `Text/Default/Tertiary` | #b3b3b3 | fills | Variable |
| Spacing | `Space/300` | 12px | padding top | Variable |
| Spacing | `Space/400` | 16px | padding right | Variable |
| Spacing | `Space/200` | 8px | item spacing | Variable |
| Typography | `Single Line/Body Base` | unresolved | text | Style |
| Typography | `Body/Font Family` | Inter | font family | Variable |
| Typography | `Body/Font Weight Regular` | 400 | font weight | Variable |
| Typography | `Body/Size Medium` | 16px | font size | Variable |
| Borders | `Stroke/Border` | 1px | border width | Variable |
| Borders | `Radius/Full` | 9999px | top left radius | Variable |

## Accessibility · ARIA

| Item | Element | Role | States → ARIA | Keyboard | Accessible name |
|---|---|---|---|---|---|
| Search | `<button> or <a href> (avoid <div onclick>)` | button or link | Disabled → disabled / aria-disabled="true" | Enter (and Space for buttons) | Visible text or aria-label |

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Open issues

| Platform | Check | Status | Details |
|---|---|---|---|
| Web · WCAG 2.2 + Ruby DS | Text contrast ≥ 4.5:1 (3:1 large) | Fail | 3 text layers below contrast minimum: 'Value' 1.49:1, 'Value' 2.1:1, 'Value' 1.49:1 |
| Web · WCAG 2.2 + Ruby DS | Hover, Focus and Disabled states | Fail | Missing state: Hover, Focus — a visible focus state is required (WCAG 2.4.7) |
| Web · WCAG 2.2 + Ruby DS | Target size ≥ 24×24px (44 preferred) | Warning | Target 120×40px meets WCAG AA (24px) but not 44px (AAA) |
| Web · WCAG 2.2 + Ruby DS | Ruby font (Fira Sans) | Warning | 4 text layers not using Fira Sans: 'Value' Inter, 'Value' Inter, 'Value' Inter, … |
| Web · WCAG 2.2 + Ruby DS | Real copy, not placeholders | Warning | 4 text layers use placeholder copy ('Value'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: no API key saved

