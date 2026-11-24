# Button Group

> **Design System Readiness: 86%**

container with 3 properties

## Design System Adoption

| Criterion | Score | Basis |
|-----------|-------|-------|
| Reuse | 1/3 — One-off use | suggested: No instances on this page. |
| Pattern Strength | 3/3 — Clear, reusable pattern with variants | suggested: 1 variant axis and 2 component properties. |
| System Fit | 2/3 — Could fit with some adjustments | suggested: Similar to "Button". |
| Value | — | not scored |
| Evidence | — | not scored |

**Total: incomplete** — still to score: Value, Evidence

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>Align</td><td><code>Justify</code> <code>Start</code> <code>End</code> <code>Center</code> <code>Stack</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Button Start</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>-</td></tr>
<tr><td>Button End</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>-</td></tr>
<tr><td>Align</td><td><code>VARIANT</code></td><td><code>Justify</code></td><td>No</td><td>-</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Button Start</td><td><code>true</code> <code>false</code></td><td><code>true</code></td></tr>
<tr><td>Button End</td><td><code>true</code> <code>false</code></td><td><code>true</code></td></tr>
<tr><td>Align</td><td><code>Justify</code> <code>Start</code> <code>End</code> <code>Center</code> <code>Stack</code></td><td><code>Justify</code></td></tr>
</tbody>
</table>

## States

- `default`

## Design Tokens

| Metric | Count |
|--------|-------|
| Total items | 15 |
| Design tokens | 15 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#1e1e1e"></span>`Icon/Default/Default` → #1e1e1e — Using Icon/Default/Default token
- <span class="swatch" style="background:#303030"></span>`Text/Neutral/Default` → #303030 — Using Text/Neutral/Default token
- <span class="swatch" style="background:#2c2c2c"></span>`Background/Brand/Default` → #2c2c2c — Using Background/Brand/Default token
- <span class="swatch" style="background:#2c2c2c"></span>`Border/Brand/Default` → #2c2c2c — Using Border/Brand/Default token
- <span class="swatch" style="background:#f5f5f5"></span>`Icon/Brand/On Brand` → #f5f5f5 — Using Icon/Brand/On Brand token
- <span class="swatch" style="background:#f5f5f5"></span>`Text/Brand/On Brand` → #f5f5f5 — Using Text/Brand/On Brand token

### Spacing

**Tokens in use:**
- `Space/400` → 16px — Using Space/400 token
- `Space/300` → 12px — Using Space/300 token
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
- `Radius/200` → 8px — Using Radius/200 token

## Accessibility · ARIA

<table>
<thead><tr><th>Item</th><th>Element</th><th>Role</th><th>States → ARIA</th><th>Keyboard</th><th>Accessible name</th></tr></thead>
<tbody>
<tr><td>Button Group</td><td><code>&lt;button&gt;</code></td><td>button (implicit)</td><td>Disabled → <code>disabled</code> (or <code>aria-disabled</code>=&quot;true&quot; to keep it focusable)</td><td>Enter, Space</td><td>Visible label text; <code>aria-label</code> if icon-only</td></tr>
<tr><td>Button</td><td><code>&lt;button&gt;</code></td><td>button (implicit)</td><td>Disabled → <code>disabled</code> (or <code>aria-disabled</code>=&quot;true&quot; to keep it focusable)</td><td>Enter, Space</td><td>Visible label text; <code>aria-label</code> if icon-only</td></tr>
</tbody>
</table>

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Accessibility

### Accessibility Audit

| Check | Status | Details |
|-------|--------|---------|
| Touch target size | ⚠️ Warning | Target size 240×40px meets WCAG minimum (24px) but is below recommended 44px (smallest variant: "Align=Start") |
| Focus state | ⚠️ Warning | Add a visible focus state to support keyboard navigation (WCAG 2.4.7) |
| Minimum font size | ✅ Pass | Smallest text is 16px, meets readability guidelines |
| Color contrast | ⚠️ Warning | Lowest contrast ratio is 12.8:1, meets WCAG AA (4.5:1). 5 text layers not measurable: "Button" (no solid fill behind the text), "Button" (no solid fill behind the text), "Button" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 10/13 (77%)

| Rule | Status | Details |
|------|--------|---------|
| Hover, Focus and Disabled states | ❌ Fail | Missing state: Hover, Focus, Disabled — a visible focus state is required (WCAG 2.4.7) |
| Target size ≥ 24×24px (44 preferred) | ⚠️ Warning | Target 240×40px meets WCAG AA (24px) but not 44px (AAA) |
| Text contrast ≥ 4.5:1 (3:1 large) | ⚠️ Warning | 5 text layers with unmeasurable contrast: 'Button' (no solid fill behind the text), 'Button' (no solid fill behind the text), 'Button' (no solid fill behind the text), … — not measurable, check manually |
| Ruby font (Fira Sans) | ⚠️ Warning | 10 text layers not using Fira Sans: 'Button' Inter, 'Button' Inter, 'Button' Inter, … |
| Real copy, not placeholders | ⚠️ Warning | 10 text layers use placeholder copy ('Button'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: the AI request failed (Claude API Error (400): Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits. Add credits to the account that issued this key at platform.claude.com — API usage is billed separately from Claude subscriptions.)

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ✅ Pass | Component has description for MCP/AI context |

## AI Interpretation (Readiness score: 86%)

**What AI Reads Well:**
- Has component description for better MCP/AI context
- Has 3 configurable properties
- Uses design tokens for consistency

---

*Generated by RubyLint — 11/24/2026*
