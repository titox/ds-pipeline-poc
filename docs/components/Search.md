# Search

> **Design System Readiness: 78%**

_No description set on this component in Figma._

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>State</td><td><code>Default</code> <code>Disabled</code></td></tr>
<tr><td>Value Type</td><td><code>Filled</code> <code>Placeholder</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Value</td><td><code>TEXT</code></td><td><code>Value</code></td><td>No</td><td>-</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>-</td></tr>
<tr><td>Value Type</td><td><code>VARIANT</code></td><td><code>Placeholder</code></td><td>No</td><td>-</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Value</td><td><code>Value</code></td><td><code>Value</code></td></tr>
<tr><td>State</td><td><code>Default</code> <code>Disabled</code></td><td><code>Default</code></td></tr>
<tr><td>Value Type</td><td><code>Filled</code> <code>Placeholder</code></td><td><code>Placeholder</code></td></tr>
</tbody>
</table>

## States

- ✅ `Default`
- ✅ `Disabled`

## Design Tokens

| Metric | Count |
|--------|-------|
| Total items | 18 |
| Design tokens | 18 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#ffffff"></span>`Background/Default/Default` → #ffffff — Using Background/Default/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Border/Default/Default` → #d9d9d9 — Using Border/Default/Default token
- <span class="swatch" style="background:#1e1e1e"></span>`Text/Default/Default` → #1e1e1e — Using Text/Default/Default token
- <span class="swatch" style="background:#1e1e1e"></span>`Icon/Default/Default` → #1e1e1e — Using Icon/Default/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Disabled/Default` → #d9d9d9 — Using Background/Disabled/Default token
- <span class="swatch" style="background:#b2b2b2"></span>`border/disabled/secondary` → #b2b2b2 — Using border/disabled/secondary token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Disabled/On Disabled` → #b3b3b3 — Using Text/Disabled/On Disabled token
- <span class="swatch" style="background:#b3b3b3"></span>`Icon/Disabled/On Disabled` → #b3b3b3 — Using Icon/Disabled/On Disabled token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Default/Tertiary` → #b3b3b3 — Using Text/Default/Tertiary token

### Spacing

**Tokens in use:**
- `Space/300` → 12px — Using Space/300 token
- `Space/400` → 16px — Using Space/400 token
- `Space/200` → 8px — Using Space/200 token

### Typography

**Tokens in use:**
- `Single Line/Body Base` → unresolved — Using Single Line/Body Base token
- `Body/Font Family` → Inter — Using Body/Font Family token
- `Body/Font Weight Regular` → 400 — Using Body/Font Weight Regular token
- `Body/Size Medium` → 16px — Using Body/Size Medium token

### Borders

**Tokens in use:**
- `Stroke/Border` → 1px — Using Stroke/Border token
- `Radius/Full` → 9999px — Using Radius/Full token

## Accessibility · ARIA

<table>
<thead><tr><th>Item</th><th>Element</th><th>Role</th><th>States → ARIA</th><th>Keyboard</th><th>Accessible name</th></tr></thead>
<tbody>
<tr><td>Search</td><td><code>&lt;button&gt; or &lt;a href&gt; (avoid &lt;div onclick&gt;)</code></td><td>button or link</td><td>Disabled → <code>disabled</code> / <code>aria-disabled</code>=&quot;true&quot;</td><td>Enter (and Space for buttons)</td><td>Visible text or <code>aria-label</code></td></tr>
</tbody>
</table>

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Accessibility

### Accessibility Audit

| Check | Status | Details |
|-------|--------|---------|
| Touch target size | ⚠️ Warning | Target size 120×40px meets WCAG minimum (24px) but is below recommended 44px (smallest variant: "State=Default, Value Type=Filled") |
| Focus state | ⚠️ Warning | Add a visible focus state to support keyboard navigation (WCAG 2.4.7) |
| Minimum font size | ✅ Pass | Smallest text is 16px, meets readability guidelines |
| Color contrast | ❌ Fail | "Value" has 1.5:1 contrast, below WCAG AA minimum of 3:1 |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 10.5/14 (75%)

| Rule | Status | Details |
|------|--------|---------|
| Text contrast ≥ 4.5:1 (3:1 large) | ❌ Fail | 3 text layers below contrast minimum: 'Value' 1.49:1, 'Value' 2.1:1, 'Value' 1.49:1 |
| Hover, Focus and Disabled states | ❌ Fail | Missing state: Hover, Focus — a visible focus state is required (WCAG 2.4.7) |
| Target size ≥ 24×24px (44 preferred) | ⚠️ Warning | Target 120×40px meets WCAG AA (24px) but not 44px (AAA) |
| Ruby font (Fira Sans) | ⚠️ Warning | 4 text layers not using Fira Sans: 'Value' Inter, 'Value' Inter, 'Value' Inter, … |
| Real copy, not placeholders | ⚠️ Warning | 4 text layers use placeholder copy ('Value'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: no API key saved

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ⚠️ Warning | Add a component description to help MCP and AI understand the component purpose and usage |

## Layer Naming Issues

| Layer | Current Name | Suggested | Severity | Reason |
|-------|-------------|-----------|----------|--------|
| container | `X` | `container` | 🔴 error | Generic layer name detected |
| container | `X` | `container` | 🔴 error | Generic layer name detected |

## AI Interpretation (Readiness score: 78%)

**What AI Reads Well:**
- Has 3 configurable properties
- Uses design tokens for consistency

**Where AI Gets Confused:**
- Missing component description - AI cannot understand component purpose and intent

**How to Improve AI Understanding:**
- Add a descriptive explanation in component properties to help AI understand the component's purpose, behavior, and usage patterns

---

*Generated by RubyLint — 11/24/2026*
