# Slider Field — Handoff

Open in Figma: https://www.figma.com/design/huu1as0pMzvGdqqDpQ5JyE/?node-id=589-17676

**Design system readiness:** 86%

## Summary

_No description set on this component in Figma._

## Acceptance criteria

- [ ] Variants: State (Default, Disabled)
- [ ] Properties: Label, Description, Has Label, Has Description, State with the defaults below
- [ ] Slider Field: states Default, Disabled, Hover, Focus, Pressed (design missing: Hover, Focus, Pressed)
- [ ] Slider Field uses `<button> or <a href> (avoid <div onclick>)`; keyboard Enter (and Space for buttons)
- [ ] Visible focus ring on every interactive element (WCAG 2.4.7)
- [ ] Uses design tokens only, no hard-coded values

## Variants & properties

| Property | Values | Default |
|---|---|---|
| Label | Label | Label |
| Description | Description | Description |
| Has Label | true, false | true |
| Has Description | true, false | true |
| State | Default, Disabled | Default |

## States

**Slider Field** (Interactive element)

- Pass: Default
- Pass: Disabled
- Missing: Hover — Pointer is over it (web, iPad, desktop) — a subtle fill or underline change shows it is clickable.
- Missing: Focus — Reached by keyboard or switch control — needs a clearly visible focus ring (WCAG 2.4.7).
- Missing: Pressed — While tapped or clicked — immediate feedback that the press registered (HIG Pressed, M3 Pressed).

## Tokens

**15 tokens in use · 0 hard-coded values to map**

### Tokens in use

| Category | Token | Value | Property | Source |
|---|---|---|---|---|
| Colors | `Text/Default/Default` | #1e1e1e | fills | Variable |
| Colors | `Background/Brand/Secondary` | #e6e6e6 | fills | Variable |
| Colors | `Background/Brand/Default` | #2c2c2c | fills | Variable |
| Colors | `Text/Default/Secondary` | #757575 | fills | Variable |
| Colors | `Background/Disabled/Default` | #d9d9d9 | fills | Variable |
| Colors | `Border/Disabled/default` | #b3b3b3 | strokes | Variable |
| Spacing | `Space/300` | 12px | item spacing | Variable |
| Typography | `Body Base` | unresolved | text | Style |
| Typography | `Body/Font Family` | Inter | font family | Variable |
| Typography | `Body/Font Weight Regular` | 400 | font weight | Variable |
| Typography | `Body/Size Medium` | 16px | font size | Variable |
| Typography | `Body Small` | unresolved | text | Style |
| Typography | `Body/Size Small` | 14px | font size | Variable |
| Borders | `Radius/Full` | 9999px | top left radius | Variable |
| Borders | `Stroke/Border` | 1px | border width | Variable |

## Accessibility · ARIA

| Item | Element | Role | States → ARIA | Keyboard | Accessible name |
|---|---|---|---|---|---|
| Slider Field | `<button> or <a href> (avoid <div onclick>)` | button or link | Disabled → disabled / aria-disabled="true" | Enter (and Space for buttons) | Visible text or aria-label |

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Open issues

| Platform | Check | Status | Details |
|---|---|---|---|
| Web · WCAG 2.2 + Ruby DS | Hover, Focus and Disabled states | Fail | Missing state: Hover, Focus — a visible focus state is required (WCAG 2.4.7) |
| Web · WCAG 2.2 + Ruby DS | Text contrast ≥ 4.5:1 (3:1 large) | Warning | 8 text layers with unmeasurable contrast: 'Label' (no solid fill behind the text), 'Prefix' (no solid fill behind the text), 'Value' (no solid fill behind the text), … — not measurable, check manually |
| Web · WCAG 2.2 + Ruby DS | Ruby font (Fira Sans) | Warning | 8 text layers not using Fira Sans: 'Label' Inter, 'Prefix' Inter, 'Value' Inter, … |
| Web · WCAG 2.2 + Ruby DS | Icon and control sizes on Ruby size scale | Warning | 2 sizes off the Ruby size scale: 'Block' height 8, 'Block' height 8 |
| Web · WCAG 2.2 + Ruby DS | Real copy, not placeholders | Warning | 2 text layers use placeholder copy ('Label'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: no API key saved

