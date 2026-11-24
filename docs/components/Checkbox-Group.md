# Checkbox Group

> **Design System Readiness: 82%**

A container that lays out five Checkbox Field instances in a single arrangement, switchable between horizontal and vertical. It carries no label, legend or validation of its own, so those must come from the surrounding form layout.

### Purpose

Groups related checkboxes so a user can pick any number of options from a set. The group itself handles arrangement and spacing only; each option's checkbox, label and description live inside the nested Checkbox Field.

### Behaviour

The orientation property switches the stacking direction. Horizontal places fields in a row, vertical stacks them in a column. Both variants use Space/300 between fields. Selection state, focus and disabling are handled per field, not at group level, so the group has no states of its own.

### Composition

Five instances of Checkbox Field, each containing a Checkbox and Label frame and a Description Row frame. A Check instance supplies the tick mark inside the box. AI code generators should look for existing Checkbox Field and Check implementations in the development codebase before building new ones.

### Usage

Use when several checkbox options belong to one question and multiple answers are allowed. Use a Radio Group instead when only one answer is allowed, and a Switch when the control toggles a setting immediately. Keep the horizontal variant for two or three short labels; longer labels or descriptions read better vertically.

### Code Generation Notes

Render as a fieldset with a legend, or an element with role="group" and an accessible name, and let the child fields own their input elements. The number of options is fixed at five in Figma, so treat the children as a repeatable slot and map them from data. Shared name, change handlers, required state and error messaging belong on the group in code even though they are not modelled in the design. Flex direction should follow the orientation prop, and the horizontal variant should be allowed to wrap on narrow viewports.

## Design System Adoption

| Criterion | Score | Basis |
|-----------|-------|-------|
| Reuse | 1/3 — One-off use | suggested: No instances on this page. |
| Pattern Strength | 2/3 — Some flexibility | suggested: 1 variant axis and 0 component properties. |
| System Fit | 3/3 — Clearly extends and improves the system | suggested: No overlap with the 11 other local components. Library components aren't checked. |
| Value | — | not scored |
| Evidence | — | not scored |

**Total: incomplete** — still to score: Value, Evidence

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
<tr><td>orientation</td><td><code>VARIANT</code></td><td><code>horizontal</code></td><td>No</td><td>-</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>orientation</td><td><code>horizontal</code> <code>vertical</code></td><td><code>horizontal</code></td></tr>
</tbody>
</table>

## States

- `default`

## Design Tokens

| Metric | Count |
|--------|-------|
| Total items | 11 |
| Design tokens | 11 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#2c2c2c"></span>`Background/Brand/Default` → #2c2c2c — Using Background/Brand/Default token
- <span class="swatch" style="background:#f5f5f5"></span>`Icon/Brand/On Brand` → #f5f5f5 — Using Icon/Brand/On Brand token
- <span class="swatch" style="background:#1e1e1e"></span>`Text/Default/Default` → #1e1e1e — Using Text/Default/Default token
- <span class="swatch" style="background:#757575"></span>`Text/Default/Secondary` → #757575 — Using Text/Default/Secondary token

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
- `Radius/100` → 4px — Using Radius/100 token

## Accessibility · ARIA

<table>
<thead><tr><th>Item</th><th>Element</th><th>Role</th><th>States → ARIA</th><th>Keyboard</th><th>Accessible name</th></tr></thead>
<tbody>
<tr><td>Checkbox Group</td><td><code>&lt;input type=&quot;checkbox|radio&quot;&gt;</code></td><td>checkbox, radio, or switch (role=&quot;switch&quot;)</td><td>Selected → <code>checked</code> / <code>aria-checked</code>=&quot;true|false|mixed&quot;<br>Disabled → <code>disabled</code></td><td>Space toggles; radios move with arrow keys</td><td><code>&lt;label for&gt;</code> wrapping or pointing at the input</td></tr>
<tr><td>Checkbox Field</td><td><code>&lt;input type=&quot;checkbox|radio&quot;&gt;</code></td><td>checkbox, radio, or switch (role=&quot;switch&quot;)</td><td>Selected → <code>checked</code> / <code>aria-checked</code>=&quot;true|false|mixed&quot;<br>Disabled → <code>disabled</code></td><td>Space toggles; radios move with arrow keys</td><td><code>&lt;label for&gt;</code> wrapping or pointing at the input</td></tr>
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

**Score:** 11/14 (79%)

| Rule | Status | Details |
|------|--------|---------|
| Hover, Focus and Disabled states | ❌ Fail | Missing state: Hover, Focus, Disabled — a visible focus state is required (WCAG 2.4.7) |
| Text contrast ≥ 4.5:1 (3:1 large) | ⚠️ Warning | 20 text layers with unmeasurable contrast: 'Label' (no solid fill behind the text), 'Description' (no solid fill behind the text), 'Label' (no solid fill behind the text), … — not measurable, check manually |
| Ruby font (Fira Sans) | ⚠️ Warning | 20 text layers not using Fira Sans: 'Label' Inter, 'Description' Inter, 'Label' Inter, … |
| Spacing on Ruby spacing scale | ⚠️ Warning | 10 layers off the Ruby spacing scale: 'Checkbox' padding 0/0/0/0, gap 10, 'Checkbox' padding 0/0/0/0, gap 10, 'Checkbox' padding 0/0/0/0, gap 10, … |
| Real copy, not placeholders | ⚠️ Warning | 10 text layers use placeholder copy ('Label'). Use real words such as "Save profile" so examples read like the product |

> AI opinions not available: the AI response had no platform opinions

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ⚠️ Warning | Add a component description to help MCP and AI understand the component purpose and usage |

## AI Interpretation (Readiness score: 82%)

**What AI Reads Well:**
- Has 1 configurable properties
- Uses design tokens for consistency

**Where AI Gets Confused:**
- Missing component description - AI cannot understand component purpose and intent
- Limited customization options - consider adding more properties for flexibility

**How to Improve AI Understanding:**
- Add a descriptive explanation in component properties to help AI understand the component's purpose, behavior, and usage patterns

**What AI Would Generate:**
Consider additional properties for greater flexibility.

---

*Generated by RubyLint — 11/24/2026*
