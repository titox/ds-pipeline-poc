# Radio Field

> **Design System Readiness: 96%**

A single radio choice with a label and an optional description line, built as eight variants covering four states and two value types. Checked and Unchecked exist as a design-file property only; in code the state comes from the group value.

### Purpose

Lets a person pick one option from a set of mutually exclusive choices. Each instance is one option, with supporting description text underneath the label for extra context.

### Behaviour

Four states are drawn: Default, Hover, Focus and Disabled. Hover signals pointer targeting, Focus adds a focus ring using Stroke/Focus Ring and Border/Focus/Default, and Disabled swaps all fills, borders, icon and text to the disabled token set. Selection is not toggled by the component itself. Radio fields are grouped in code and the group value decides which one renders as checked.

### Composition

No nested component instances were detected. Each variant is built from plain frames and text layers: a "Checkbox and Label" row holding the "Radio" frame and the "Label" text, then a "Description Row" holding a "Space" spacer frame and the "Description" text. AI code generators should still check the development codebase for an existing radio input, label and helper text primitive before writing new ones.

### Usage

Use for one-of-many selection where all options should be visible at once. Use a checkbox field when more than one choice can be selected, and a select or dropdown when the list is long. Turn Has Description off when the label alone is clear enough, so the spacer row does not add dead space.

### Code Generation Notes

Render a native input of type radio with a shared name attribute per group, and bind the label with a for or wrapping label element. Attach the description with aria-describedby. Do not model Checked as a prop on the field itself; derive it from the group value. Hover and Focus should come from CSS pseudo-classes rather than separate components, and Focus should use :focus-visible so the ring only shows for keyboard users. Disabled must set the disabled attribute, not just the disabled colour tokens. Arrow key roving focus within the group is standard radio behaviour and is not visible in the design file.

## Design System Adoption

| Criterion | Score | Basis |
|-----------|-------|-------|
| Reuse | 3/3 — Needed across teams or products | set manually |
| Pattern Strength | 3/3 — Clear, reusable pattern with variants | suggested: 2 variant axes and 3 component properties. |
| System Fit | 3/3 — Clearly extends and improves the system | suggested: No overlap with the 11 other local components. Library components aren't checked. |
| Value | 3/3 — Saves time, reduces duplication, or solves a clear problem | set manually |
| Evidence | 3/3 — Proven need (multiple teams or repeated implementations) | set manually |

**Total: 15/15** (13–15) — Add to the design system

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>State</td><td><code>Default</code> <code>Disabled</code> <code>Hover</code> <code>Focus</code></td></tr>
<tr><td>Value Type</td><td><code>Unchecked</code> <code>Checked</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Has Description</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>Shows or hides the description row beneath the label.</td></tr>
<tr><td>Description</td><td><code>TEXT</code></td><td><code>Description</code></td><td>No</td><td>Supporting text under the label, indented to align past the radio.</td></tr>
<tr><td>Label</td><td><code>TEXT</code></td><td><code>Label</code></td><td>No</td><td>The option text sat beside the radio.</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>Visual state of the field, including the focus ring and the disabled colour set.</td></tr>
<tr><td>Value Type</td><td><code>VARIANT</code></td><td><code>Checked</code></td><td>No</td><td>Whether the radio is drawn filled with the inner dot or empty. Design-file only; code derives this from the group value.</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Has Description</td><td><code>true</code> <code>false</code></td><td><code>true</code></td></tr>
<tr><td>Description</td><td><code>Description</code></td><td><code>Description</code></td></tr>
<tr><td>Label</td><td><code>Label</code></td><td><code>Label</code></td></tr>
<tr><td>State</td><td><code>Default</code> <code>Disabled</code> <code>Hover</code> <code>Focus</code></td><td><code>Default</code></td></tr>
<tr><td>Value Type</td><td><code>Unchecked</code> <code>Checked</code></td><td><code>Checked</code></td></tr>
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
| Total items | 21 |
| Design tokens | 21 |
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
- <span class="swatch" style="background:#ec221f"></span>`Border/Focus/Default` → #ec221f — Using Border/Focus/Default token

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
- `Stroke/Focus Ring` → 2px — Using Stroke/Focus Ring token

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
| Focus state | ✅ Pass | Component has a focus state for keyboard navigation |
| Minimum font size | ✅ Pass | Smallest text is 16px, meets readability guidelines |
| Color contrast | ⚠️ Warning | 16 text layers not measurable: "Label" (no solid fill behind the text), "Description" (no solid fill behind the text), "Label" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 12.5/14 (89%)

| Rule | Status | Details |
|------|--------|---------|
| Text contrast ≥ 4.5:1 (3:1 large) | ⚠️ Warning | 16 text layers with unmeasurable contrast: 'Label' (no solid fill behind the text), 'Description' (no solid fill behind the text), 'Label' (no solid fill behind the text), … — not measurable, check manually |
| Ruby font (Fira Sans) | ⚠️ Warning | 16 text layers not using Fira Sans: 'Label' Inter, 'Description' Inter, 'Label' Inter, … |
| Real copy, not placeholders | ⚠️ Warning | 8 text layers use placeholder copy ('Label'). Use real words such as "Save profile" so examples read like the product |

### AI opinion (not scored)

- **Clear headings and structure** (warning): Document that these fields must sit inside a fieldset with a legend so the group question is announced before the options.
- **Works at narrow widths** (warning): Confirm the label and description wrap over multiple lines at 320px while staying aligned past the radio.
- **Links vs buttons** (pass): This is a form control rather than a link or button, and the label text names the choice directly.
- **Not colour alone** (pass): Selection is shown by the inner dot and focus by a visible ring, not by colour alone.

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ✅ Pass | Component has description for MCP/AI context |

## AI Interpretation (Readiness score: 96%)

**What AI Reads Well:**
- Has component description for better MCP/AI context
- Has 5 configurable properties
- Uses design tokens for consistency

---

*Generated by RubyLint — 11/24/2026*
