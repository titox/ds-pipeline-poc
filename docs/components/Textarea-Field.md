# Textarea Field

> **Design System Readiness: 89%**

_No description set on this component in Figma._

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>State</td><td><code>Default</code> <code>Error</code> <code>Disabled</code></td></tr>
<tr><td>Value Type</td><td><code>Default</code> <code>Placeholder</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Has Label</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>-</td></tr>
<tr><td>Has Error</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>-</td></tr>
<tr><td>Label</td><td><code>TEXT</code></td><td><code>Label</code></td><td>No</td><td>-</td></tr>
<tr><td>Error</td><td><code>TEXT</code></td><td><code>Hint</code></td><td>No</td><td>-</td></tr>
<tr><td>Description</td><td><code>TEXT</code></td><td><code>Description</code></td><td>No</td><td>-</td></tr>
<tr><td>Has Description</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>-</td></tr>
<tr><td>Value</td><td><code>TEXT</code></td><td><code>Value</code></td><td>No</td><td>-</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>-</td></tr>
<tr><td>Value Type</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>-</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Has Label</td><td><code>true</code> <code>false</code></td><td><code>true</code></td></tr>
<tr><td>Has Error</td><td><code>true</code> <code>false</code></td><td><code>false</code></td></tr>
<tr><td>Label</td><td><code>Label</code></td><td><code>Label</code></td></tr>
<tr><td>Error</td><td><code>Hint</code></td><td><code>Hint</code></td></tr>
<tr><td>Description</td><td><code>Description</code></td><td><code>Description</code></td></tr>
<tr><td>Has Description</td><td><code>true</code> <code>false</code></td><td><code>false</code></td></tr>
<tr><td>Value</td><td><code>Value</code></td><td><code>Value</code></td></tr>
<tr><td>State</td><td><code>Default</code> <code>Error</code> <code>Disabled</code></td><td><code>Default</code></td></tr>
<tr><td>Value Type</td><td><code>Default</code> <code>Placeholder</code></td><td><code>Default</code></td></tr>
</tbody>
</table>

## States

- ✅ `Default`
- ✅ `Error`
- ✅ `Disabled`

## Design Tokens

| Metric | Count |
|--------|-------|
| Total items | 21 |
| Design tokens | 21 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#1e1e1e"></span>`Text/Default/Default` → #1e1e1e — Using Text/Default/Default token
- <span class="swatch" style="background:#757575"></span>`Text/Default/Secondary` → #757575 — Using Text/Default/Secondary token
- <span class="swatch" style="background:#ffffff"></span>`Background/Default/Default` → #ffffff — Using Background/Default/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Border/Default/Default` → #d9d9d9 — Using Border/Default/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Default/Tertiary` → #b3b3b3 — Using Text/Default/Tertiary token
- <span class="swatch" style="background:#b3b3b3"></span>`Icon/Default/Tertiary` → #b3b3b3 — Using Icon/Default/Tertiary token
- <span class="swatch" style="background:#900b09"></span>`Border/Danger/Default` → #900b09 — Using Border/Danger/Default token
- <span class="swatch" style="background:#900b09"></span>`Text/Danger/Default` → #900b09 — Using Text/Danger/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Disabled/Default` → #b3b3b3 — Using Text/Disabled/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Disabled/Default` → #d9d9d9 — Using Background/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Border/Disabled/default` → #b3b3b3 — Using Border/Disabled/default token
- <span class="swatch" style="background:#b3b3b3"></span>`Icon/Disabled/On Disabled` → #b3b3b3 — Using Icon/Disabled/On Disabled token

### Spacing

**Tokens in use:**
- `Space/200` → 8px — Using Space/200 token
- `Space/300` → 12px — Using Space/300 token
- `Space/400` → 16px — Using Space/400 token

### Typography

**Tokens in use:**
- `Body Base` → unresolved — Using Body Base token
- `Body/Font Family` → Inter — Using Body/Font Family token
- `Body/Font Weight Regular` → 400 — Using Body/Font Weight Regular token
- `Body/Size Medium` → 16px — Using Body/Size Medium token

### Borders

**Tokens in use:**
- `Stroke/Border` → 1px — Using Stroke/Border token
- `Radius/200` → 8px — Using Radius/200 token

## Accessibility · ARIA

<table>
<thead><tr><th>Item</th><th>Element</th><th>Role</th><th>States → ARIA</th><th>Keyboard</th><th>Accessible name</th></tr></thead>
<tbody>
<tr><td>Textarea Field</td><td><code>&lt;input&gt; + &lt;label for&gt;</code></td><td>textbox (implicit)</td><td>Disabled → <code>disabled</code><br>Error → <code>aria-invalid</code>=&quot;true&quot; + <code>aria-describedby</code> → error message id<br>Required → <code>required</code> / <code>aria-required</code>=&quot;true&quot;</td><td>Standard text editing; Tab moves on</td><td><code>&lt;label for&gt;</code> or <code>aria-labelledby</code> (placeholder is not a label)</td></tr>
</tbody>
</table>

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Accessibility

### Accessibility Audit

| Check | Status | Details |
|-------|--------|---------|
| Touch target size | ✅ Pass | Target size 120×110px meets recommended 44px minimum (smallest variant: "State=Default, Value Type=Placeholder") |
| Focus state | ⚠️ Warning | Add a visible focus state to support keyboard navigation (WCAG 2.4.7) |
| Minimum font size | ✅ Pass | Smallest text is 16px, meets readability guidelines |
| Color contrast | ❌ Fail | "Value" has 1.5:1 contrast, below WCAG AA minimum of 3:1. 18 text layers not measurable: "Label" (no solid fill behind the text), "Description" (no solid fill behind the text), "Hint" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 10.5/14 (75%)

| Rule | Status | Details |
|------|--------|---------|
| Text contrast ≥ 4.5:1 (3:1 large) | ❌ Fail | 4 text layers below contrast minimum: 'Value' 2.1:1, 'Value' 2.1:1, 'Value' 1.49:1, … |
| Hover, Focus and Disabled states | ❌ Fail | Missing state: Hover, Focus — a visible focus state is required (WCAG 2.4.7) |
| Ruby font (Fira Sans) | ⚠️ Warning | 12 text layers not using Fira Sans: 'Label' Inter, 'Value' Inter, 'Label' Inter, … |
| Icon and control sizes on Ruby size scale | ⚠️ Warning | 6 sizes off the Ruby size scale: 'Drag' icon 7×7, 'Drag' icon 7×7, 'Drag' icon 7×7, … |
| Real copy, not placeholders | ⚠️ Warning | 12 text layers use placeholder copy ('Label', 'Value'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: no API key saved

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ⚠️ Warning | Add a component description to help MCP and AI understand the component purpose and usage |

## AI Interpretation (Readiness score: 89%)

**What AI Reads Well:**
- Has 9 configurable properties
- Uses design tokens for consistency

**Where AI Gets Confused:**
- Missing component description - AI cannot understand component purpose and intent

**How to Improve AI Understanding:**
- Add a descriptive explanation in component properties to help AI understand the component's purpose, behavior, and usage patterns

---

*Generated by RubyLint — 11/24/2026*
