# Slider Field

> **Design System Readiness: 86%**

_No description set on this component in Figma._

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>State</td><td><code>Default</code> <code>Disabled</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Label</td><td><code>TEXT</code></td><td><code>Label</code></td><td>No</td><td>-</td></tr>
<tr><td>Description</td><td><code>TEXT</code></td><td><code>Description</code></td><td>No</td><td>-</td></tr>
<tr><td>Has Label</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>-</td></tr>
<tr><td>Has Description</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>-</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>-</td></tr>
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
<tr><td>State</td><td><code>Default</code> <code>Disabled</code></td><td><code>Default</code></td></tr>
</tbody>
</table>

## States

- ✅ `Default`
- ✅ `Disabled`

## Design Tokens

| Metric | Count |
|--------|-------|
| Total items | 15 |
| Design tokens | 15 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#1e1e1e"></span>`Text/Default/Default` → #1e1e1e — Using Text/Default/Default token
- <span class="swatch" style="background:#e6e6e6"></span>`Background/Brand/Secondary` → #e6e6e6 — Using Background/Brand/Secondary token
- <span class="swatch" style="background:#2c2c2c"></span>`Background/Brand/Default` → #2c2c2c — Using Background/Brand/Default token
- <span class="swatch" style="background:#757575"></span>`Text/Default/Secondary` → #757575 — Using Text/Default/Secondary token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Disabled/Default` → #d9d9d9 — Using Background/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Border/Disabled/default` → #b3b3b3 — Using Border/Disabled/default token

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
| Focus state | ⚠️ Warning | Add a visible focus state to support keyboard navigation (WCAG 2.4.7) |
| Minimum font size | ✅ Pass | Smallest text is 14px, meets readability guidelines |
| Color contrast | ⚠️ Warning | 8 text layers not measurable: "Label" (no solid fill behind the text), "Prefix" (no solid fill behind the text), "Value" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 11/14 (79%)

| Rule | Status | Details |
|------|--------|---------|
| Hover, Focus and Disabled states | ❌ Fail | Missing state: Hover, Focus — a visible focus state is required (WCAG 2.4.7) |
| Text contrast ≥ 4.5:1 (3:1 large) | ⚠️ Warning | 8 text layers with unmeasurable contrast: 'Label' (no solid fill behind the text), 'Prefix' (no solid fill behind the text), 'Value' (no solid fill behind the text), … — not measurable, check manually |
| Ruby font (Fira Sans) | ⚠️ Warning | 8 text layers not using Fira Sans: 'Label' Inter, 'Prefix' Inter, 'Value' Inter, … |
| Icon and control sizes on Ruby size scale | ⚠️ Warning | 2 sizes off the Ruby size scale: 'Block' height 8, 'Block' height 8 |
| Real copy, not placeholders | ⚠️ Warning | 2 text layers use placeholder copy ('Label'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: no API key saved

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ⚠️ Warning | Add a component description to help MCP and AI understand the component purpose and usage |

## AI Interpretation (Readiness score: 86%)

**What AI Reads Well:**
- Has 5 configurable properties
- Uses design tokens for consistency

**Where AI Gets Confused:**
- Missing component description - AI cannot understand component purpose and intent

**How to Improve AI Understanding:**
- Add a descriptive explanation in component properties to help AI understand the component's purpose, behavior, and usage patterns

---

*Generated by RubyLint — 11/24/2026*
