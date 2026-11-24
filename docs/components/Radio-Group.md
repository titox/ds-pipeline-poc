# Radio Group

> **Design System Readiness: 90%**

A labelled set of five Radio Field instances, available in horizontal and vertical layouts. The group label is editable text and each option carries a label row and a description row.

### Purpose

Lets a person pick one option from a short list of mutually exclusive choices under a shared heading such as "Delivery speed".

### Behaviour

Selection is single-choice, so picking one option clears the previous one. The group label names the question. Keyboard users move between options with arrow keys and the whole group takes one tab stop.

### Composition

Five instances of Radio Field per variant. Each Radio Field holds a "Checkbox and Label" frame and a "Description Row" frame. Code generators should look for an existing Radio Field or radio input in the codebase before building a new one, and reuse the group wrapper if one already exists.

### Usage

Use when every option should be visible at once and only one answer is allowed. Use a select or dropdown when the list is long. Use checkboxes when more than one answer is allowed. The horizontal variant suits two or three short labels. The vertical variant suits longer labels or options with descriptions.

### Code Generation Notes

Render as a fieldset with the group label as the legend, and give every input the same name attribute so the browser handles single selection. The count of five is a Figma convenience, so treat options as data and map over them rather than hard-coding five items. Orientation should be a layout prop, not a separate component. Error, disabled and required handling sits on the group or the individual field and is not expressed as a Figma property here.

## Design System Adoption

| Criterion | Score | Basis |
|-----------|-------|-------|
| Reuse | 2/3 — Used in a few places | set manually |
| Pattern Strength | 2/3 — Some flexibility | suggested: 1 variant axis and 1 component property. |
| System Fit | 2/3 — Could fit with some adjustments | set manually |
| Value | 2/3 — Moderate benefit | set manually |
| Evidence | 2/3 — Some examples | set manually |

**Total: 10/15** (10–12) — Refine or extend an existing component

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>orientation</td><td><code>horizontal</code> <code>vertical</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Group Label</td><td><code>TEXT</code></td><td><code>Delivery speed</code></td><td>No</td><td>The heading that names the question the options answer.</td></tr>
<tr><td>orientation</td><td><code>VARIANT</code></td><td><code>horizontal</code></td><td>No</td><td>Lays the Radio Field instances out in a row or a column.</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Group Label</td><td><code>Delivery speed</code></td><td><code>Delivery speed</code></td></tr>
<tr><td>orientation</td><td><code>horizontal</code> <code>vertical</code></td><td><code>horizontal</code></td></tr>
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
- <span class="swatch" style="background:#e6e6e6"></span>`Background/Brand/Secondary` → #e6e6e6 — Using Background/Brand/Secondary token
- <span class="swatch" style="background:#2c2c2c"></span>`Border/Brand/Default` → #2c2c2c — Using Border/Brand/Default token
- <span class="swatch" style="background:#1e1e1e"></span>`Icon/Brand/On Brand Secondary` → #1e1e1e — Using Icon/Brand/On Brand Secondary token
- <span class="swatch" style="background:#1e1e1e"></span>`Text/Default/Default` → #1e1e1e — Using Text/Default/Default token
- <span class="swatch" style="background:#757575"></span>`Text/Default/Secondary` → #757575 — Using Text/Default/Secondary token
- <span class="swatch" style="background:#ffffff"></span>`Background/Default/Default` → #ffffff — Using Background/Default/Default token
- <span class="swatch" style="background:#757575"></span>`Border/Brand/Tertiary` → #757575 — Using Border/Brand/Tertiary token
- <span class="swatch" style="background:#f5f5f5"></span>`Icon/Brand/On Brand` → #f5f5f5 — Using Icon/Brand/On Brand token

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
<tr><td>Radio Group</td><td><code>&lt;input type=&quot;checkbox|radio&quot;&gt;</code></td><td>checkbox, radio, or switch (role=&quot;switch&quot;)</td><td>Selected → <code>checked</code> / <code>aria-checked</code>=&quot;true|false|mixed&quot;<br>Disabled → <code>disabled</code></td><td>Space toggles; radios move with arrow keys</td><td><code>&lt;label for&gt;</code> wrapping or pointing at the input</td></tr>
<tr><td>Radio Field</td><td><code>&lt;input type=&quot;checkbox|radio&quot;&gt;</code></td><td>checkbox, radio, or switch (role=&quot;switch&quot;)</td><td>Selected → <code>checked</code> / <code>aria-checked</code>=&quot;true|false|mixed&quot;<br>Disabled → <code>disabled</code></td><td>Space toggles; radios move with arrow keys</td><td><code>&lt;label for&gt;</code> wrapping or pointing at the input</td></tr>
</tbody>
</table>

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Accessibility

### Accessibility Audit

| Check | Status | Details |
|-------|--------|---------|
| Touch target size | ✅ Pass | Target size 648×44px meets recommended 44px minimum (smallest variant: "orientation=horizontal") |
| Focus state | ⚠️ Warning | Add a visible focus state to support keyboard navigation (WCAG 2.4.7) |
| Minimum font size | ✅ Pass | Smallest text is 16px, meets readability guidelines |
| Color contrast | ⚠️ Warning | 20 text layers not measurable: "Label" (no solid fill behind the text), "Description" (no solid fill behind the text), "Label" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 11.5/14 (82%)

| Rule | Status | Details |
|------|--------|---------|
| Hover, Focus and Disabled states | ❌ Fail | Missing state: Hover, Focus, Disabled — a visible focus state is required (WCAG 2.4.7) |
| Text contrast ≥ 4.5:1 (3:1 large) | ⚠️ Warning | 20 text layers with unmeasurable contrast: 'Label' (no solid fill behind the text), 'Description' (no solid fill behind the text), 'Label' (no solid fill behind the text), … — not measurable, check manually |
| Ruby font (Fira Sans) | ⚠️ Warning | 20 text layers not using Fira Sans: 'Label' Inter, 'Description' Inter, 'Label' Inter, … |
| Real copy, not placeholders | ⚠️ Warning | 10 text layers use placeholder copy ('Label'). Use real words such as "Save profile" so examples read like the product |

### AI opinion (not scored)

- **Works at narrow widths** (warning): Design how the horizontal variant stacks at 320px, since five options with descriptions will not fit in a row.
- **Clear headings and structure** (pass): Treat the group label as the legend so the question is announced before each option.
- **Links vs buttons** (pass): No links or buttons sit inside the group, so option labels should stay plain text tied to their input.
- **Not colour alone** (pass): Selection shows as a filled dot as well as a colour change, so keep the dot when adding any error styling.

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ✅ Pass | Component has description for MCP/AI context |

## AI Interpretation (Readiness score: 90%)

**What AI Reads Well:**
- Has component description for better MCP/AI context
- Has 2 configurable properties
- Uses design tokens for consistency

---

*Generated by RubyLint — 11/24/2026*
