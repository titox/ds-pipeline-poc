# Slider Field

> **Design System Readiness: 91%**

A form field that pairs a range slider with a label, a numeric output value and helper text. Four state variants cover Default, Hover, Focus and Disabled, and the label and description can each be switched off.

### Purpose

Lets a user pick a value along a continuous track, with the current value shown next to the label and guidance shown below the track.

### Behaviour

The Hover variant responds to pointer-over on the track or handle. The Focus variant adds a focus ring using Stroke/Focus Ring and Border/Focus/Default, which is what keyboard users see when the handle is tabbed to. The Disabled variant swaps the track and handle to Background/Disabled/Default and Border/Disabled/default and should block pointer and keyboard input. The filled portion of the track uses Background/Brand/Default and the remaining track uses Background/Brand/Secondary.

### Composition

No nested component instances were detected. Every part is a local frame: a Label frame holding the label text and a Slider Output frame, a Slider frame holding the Block (track and handle), and a Description text layer. If the code base already has a slider primitive, a form label or a helper text component, AI code generators should reuse those rather than rebuild them here.

### Usage

Use when the value is approximate and the range matters more than precision, for example volume, opacity or a price filter. Use a number input when an exact figure is required, and a segmented control or radio group when the choices are discrete and few. The Slider Output should stay visible when the user needs to read back the exact number.

### Code Generation Notes

Render as input type=range or a div with role=slider carrying aria-valuemin, aria-valuemax, aria-valuenow and aria-valuetext. Tie the label to the control with a for or aria-labelledby reference, and the description with aria-describedby. Support Arrow keys for single steps, Page Up and Page Down for larger jumps, and Home and End for the bounds. State variants are visual only and should be driven by :hover, :focus-visible and the disabled attribute, not by separate components. Label and Description text are editable properties, so expose them as props rather than hard-coded strings.

## Design System Adoption

| Criterion | Score | Basis |
|-----------|-------|-------|
| Reuse | 3/3 — Needed across teams or products | set manually |
| Pattern Strength | 3/3 — Clear, reusable pattern with variants | set manually |
| System Fit | 3/3 — Clearly extends and improves the system | suggested: No overlap with the 11 other local components. Library components aren't checked. |
| Value | 3/3 — Saves time, reduces duplication, or solves a clear problem | set manually |
| Evidence | 3/3 — Proven need (multiple teams or repeated implementations) | set manually |

**Total: 15/15** (13–15) — Add to the design system

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>State</td><td><code>Default</code> <code>Disabled</code> <code>Hover</code> <code>Focus</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Label</td><td><code>TEXT</code></td><td><code>Label</code></td><td>No</td><td>Text of the field label shown above the track.</td></tr>
<tr><td>Description</td><td><code>TEXT</code></td><td><code>Description</code></td><td>No</td><td>Helper text shown below the track.</td></tr>
<tr><td>Has Label</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>Shows or hides the label row, including the slider output value.</td></tr>
<tr><td>Has Description</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>Shows or hides the helper text below the track.</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>Visual state of the slider track and handle.</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Label</td><td><code>Label</code></td><td><code>Label</code></td></tr>
<tr><td>Description</td><td><code>Description</code></td><td><code>Description</code></td></tr>
<tr><td>Has Label</td><td><code>true</code> <code>false</code></td><td><code>true</code></td></tr>
<tr><td>Has Description</td><td><code>true</code> <code>false</code></td><td><code>true</code></td></tr>
<tr><td>State</td><td><code>Default</code> <code>Disabled</code> <code>Hover</code> <code>Focus</code></td><td><code>Default</code></td></tr>
</tbody>
</table>

## States

- ✅ `Default`
- ✅ `Disabled`
- ✅ `Hover`
- ✅ `Focus`

## Design Tokens

| Metric | Count |
|--------|-------|
| Total items | 17 |
| Design tokens | 17 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#1e1e1e"></span>`Text/Default/Default` → #1e1e1e — Using Text/Default/Default token
- <span class="swatch" style="background:#e6e6e6"></span>`Background/Brand/Secondary` → #e6e6e6 — Using Background/Brand/Secondary token
- <span class="swatch" style="background:#2c2c2c"></span>`Background/Brand/Default` → #2c2c2c — Using Background/Brand/Default token
- <span class="swatch" style="background:#757575"></span>`Text/Default/Secondary` → #757575 — Using Text/Default/Secondary token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Disabled/Default` → #d9d9d9 — Using Background/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Border/Disabled/default` → #b3b3b3 — Using Border/Disabled/default token
- <span class="swatch" style="background:#ec221f"></span>`Border/Focus/Default` → #ec221f — Using Border/Focus/Default token

### Spacing

**Tokens in use:**
- `Space/300` → 12px — Using Space/300 token

### Typography

**Tokens in use:**
- `Body Base` → unresolved — Using Body Base token
- `Body/Font Family` → Inter — Using Body/Font Family token
- `Body/Font Weight Regular` → 400 — Using Body/Font Weight Regular token
- `Body/Size Medium` → 16px — Using Body/Size Medium token
- `Body Small` → unresolved — Using Body Small token
- `Body/Size Small` → 14px — Using Body/Size Small token

### Borders

**Tokens in use:**
- `Radius/Full` → 9999px — Using Radius/Full token
- `Stroke/Border` → 1px — Using Stroke/Border token
- `Stroke/Focus Ring` → 2px — Using Stroke/Focus Ring token

## Accessibility · ARIA

<table>
<thead><tr><th>Item</th><th>Element</th><th>Role</th><th>States → ARIA</th><th>Keyboard</th><th>Accessible name</th></tr></thead>
<tbody>
<tr><td>Slider Field</td><td><code>&lt;button&gt; or &lt;a href&gt; (avoid &lt;div onclick&gt;)</code></td><td>button or link</td><td>Disabled → <code>disabled</code> / <code>aria-disabled</code>=&quot;true&quot;</td><td>Enter (and Space for buttons)</td><td>Visible text or <code>aria-label</code></td></tr>
</tbody>
</table>

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Accessibility

### Accessibility Audit

| Check | Status | Details |
|-------|--------|---------|
| Touch target size | ✅ Pass | Target size 120×76px meets recommended 44px minimum (smallest variant: "State=Default") |
| Focus state | ✅ Pass | Component has a focus state for keyboard navigation |
| Minimum font size | ✅ Pass | Smallest text is 14px, meets readability guidelines |
| Color contrast | ⚠️ Warning | 16 text layers not measurable: "Label" (no solid fill behind the text), "Prefix" (no solid fill behind the text), "Value" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 12/14 (86%)

| Rule | Status | Details |
|------|--------|---------|
| Text contrast ≥ 4.5:1 (3:1 large) | ⚠️ Warning | 16 text layers with unmeasurable contrast: 'Label' (no solid fill behind the text), 'Prefix' (no solid fill behind the text), 'Value' (no solid fill behind the text), … — not measurable, check manually |
| Ruby font (Fira Sans) | ⚠️ Warning | 16 text layers not using Fira Sans: 'Label' Inter, 'Prefix' Inter, 'Value' Inter, … |
| Icon and control sizes on Ruby size scale | ⚠️ Warning | 4 sizes off the Ruby size scale: 'Block' height 8, 'Block' height 8, 'Block' height 8, … |
| Real copy, not placeholders | ⚠️ Warning | 4 text layers use placeholder copy ('Label'). Use real words such as "Save profile" so examples read like the product |

### AI opinion (not scored)

- **Works at narrow widths** (warning): Confirm the label and value row wraps rather than squeezing the track at 320px wide.
- **Not colour alone** (warning): Disabled is signalled by greyed fill alone, so add a non-colour cue such as the disabled attribute and a dimmed handle outline.
- **Clear headings and structure** (pass): Keep the order label, value, track, description so the reading order matches the visual one.
- **Links vs buttons** (pass): No links or buttons are present, so there is nothing to confuse with navigation.

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ⚠️ Warning | Add a component description to help MCP and AI understand the component purpose and usage |

## AI Interpretation (Readiness score: 91%)

**What AI Reads Well:**
- Has 5 configurable properties
- Uses design tokens for consistency

**Where AI Gets Confused:**
- Missing component description - AI cannot understand component purpose and intent

**How to Improve AI Understanding:**
- Add a descriptive explanation in component properties to help AI understand the component's purpose, behavior, and usage patterns

---

*Generated by RubyLint — 11/24/2026*
