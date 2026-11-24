# Radio Field

> **Design System Readiness: 92%**

Checked / Unchecked is a property within the design file only. Coded Radio Fields are grouped and the value of the field indicates its state.

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>State</td><td><code>Default</code> <code>Disabled</code></td></tr>
<tr><td>Value Type</td><td><code>Unchecked</code> <code>Checked</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Has Description</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>-</td></tr>
<tr><td>Description</td><td><code>TEXT</code></td><td><code>Description</code></td><td>No</td><td>-</td></tr>
<tr><td>Label</td><td><code>TEXT</code></td><td><code>Label</code></td><td>No</td><td>-</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>-</td></tr>
<tr><td>Value Type</td><td><code>VARIANT</code></td><td><code>Checked</code></td><td>No</td><td>-</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Has Description</td><td><code>true</code> <code>false</code></td><td><code>true</code></td></tr>
<tr><td>Description</td><td><code>Description</code></td><td><code>Description</code></td></tr>
<tr><td>Label</td><td><code>Label</code></td><td><code>Label</code></td></tr>
<tr><td>State</td><td><code>Default</code> <code>Disabled</code></td><td><code>Default</code></td></tr>
<tr><td>Value Type</td><td><code>Unchecked</code> <code>Checked</code></td><td><code>Checked</code></td></tr>
</tbody>
</table>

## States

- ✅ `Default`
- ✅ `Disabled`

## Design Tokens

| Metric | Count |
|--------|-------|
| Total items | 19 |
| Design tokens | 19 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#e6e6e6"></span>`Background/Brand/Secondary` → #e6e6e6 — Using Background/Brand/Secondary token
- <span class="swatch" style="background:#2c2c2c"></span>`Border/Brand/Default` → #2c2c2c — Using Border/Brand/Default token
- <span class="swatch" style="background:#1e1e1e"></span>`Icon/Brand/On Brand Secondary` → #1e1e1e — Using Icon/Brand/On Brand Secondary token
- <span class="swatch" style="background:#1e1e1e"></span>`Text/Default/Default` → #1e1e1e — Using Text/Default/Default token
- <span class="swatch" style="background:#757575"></span>`Text/Default/Secondary` → #757575 — Using Text/Default/Secondary token
- <span class="swatch" style="background:#ffffff"></span>`Background/Default/Default` → #ffffff — Using Background/Default/Default token
- <span class="swatch" style="background:#757575"></span>`Border/Brand/Tertiary` → #757575 — Using Border/Brand/Tertiary token
- <span class="swatch" style="background:#f5f5f5"></span>`Icon/Brand/On Brand` → #f5f5f5 — Using Icon/Brand/On Brand token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Disabled/Default` → #d9d9d9 — Using Background/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Border/Disabled/default` → #b3b3b3 — Using Border/Disabled/default token
- <span class="swatch" style="background:#b3b3b3"></span>`Icon/Disabled/Default` → #b3b3b3 — Using Icon/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Disabled/Default` → #b3b3b3 — Using Text/Disabled/Default token

### Spacing

**Tokens in use:**
- `Space/300` → 12px — Using Space/300 token

### Typography

**Tokens in use:**
- `Body Base` → unresolved — Using Body Base token
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
<tr><td>Radio Field</td><td><code>&lt;input type=&quot;checkbox|radio&quot;&gt;</code></td><td>checkbox, radio, or switch (role=&quot;switch&quot;)</td><td>Selected → <code>checked</code> / <code>aria-checked</code>=&quot;true|false|mixed&quot;<br>Disabled → <code>disabled</code></td><td>Space toggles; radios move with arrow keys</td><td><code>&lt;label for&gt;</code> wrapping or pointing at the input</td></tr>
</tbody>
</table>

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Accessibility

### Accessibility Audit

| Check | Status | Details |
|-------|--------|---------|
| Touch target size | ✅ Pass | Target size 120×44px meets recommended 44px minimum (smallest variant: "State=Default, Value Type=Checked") |
| Focus state | ⚠️ Warning | Add a visible focus state to support keyboard navigation (WCAG 2.4.7) |
| Minimum font size | ✅ Pass | Smallest text is 16px, meets readability guidelines |
| Color contrast | ⚠️ Warning | 8 text layers not measurable: "Label" (no solid fill behind the text), "Description" (no solid fill behind the text), "Label" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 11.5/14 (82%)

| Rule | Status | Details |
|------|--------|---------|
| Hover, Focus and Disabled states | ❌ Fail | Missing state: Hover, Focus — a visible focus state is required (WCAG 2.4.7) |
| Text contrast ≥ 4.5:1 (3:1 large) | ⚠️ Warning | 8 text layers with unmeasurable contrast: 'Label' (no solid fill behind the text), 'Description' (no solid fill behind the text), 'Label' (no solid fill behind the text), … — not measurable, check manually |
| Ruby font (Fira Sans) | ⚠️ Warning | 8 text layers not using Fira Sans: 'Label' Inter, 'Description' Inter, 'Label' Inter, … |
| Real copy, not placeholders | ⚠️ Warning | 4 text layers use placeholder copy ('Label'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: no API key saved

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ✅ Pass | Component has description for MCP/AI context |

## AI Interpretation (Readiness score: 92%)

**What AI Reads Well:**
- Has component description for better MCP/AI context
- Has 5 configurable properties
- Uses design tokens for consistency

---

*Generated by RubyLint — 11/24/2026*
