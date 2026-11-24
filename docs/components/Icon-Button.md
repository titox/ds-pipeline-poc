# Icon Button

> **Design System Readiness: 96%**

button with 4 properties

## Design System Adoption

| Criterion | Score | Basis |
|-----------|-------|-------|
| Reuse | 1/3 — One-off use | suggested: No instances on this page. |
| Pattern Strength | 3/3 — Clear, reusable pattern with variants | suggested: 3 variant axes and 1 component property. |
| System Fit | 2/3 — Could fit with some adjustments | suggested: Similar to "Button". |
| Value | — | not scored |
| Evidence | — | not scored |

**Total: incomplete** — still to score: Value, Evidence

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>Variant</td><td><code>Primary</code> <code>Neutral</code> <code>Subtle</code></td></tr>
<tr><td>State</td><td><code>Default</code> <code>Hover</code> <code>Disabled</code> <code>Focus</code></td></tr>
<tr><td>Size</td><td><code>Medium</code> <code>Small</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Icon</td><td><code>INSTANCE_SWAP</code></td><td><code>Star</code></td><td>No</td><td>-</td></tr>
<tr><td>Variant</td><td><code>VARIANT</code></td><td><code>Primary</code></td><td>No</td><td>-</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>-</td></tr>
<tr><td>Size</td><td><code>VARIANT</code></td><td><code>Medium</code></td><td>No</td><td>-</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Icon</td><td><code>Instance swap · 576 preferred icons</code></td><td><code>Star</code></td></tr>
<tr><td>Variant</td><td><code>Primary</code> <code>Neutral</code> <code>Subtle</code></td><td><code>Primary</code></td></tr>
<tr><td>State</td><td><code>Default</code> <code>Hover</code> <code>Disabled</code> <code>Focus</code></td><td><code>Default</code></td></tr>
<tr><td>Size</td><td><code>Medium</code> <code>Small</code></td><td><code>Medium</code></td></tr>
</tbody>
</table>

## States

- ✅ `Default`
- ✅ `Hover`
- ✅ `Disabled`
- ✅ `Focus`

## Design Tokens

| Metric | Count |
|--------|-------|
| Total items | 19 |
| Design tokens | 19 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#2c2c2c"></span>`Background/Brand/Default` → #2c2c2c — Using Background/Brand/Default token
- <span class="swatch" style="background:#2c2c2c"></span>`Border/Brand/Default` → #2c2c2c — Using Border/Brand/Default token
- <span class="swatch" style="background:#f5f5f5"></span>`Icon/Brand/On Brand` → #f5f5f5 — Using Icon/Brand/On Brand token
- <span class="swatch" style="background:#f5f5f5"></span>`Background/Default/Secondary` → #f5f5f5 — Using Background/Default/Secondary token
- <span class="swatch" style="background:#d9d9d9"></span>`Border/Default/Default` → #d9d9d9 — Using Border/Default/Default token
- <span class="swatch" style="background:#1e1e1e"></span>`Icon/Default/Default` → #1e1e1e — Using Icon/Default/Default token
- <span class="swatch" style="background:#1e1e1e"></span>`Background/Brand/Hover` → #1e1e1e — Using Background/Brand/Hover token
- <span class="swatch" style="background:#e6e6e6"></span>`Background/Default/Secondary Hover` → #e6e6e6 — Using Background/Default/Secondary Hover token
- <span class="swatch" style="background:#f5f5f5"></span>`Background/Default/Default Hover` → #f5f5f5 — Using Background/Default/Default Hover token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Disabled/Default` → #d9d9d9 — Using Background/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Border/Disabled/default` → #b3b3b3 — Using Border/Disabled/default token
- <span class="swatch" style="background:#b3b3b3"></span>`Icon/Disabled/On Disabled` → #b3b3b3 — Using Icon/Disabled/On Disabled token
- <span class="swatch" style="background:#ec221f"></span>`Icon/Danger/Tertiary` → #ec221f — Using Icon/Danger/Tertiary token

### Spacing

**Tokens in use:**
- `Space/300` → 12px — Using Space/300 token
- `Space/200` → 8px — Using Space/200 token
- `Scale 07` → 40px — Using Scale 07 token

### Borders

**Tokens in use:**
- `Stroke/Border` → 1px — Using Stroke/Border token
- `Scale 06` → 32px — Using Scale 06 token
- `Stroke/Focus Ring` → 2px — Using Stroke/Focus Ring token

## Accessibility · ARIA

<table>
<thead><tr><th>Item</th><th>Element</th><th>Role</th><th>States → ARIA</th><th>Keyboard</th><th>Accessible name</th></tr></thead>
<tbody>
<tr><td>Icon Button</td><td><code>&lt;button&gt;</code></td><td>button (implicit)</td><td>Disabled → <code>disabled</code> (or <code>aria-disabled</code>=&quot;true&quot; to keep it focusable)</td><td>Enter, Space</td><td>Visible label text; <code>aria-label</code> if icon-only</td></tr>
</tbody>
</table>

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Accessibility

### Accessibility Audit

| Check | Status | Details |
|-------|--------|---------|
| Touch target size | ⚠️ Warning | Target size 36×36px meets WCAG minimum (24px) but is below recommended 44px (smallest variant: "Variant=Primary, State=Default, Size=Small") |
| Focus state | ✅ Pass | Component has a focus state for keyboard navigation |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 7.5/8 (94%)

| Rule | Status | Details |
|------|--------|---------|
| Target size ≥ 24×24px (44 preferred) | ⚠️ Warning | Target 36×36px meets WCAG AA (24px) but not 44px (AAA) |

> AI opinions not available: the AI request failed (Claude API Error (400): Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits. Add credits to the account that issued this key at platform.claude.com — API usage is billed separately from Claude subscriptions.)

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ✅ Pass | Component has description for MCP/AI context |

## AI Interpretation (Readiness score: 96%)

**What AI Reads Well:**
- Has component description for better MCP/AI context
- Has 4 configurable properties
- Uses design tokens for consistency

---

*Generated by RubyLint — 11/24/2026*
