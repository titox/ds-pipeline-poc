# Button

> **Design System Readiness: 94%**

button with 8 properties

## Design System Adoption

| Criterion | Score | Basis |
|-----------|-------|-------|
| Reuse | 3/3 — Needed across teams or products | set manually |
| Pattern Strength | 3/3 — Clear, reusable pattern with variants | suggested: 3 variant axes and 5 component properties. |
| System Fit | 2/3 — Could fit with some adjustments | suggested: Similar to "Icon Button", "Button Group", "Button Danger". |
| Value | 3/3 — Saves time, reduces duplication, or solves a clear problem | set manually |
| Evidence | 3/3 — Proven need (multiple teams or repeated implementations) | set manually |

**Total: 14/15** (13–15) — Add to the design system

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>Variant</td><td><code>Primary</code> <code>Neutral</code> <code>Subtle</code></td></tr>
<tr><td>State</td><td><code>Default</code> <code>Hover</code> <code>Disabled</code> <code>Focus</code> <code>Loading</code></td></tr>
<tr><td>Size</td><td><code>Medium</code> <code>Small</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Label</td><td><code>TEXT</code></td><td><code>Button</code></td><td>No</td><td>-</td></tr>
<tr><td>Icon End</td><td><code>INSTANCE_SWAP</code></td><td><code>X</code></td><td>No</td><td>-</td></tr>
<tr><td>Has Icon End</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>-</td></tr>
<tr><td>Has Icon Start</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>-</td></tr>
<tr><td>Icon Start</td><td><code>INSTANCE_SWAP</code></td><td><code>Star</code></td><td>No</td><td>-</td></tr>
<tr><td>Variant</td><td><code>VARIANT</code></td><td><code>Primary</code></td><td>No</td><td>-</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>-</td></tr>
<tr><td>Size</td><td><code>VARIANT</code></td><td><code>Medium</code></td><td>No</td><td>-</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Label</td><td><code>Button</code></td><td><code>Button</code></td></tr>
<tr><td>Icon End</td><td><code>Instance swap · 576 preferred icons</code></td><td><code>X</code></td></tr>
<tr><td>Has Icon End</td><td><code>true</code> <code>false</code></td><td><code>false</code></td></tr>
<tr><td>Has Icon Start</td><td><code>true</code> <code>false</code></td><td><code>false</code></td></tr>
<tr><td>Icon Start</td><td><code>Instance swap · 576 preferred icons</code></td><td><code>Star</code></td></tr>
<tr><td>Variant</td><td><code>Primary</code> <code>Neutral</code> <code>Subtle</code></td><td><code>Primary</code></td></tr>
<tr><td>State</td><td><code>Default</code> <code>Hover</code> <code>Disabled</code> <code>Focus</code> <code>Loading</code></td><td><code>Default</code></td></tr>
<tr><td>Size</td><td><code>Medium</code> <code>Small</code></td><td><code>Medium</code></td></tr>
</tbody>
</table>

## States

- ✅ `Default`
- ✅ `Hover`
- ✅ `Disabled`
- ✅ `Focus`
- ✅ `Loading`

## Design Tokens

| Metric | Count |
|--------|-------|
| Total items | 26 |
| Design tokens | 26 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#2c2c2c"></span>`Background/Brand/Default` → #2c2c2c — Using Background/Brand/Default token
- <span class="swatch" style="background:#2c2c2c"></span>`Border/Brand/Default` → #2c2c2c — Using Border/Brand/Default token
- <span class="swatch" style="background:#f5f5f5"></span>`Icon/Brand/On Brand` → #f5f5f5 — Using Icon/Brand/On Brand token
- <span class="swatch" style="background:#f5f5f5"></span>`Text/Brand/On Brand` → #f5f5f5 — Using Text/Brand/On Brand token
- <span class="swatch" style="background:#1e1e1e"></span>`Background/Brand/Hover` → #1e1e1e — Using Background/Brand/Hover token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Disabled/Default` → #d9d9d9 — Using Background/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Border/Disabled/default` → #b3b3b3 — Using Border/Disabled/default token
- <span class="swatch" style="background:#b3b3b3"></span>`Icon/Disabled/On Disabled` → #b3b3b3 — Using Icon/Disabled/On Disabled token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Disabled/On Disabled` → #b3b3b3 — Using Text/Disabled/On Disabled token
- <span class="swatch" style="background:#e3e3e3"></span>`Background/Neutral/Tertiary` → #e3e3e3 — Using Background/Neutral/Tertiary token
- <span class="swatch" style="background:#767676"></span>`Border/Neutral/Secondary` → #767676 — Using Border/Neutral/Secondary token
- <span class="swatch" style="background:#1e1e1e"></span>`Icon/Default/Default` → #1e1e1e — Using Icon/Default/Default token
- <span class="swatch" style="background:#1e1e1e"></span>`Text/Default/Default` → #1e1e1e — Using Text/Default/Default token
- <span class="swatch" style="background:#cdcdcd"></span>`Background/Neutral/Tertiary Hover` → #cdcdcd — Using Background/Neutral/Tertiary Hover token
- <span class="swatch" style="background:#303030"></span>`Text/Neutral/Default` → #303030 — Using Text/Neutral/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Border/Default/Default` → #d9d9d9 — Using Border/Default/Default token
- <span class="swatch" style="background:#ec221f"></span>`Border/Focus/Default` → #ec221f — Using Border/Focus/Default token

### Spacing

**Tokens in use:**
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
- `Stroke/Focus Ring` → 2px — Using Stroke/Focus Ring token

## Accessibility · ARIA

<table>
<thead><tr><th>Item</th><th>Element</th><th>Role</th><th>States → ARIA</th><th>Keyboard</th><th>Accessible name</th></tr></thead>
<tbody>
<tr><td>Button</td><td><code>&lt;button&gt;</code></td><td>button (implicit)</td><td>Disabled → <code>disabled</code> (or <code>aria-disabled</code>=&quot;true&quot; to keep it focusable)</td><td>Enter, Space</td><td>Visible label text; <code>aria-label</code> if icon-only</td></tr>
</tbody>
</table>

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Accessibility

### Accessibility Audit

| Check | Status | Details |
|-------|--------|---------|
| Touch target size | ⚠️ Warning | Target size 67×32px meets WCAG minimum (24px) but is below recommended 44px (smallest variant: "Variant=Primary, State=Default, Size=Small") |
| Focus state | ✅ Pass | Component has a focus state for keyboard navigation |
| Minimum font size | ✅ Pass | Smallest text is 16px, meets readability guidelines |
| Color contrast | ❌ Fail | "Button" has 1.5:1 contrast, below WCAG AA minimum of 3:1. 8 text layers not measurable: "Button" (no solid fill behind the text), "Button" (no solid fill behind the text), "Button" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 11.5/14 (82%)

| Rule | Status | Details |
|------|--------|---------|
| Text contrast ≥ 4.5:1 (3:1 large) | ❌ Fail | 6 text layers below contrast minimum: 'Button' 1.49:1, 'Button' 1.49:1, 'Button' 1.49:1, … |
| Target size ≥ 24×24px (44 preferred) | ⚠️ Warning | Target 67×32px meets WCAG AA (24px) but not 44px (AAA) |
| Ruby font (Fira Sans) | ⚠️ Warning | 30 text layers not using Fira Sans: 'Button' Inter, 'Button' Inter, 'Button' Inter, … |
| Real copy, not placeholders | ⚠️ Warning | 30 text layers use placeholder copy ('Button'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: the AI request failed (Claude API Error (400): Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits. Add credits to the account that issued this key at platform.claude.com — API usage is billed separately from Claude subscriptions.)

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ✅ Pass | Component has description for MCP/AI context |

## AI Interpretation (Readiness score: 94%)

**What AI Reads Well:**
- Has component description for better MCP/AI context
- Has 8 configurable properties
- Uses design tokens for consistency

---

*Generated by RubyLint — 11/24/2026*
