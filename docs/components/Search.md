# Search

> **Design System Readiness: 88%**

A single-line search field with a leading search icon, offered in eight variants across four states and two value types. The Value Type property switches between placeholder text and an entered value, and the State property covers Default, Hover, Focus and Disabled.

### Purpose

Lets people type a query to filter or find content. The pill shape (Radius/Full) and the icon mark it as a search field rather than a general text input.

### Behaviour

Hover changes the field's surface and border. Focus applies the Stroke/Focus Ring border and Border/Focus/Default colour. Disabled swaps background, border, text and icon to the disabled token set and blocks input. Value Type=Placeholder uses Text/Default/Tertiary for the prompt text; Value Type=Filled uses Text/Default/Default for real content.

### Composition

Two nested instances carry the icon. Placeholder variants use an instance named 'Search'; filled variants use an instance named 'container'. Both wrap a single Vector icon layer. AI code generators should look for these icon sub-components in the development codebase before building new ones.

### Usage

Use this for query entry in toolbars, page headers, list filters and pickers. Use a standard text field when the input is not a search, and a select or combobox when the user picks from a fixed set.

### Code Generation Notes

Render as input[type=search] with an accessible name, since there is no visible label layer. The Value text layer maps to the value or placeholder attribute depending on Value Type. Hover and Focus are browser states, not separate components, so build one element with :hover and :focus-visible rather than four. The focus ring should sit outside the border so it stays visible on coloured backgrounds. Two icon instance names exist for the same role, so consolidate to one in code. Debounce input before firing a query, and wire Enter to submit.

## Design System Adoption

| Criterion | Score | Basis |
|-----------|-------|-------|
| Reuse | 3/3 — Needed across teams or products | set manually |
| Pattern Strength | 3/3 — Clear, reusable pattern with variants | suggested: 2 variant axes and 1 component property. |
| System Fit | 3/3 — Clearly extends and improves the system | suggested: No overlap with the 11 other local components. Library components aren't checked. |
| Value | 3/3 — Saves time, reduces duplication, or solves a clear problem | set manually |
| Evidence | 3/3 — Proven need (multiple teams or repeated implementations) | set manually |

**Total: 15/15** (13–15) — Add to the design system

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>State</td><td><code>Default</code> <code>Disabled</code> <code>Hover</code> <code>Focus</code></td></tr>
<tr><td>Value Type</td><td><code>Filled</code> <code>Placeholder</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Value</td><td><code>TEXT</code></td><td><code>Value</code></td><td>No</td><td>The text shown in the field, used as either placeholder copy or an entered query depending on Value Type.</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>Interaction state of the field, driving background, border, text and icon colours.</td></tr>
<tr><td>Value Type</td><td><code>VARIANT</code></td><td><code>Placeholder</code></td><td>No</td><td>Whether the field shows tertiary placeholder text or a filled-in value in default text colour.</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Value</td><td><code>Value</code></td><td><code>Value</code></td></tr>
<tr><td>State</td><td><code>Default</code> <code>Disabled</code> <code>Hover</code> <code>Focus</code></td><td><code>Default</code></td></tr>
<tr><td>Value Type</td><td><code>Filled</code> <code>Placeholder</code></td><td><code>Placeholder</code></td></tr>
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
| Total items | 20 |
| Design tokens | 20 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#ffffff"></span>`Background/Default/Default` → #ffffff — Using Background/Default/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Border/Default/Default` → #d9d9d9 — Using Border/Default/Default token
- <span class="swatch" style="background:#1e1e1e"></span>`Text/Default/Default` → #1e1e1e — Using Text/Default/Default token
- <span class="swatch" style="background:#1e1e1e"></span>`Icon/Default/Default` → #1e1e1e — Using Icon/Default/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Disabled/Default` → #d9d9d9 — Using Background/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Border/Disabled/default` → #b3b3b3 — Using Border/Disabled/default token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Disabled/On Disabled` → #b3b3b3 — Using Text/Disabled/On Disabled token
- <span class="swatch" style="background:#b3b3b3"></span>`Icon/Disabled/On Disabled` → #b3b3b3 — Using Icon/Disabled/On Disabled token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Default/Tertiary` → #b3b3b3 — Using Text/Default/Tertiary token
- <span class="swatch" style="background:#ec221f"></span>`Border/Focus/Default` → #ec221f — Using Border/Focus/Default token

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
- `Stroke/Focus Ring` → 2px — Using Stroke/Focus Ring token

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
| Focus state | ✅ Pass | Component has a focus state for keyboard navigation |
| Minimum font size | ✅ Pass | Smallest text is 16px, meets readability guidelines |
| Color contrast | ❌ Fail | "Value" has 1.5:1 contrast, below WCAG AA minimum of 3:1 |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 11.5/14 (82%)

| Rule | Status | Details |
|------|--------|---------|
| Text contrast ≥ 4.5:1 (3:1 large) | ❌ Fail | 5 text layers below contrast minimum: 'Value' 1.49:1, 'Value' 2.1:1, 'Value' 1.49:1, … |
| Target size ≥ 24×24px (44 preferred) | ⚠️ Warning | Target 120×40px meets WCAG AA (24px) but not 44px (AAA) |
| Ruby font (Fira Sans) | ⚠️ Warning | 8 text layers not using Fira Sans: 'Value' Inter, 'Value' Inter, 'Value' Inter, … |
| Real copy, not placeholders | ⚠️ Warning | 8 text layers use placeholder copy ('Value'). Use real words such as "Save profile" so examples read like the product |

### AI opinion (not scored)

- **Clear headings and structure** (warning): There is no label layer, so pair the field with a visible or visually hidden label for reading order and naming.
- **Works at narrow widths** (warning): Let the field fill its container width so long placeholder text does not clip at 320px.
- **Not colour alone** (warning): Disabled is signalled by colour alone, so also convey it through the disabled attribute and non-interactive cursor.
- **Links vs buttons** (pass): The field reads as an input and the icon is decorative, so nothing is mistaken for a link.

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ⚠️ Warning | Add a component description to help MCP and AI understand the component purpose and usage |

## AI Interpretation (Readiness score: 88%)

**What AI Reads Well:**
- Has 3 configurable properties
- Uses design tokens for consistency

**Where AI Gets Confused:**
- Missing component description - AI cannot understand component purpose and intent

**How to Improve AI Understanding:**
- Add a descriptive explanation in component properties to help AI understand the component's purpose, behavior, and usage patterns

---

*Generated by RubyLint — 11/24/2026*
