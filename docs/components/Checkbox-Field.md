# Checkbox Field

> **Design System Readiness: 97%**

A checkbox with a label, an optional description line and an optional error line. Five states and three value types combine into fifteen variants.

### Purpose

Lets people turn a single option on or off, or show a mixed selection, with supporting text underneath when the choice needs explaining and an error line when the input fails validation.

### Behaviour

State controls the visual treatment across Default, Hover, Focus, Disabled and Error. Focus applies Border/Focus/Default with Stroke/Focus Ring. Hover swaps the box fill to Background/Brand/Hover when selected and Background/Default/Default Hover when empty. Error applies Border/Danger/Default to the box and Text/Danger/Default to the error line. Value Type switches the box between empty, a Check glyph and a Minus glyph, with Background/Brand/Default filling the box when selected or indeterminate. Disabled variants use Background/Disabled/Default, Border/Disabled/default, Icon/Disabled/On Disabled and Text/Disabled/Default.

### Composition

Each variant holds a Checkbox and Label row (the Checkbox frame with its glyph, plus a Label text layer), a Description Row and an Error Row, each made of a Space spacer and a text layer that aligns the text under the label. The Check and Minus icon instances are nested components. Code generators should look for existing Check and Minus icon components in the codebase before building new ones.

### Usage

Use for independent on/off choices and for parent rows in a nested list, where Indeterminate signals that only some children are selected. Use a radio group when options are mutually exclusive, and a switch when the change applies immediately. Turn Has Description off when the label is self-explanatory, and turn Has Error on only while the field is invalid.

### Code Generation Notes

Render as an input of type checkbox with a real label element rather than a styled div. Indeterminate cannot be set in HTML markup, so set the DOM property in script. Hover, Focus and Error are visual states and should come from CSS pseudo-classes and validation state, not variant props. Link the description and the error text with aria-describedby and set aria-invalid when the error is shown. Disabled variants should set the disabled attribute so clicks and focus are blocked, and the whole row including the label should be clickable.

## Design System Adoption

| Criterion | Score | Basis |
|-----------|-------|-------|
| Reuse | 3/3 — Needed across teams or products | set manually |
| Pattern Strength | 3/3 — Clear, reusable pattern with variants | suggested: 2 variant axes and 5 component properties. |
| System Fit | 3/3 — Clearly extends and improves the system | suggested: No overlap with the 11 other local components. Library components aren't checked. |
| Value | 3/3 — Saves time, reduces duplication, or solves a clear problem | set manually |
| Evidence | 3/3 — Proven need (multiple teams or repeated implementations) | set manually |

**Total: 15/15** (13–15) — Add to the design system

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>State</td><td><code>Default</code> <code>Disabled</code> <code>Hover</code> <code>Focus</code> <code>Error</code></td></tr>
<tr><td>Value Type</td><td><code>Unchecked</code> <code>Checked</code> <code>Indeterminate</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Has Description</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>Shows or hides the Description Row under the label.</td></tr>
<tr><td>Description</td><td><code>TEXT</code></td><td><code>Description</code></td><td>No</td><td>The supporting line under the label.</td></tr>
<tr><td>Label</td><td><code>TEXT</code></td><td><code>Label</code></td><td>No</td><td>The label text sitting beside the box.</td></tr>
<tr><td>Has Error</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>Shows or hides the Error Row under the label.</td></tr>
<tr><td>Error</td><td><code>TEXT</code></td><td><code>Error</code></td><td>No</td><td>The validation message under the label.</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>Visual treatment of the box, label and supporting text.</td></tr>
<tr><td>Value Type</td><td><code>VARIANT</code></td><td><code>Checked</code></td><td>No</td><td>Whether the box is empty, shows the Check glyph or shows the Minus glyph for a mixed selection.</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Has Description</td><td><code>true</code> <code>false</code></td><td><code>true</code></td></tr>
<tr><td>Description</td><td><code>Description</code></td><td><code>Description</code></td></tr>
<tr><td>Label</td><td><code>Label</code></td><td><code>Label</code></td></tr>
<tr><td>Has Error</td><td><code>true</code> <code>false</code></td><td><code>false</code></td></tr>
<tr><td>Error</td><td><code>Error</code></td><td><code>Error</code></td></tr>
<tr><td>State</td><td><code>Default</code> <code>Disabled</code> <code>Hover</code> <code>Focus</code> <code>Error</code></td><td><code>Default</code></td></tr>
<tr><td>Value Type</td><td><code>Unchecked</code> <code>Checked</code> <code>Indeterminate</code></td><td><code>Checked</code></td></tr>
</tbody>
</table>

## States

- ✅ `Default`
- ✅ `Disabled`
- ✅ `Hover`
- ✅ `Focus`
- ✅ `Error`

## Design Tokens

| Metric | Count |
|--------|-------|
| Total items | 24 |
| Design tokens | 24 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#2c2c2c"></span>`Background/Brand/Default` → #2c2c2c — Using Background/Brand/Default token
- <span class="swatch" style="background:#f5f5f5"></span>`Icon/Brand/On Brand` → #f5f5f5 — Using Icon/Brand/On Brand token
- <span class="swatch" style="background:#1e1e1e"></span>`Text/Default/Default` → #1e1e1e — Using Text/Default/Default token
- <span class="swatch" style="background:#757575"></span>`Text/Default/Secondary` → #757575 — Using Text/Default/Secondary token
- <span class="swatch" style="background:#900b09"></span>`Text/Danger/Default` → #900b09 — Using Text/Danger/Default token
- <span class="swatch" style="background:#ffffff"></span>`Background/Default/Default` → #ffffff — Using Background/Default/Default token
- <span class="swatch" style="background:#757575"></span>`Border/Brand/Tertiary` → #757575 — Using Border/Brand/Tertiary token
- <span class="swatch" style="background:#2c2c2c"></span>`Icon/Brand/Default` → #2c2c2c — Using Icon/Brand/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Disabled/Default` → #d9d9d9 — Using Background/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Border/Disabled/default` → #b3b3b3 — Using Border/Disabled/default token
- <span class="swatch" style="background:#b3b3b3"></span>`Icon/Disabled/On Disabled` → #b3b3b3 — Using Icon/Disabled/On Disabled token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Disabled/Default` → #b3b3b3 — Using Text/Disabled/Default token
- <span class="swatch" style="background:#1e1e1e"></span>`Background/Brand/Hover` → #1e1e1e — Using Background/Brand/Hover token
- <span class="swatch" style="background:#f5f5f5"></span>`Background/Default/Default Hover` → #f5f5f5 — Using Background/Default/Default Hover token
- <span class="swatch" style="background:#ec221f"></span>`Border/Focus/Default` → #ec221f — Using Border/Focus/Default token
- <span class="swatch" style="background:#900b09"></span>`Border/Danger/Default` → #900b09 — Using Border/Danger/Default token

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
- `Stroke/Focus Ring` → 2px — Using Stroke/Focus Ring token

## Accessibility · ARIA

<table>
<thead><tr><th>Item</th><th>Element</th><th>Role</th><th>States → ARIA</th><th>Keyboard</th><th>Accessible name</th></tr></thead>
<tbody>
<tr><td>Checkbox Field</td><td><code>&lt;input type=&quot;checkbox|radio&quot;&gt;</code></td><td>checkbox, radio, or switch (role=&quot;switch&quot;)</td><td>Selected → <code>checked</code> / <code>aria-checked</code>=&quot;true|false|mixed&quot;<br>Disabled → <code>disabled</code></td><td>Space toggles; radios move with arrow keys</td><td><code>&lt;label for&gt;</code> wrapping or pointing at the input</td></tr>
</tbody>
</table>

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Accessibility

### Accessibility Audit

| Check | Status | Details |
|-------|--------|---------|
| Touch target size | ✅ Pass | Target size 120×44px meets recommended 44px minimum (smallest variant: "State=Default, Value Type=Checked") |
| Focus state | ✅ Pass | Component has a focus state for keyboard navigation |
| Minimum font size | ✅ Pass | Smallest text is 16px, meets readability guidelines |
| Color contrast | ⚠️ Warning | 45 text layers not measurable: "Label" (no solid fill behind the text), "Description" (no solid fill behind the text), "Error" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 12/14 (86%)

| Rule | Status | Details |
|------|--------|---------|
| Text contrast ≥ 4.5:1 (3:1 large) | ⚠️ Warning | 30 text layers with unmeasurable contrast: 'Label' (no solid fill behind the text), 'Description' (no solid fill behind the text), 'Label' (no solid fill behind the text), … — not measurable, check manually |
| Ruby font (Fira Sans) | ⚠️ Warning | 30 text layers not using Fira Sans: 'Label' Inter, 'Description' Inter, 'Label' Inter, … |
| Spacing on Ruby spacing scale | ⚠️ Warning | 15 layers off the Ruby spacing scale: 'Checkbox' padding 0/0/0/0, gap 10, 'Checkbox' padding 0/0/0/0, gap 10, 'Checkbox' padding 0/0/0/0, gap 10, … |
| Real copy, not placeholders | ⚠️ Warning | 15 text layers use placeholder copy ('Label'). Use real words such as "Save profile" so examples read like the product |

### AI opinion (not scored)

- **Works at narrow widths** (warning): Confirm the label and description wrap to multiple lines at 320px rather than truncating beside the box.
- **Clear headings and structure** (pass): Box, label, description and error follow a logical top to bottom reading order for the field.
- **Links vs buttons** (pass): No navigation elements appear in the row, so there is nothing to confuse with a link.
- **Not colour alone** (pass): Selection is shown by the Check and Minus glyphs and errors by the Error Row text, not by colour alone.

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ✅ Pass | Component has description for MCP/AI context |

## AI Interpretation (Readiness score: 97%)

**What AI Reads Well:**
- Has component description for better MCP/AI context
- Has 7 configurable properties
- Uses design tokens for consistency

---

*Generated by RubyLint — 11/25/2026*
