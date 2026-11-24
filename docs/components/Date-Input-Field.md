# Date Input Field

> **Design System Readiness: 92%**

Keywords: dropdown

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
<tr><td>Has Error</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>-</td></tr>
<tr><td>Label</td><td><code>TEXT</code></td><td><code>Label</code></td><td>No</td><td>-</td></tr>
<tr><td>Error</td><td><code>TEXT</code></td><td><code>Error</code></td><td>No</td><td>-</td></tr>
<tr><td>Description</td><td><code>TEXT</code></td><td><code>Description</code></td><td>No</td><td>-</td></tr>
<tr><td>Has Description</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>-</td></tr>
<tr><td>Day</td><td><code>TEXT</code></td><td><code>DD</code></td><td>No</td><td>-</td></tr>
<tr><td>Month</td><td><code>TEXT</code></td><td><code>MM</code></td><td>No</td><td>-</td></tr>
<tr><td>Year</td><td><code>TEXT</code></td><td><code>YYYY</code></td><td>No</td><td>-</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>-</td></tr>
<tr><td>Value Type</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>-</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Has Label</td><td><code>true</code> <code>false</code></td><td><code>true</code></td></tr>
<tr><td>Has Error</td><td><code>true</code> <code>false</code></td><td><code>true</code></td></tr>
<tr><td>Label</td><td><code>Label</code></td><td><code>Label</code></td></tr>
<tr><td>Error</td><td><code>Error</code></td><td><code>Error</code></td></tr>
<tr><td>Description</td><td><code>Description</code></td><td><code>Description</code></td></tr>
<tr><td>Has Description</td><td><code>true</code> <code>false</code></td><td><code>false</code></td></tr>
<tr><td>Day</td><td><code>DD</code></td><td><code>DD</code></td></tr>
<tr><td>Month</td><td><code>MM</code></td><td><code>MM</code></td></tr>
<tr><td>Year</td><td><code>YYYY</code></td><td><code>YYYY</code></td></tr>
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
| Total items | 20 |
| Design tokens | 20 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#1e1e1e"></span>`Text/Default/Default` → #1e1e1e — Using Text/Default/Default token
- <span class="swatch" style="background:#757575"></span>`Text/Default/Secondary` → #757575 — Using Text/Default/Secondary token
- <span class="swatch" style="background:#ffffff"></span>`Background/Default/Default` → #ffffff — Using Background/Default/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Border/Default/Default` → #d9d9d9 — Using Border/Default/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Default/Tertiary` → #b3b3b3 — Using Text/Default/Tertiary token
- <span class="swatch" style="background:#900b09"></span>`Border/Danger/Default` → #900b09 — Using Border/Danger/Default token
- <span class="swatch" style="background:#900b09"></span>`Text/Danger/Default` → #900b09 — Using Text/Danger/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Disabled/Default` → #b3b3b3 — Using Text/Disabled/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Disabled/Default` → #d9d9d9 — Using Background/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Border/Disabled/default` → #b3b3b3 — Using Border/Disabled/default token

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
- `Single Line/Body Base` → unresolved — Using Single Line/Body Base token

### Borders

**Tokens in use:**
- `Stroke/Border` → 1px — Using Stroke/Border token
- `Radius/200` → 8px — Using Radius/200 token

## Accessibility · ARIA

<table>
<thead><tr><th>Item</th><th>Element</th><th>Role</th><th>States → ARIA</th><th>Keyboard</th><th>Accessible name</th></tr></thead>
<tbody>
<tr><td>Date Input Field</td><td><code>&lt;input&gt; + &lt;label for&gt;</code></td><td>textbox (implicit)</td><td>Disabled → <code>disabled</code><br>Error → <code>aria-invalid</code>=&quot;true&quot; + <code>aria-describedby</code> → error message id<br>Required → <code>required</code> / <code>aria-required</code>=&quot;true&quot;</td><td>Standard text editing; Tab moves on</td><td><code>&lt;label for&gt;</code> or <code>aria-labelledby</code> (placeholder is not a label)</td></tr>
</tbody>
</table>

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Accessibility

### Accessibility Audit

| Check | Status | Details |
|-------|--------|---------|
| Touch target size | ✅ Pass | Target size 240×70px meets recommended 44px minimum (smallest variant: "State=Default, Value Type=Default") |
| Focus state | ⚠️ Warning | Add a visible focus state to support keyboard navigation (WCAG 2.4.7) |
| Minimum font size | ✅ Pass | Smallest text is 16px, meets readability guidelines |
| Color contrast | ❌ Fail | "DD" has 1.5:1 contrast, below WCAG AA minimum of 3:1. 14 text layers not measurable: "Label" (no solid fill behind the text), "Description" (no solid fill behind the text), "Label" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 10.5/14 (75%)

| Rule | Status | Details |
|------|--------|---------|
| Text contrast ≥ 4.5:1 (3:1 large) | ❌ Fail | 12 text layers below contrast minimum: 'DD' 2.1:1, 'MM' 2.1:1, 'YYYY' 2.1:1, … |
| Hover, Focus and Disabled states | ❌ Fail | Missing state: Hover, Focus — a visible focus state is required (WCAG 2.4.7) |
| Ruby font (Fira Sans) | ⚠️ Warning | 26 text layers not using Fira Sans: 'Label' Inter, 'DD' Inter, 'MM' Inter, … |
| Labels in sentence case | ⚠️ Warning | 6 labels not in sentence case: 'YYYY' "YYYY", 'YYYY' "YYYY", 'YYYY' "YYYY", … |
| Real copy, not placeholders | ⚠️ Warning | 6 text layers use placeholder copy ('Label'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: no API key saved

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ✅ Pass | Component has description for MCP/AI context |

## AI Interpretation (Readiness score: 92%)

**What AI Reads Well:**
- Has component description for better MCP/AI context
- Has 11 configurable properties
- Uses design tokens for consistency

---

*Generated by RubyLint — 11/24/2026*
