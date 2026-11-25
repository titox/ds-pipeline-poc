# Radio Field

> **Design System Readiness: 97%**

A single radio choice with a label, an optional description line and an optional error line, drawn as ten variants across five states and two value types.

### Purpose

Lets a person pick one option from a set of mutually exclusive choices. Each instance is one option in that set, with supporting text under the label when the label alone is not enough.

### Behaviour

Default, Hover, Focus, Disabled and Error are drawn. Hover changes the radio fill, using Background/Brand/Secondary Hover when checked and Background/Default/Default Hover when unchecked. Focus adds a ring built from Stroke/Focus Ring and Border/Focus/Default. Disabled swaps fill, border, icon and text to Background/Disabled/Default, Border/Disabled/default, Icon/Disabled/Default and Text/Disabled/Default. Error recolours the radio border with Border/Danger/Default, and the error line under the description uses Text/Danger/Default. Checked and Unchecked are a design-file property only. The component does not toggle its own selection.

### Composition

No nested component instances were detected. Each variant is plain frames and text: a "Checkbox and Label" row holding the "Radio" frame and the "Label" text, a "Description Row" holding a "Space" spacer and the "Description" text, and an "Error Row", hidden by default, holding a "Space" spacer and the "Error" text. AI code generators should still check the development codebase for an existing radio input, label and helper text primitive before writing new ones.

### Usage

Use for one-of-many selection where every option stays visible. Use a checkbox field when more than one answer can be picked, and a select when the list runs long. Turn Has Description off when the label is clear on its own, so the spacer row does not leave dead space.

### Code Generation Notes

Render a native input of type radio with a shared name attribute per group, and bind the label with a for attribute or a wrapping label. Attach the description with aria-describedby. Do not model Checked as a prop on the field, derive it from the group value. Hover and Focus should come from CSS pseudo-classes, with :focus-visible so the ring only appears for keyboard users. Disabled must set the disabled attribute, not only the disabled colour tokens. Error sets aria-invalid and reveals the Error text when Has Error is on. Arrow key roving focus inside the group is standard radio behaviour and is not drawn in the file.

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
<tr><td>Value Type</td><td><code>Unchecked</code> <code>Checked</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Has Description</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>Shows or hides the Description Row under the label.</td></tr>
<tr><td>Description</td><td><code>TEXT</code></td><td><code>Description</code></td><td>No</td><td>Supporting text under the label.</td></tr>
<tr><td>Label</td><td><code>TEXT</code></td><td><code>Label</code></td><td>No</td><td>The option text next to the radio.</td></tr>
<tr><td>Has Error</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>Shows or hides the Error Row under the description.</td></tr>
<tr><td>Error</td><td><code>TEXT</code></td><td><code>Error</code></td><td>No</td><td>The error message text shown when Has Error is on.</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>Visual state of the radio and its text, covering rest, pointer, keyboard focus, disabled and invalid.</td></tr>
<tr><td>Value Type</td><td><code>VARIANT</code></td><td><code>Checked</code></td><td>No</td><td>Whether the radio is drawn filled or empty. A design-file switch only, since selection comes from the group value in code.</td></tr>
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
<tr><td>Value Type</td><td><code>Unchecked</code> <code>Checked</code></td><td><code>Checked</code></td></tr>
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
| Total items | 25 |
| Design tokens | 25 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#e6e6e6"></span>`Background/Brand/Secondary` → #e6e6e6 — Using Background/Brand/Secondary token
- <span class="swatch" style="background:#2c2c2c"></span>`Border/Brand/Default` → #2c2c2c — Using Border/Brand/Default token
- <span class="swatch" style="background:#1e1e1e"></span>`Icon/Brand/On Brand Secondary` → #1e1e1e — Using Icon/Brand/On Brand Secondary token
- <span class="swatch" style="background:#1e1e1e"></span>`Text/Default/Default` → #1e1e1e — Using Text/Default/Default token
- <span class="swatch" style="background:#757575"></span>`Text/Default/Secondary` → #757575 — Using Text/Default/Secondary token
- <span class="swatch" style="background:#900b09"></span>`Text/Danger/Default` → #900b09 — Using Text/Danger/Default token
- <span class="swatch" style="background:#ffffff"></span>`Background/Default/Default` → #ffffff — Using Background/Default/Default token
- <span class="swatch" style="background:#757575"></span>`Border/Brand/Tertiary` → #757575 — Using Border/Brand/Tertiary token
- <span class="swatch" style="background:#f5f5f5"></span>`Icon/Brand/On Brand` → #f5f5f5 — Using Icon/Brand/On Brand token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Disabled/Default` → #d9d9d9 — Using Background/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Border/Disabled/default` → #b3b3b3 — Using Border/Disabled/default token
- <span class="swatch" style="background:#b3b3b3"></span>`Icon/Disabled/Default` → #b3b3b3 — Using Icon/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Disabled/Default` → #b3b3b3 — Using Text/Disabled/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Brand/Secondary Hover` → #d9d9d9 — Using Background/Brand/Secondary Hover token
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
| Color contrast | ⚠️ Warning | 30 text layers not measurable: "Label" (no solid fill behind the text), "Description" (no solid fill behind the text), "Error" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 12.5/14 (89%)

| Rule | Status | Details |
|------|--------|---------|
| Text contrast ≥ 4.5:1 (3:1 large) | ⚠️ Warning | 20 text layers with unmeasurable contrast: 'Label' (no solid fill behind the text), 'Description' (no solid fill behind the text), 'Label' (no solid fill behind the text), … — not measurable, check manually |
| Ruby font (Fira Sans) | ⚠️ Warning | 20 text layers not using Fira Sans: 'Label' Inter, 'Description' Inter, 'Label' Inter, … |
| Real copy, not placeholders | ⚠️ Warning | 10 text layers use placeholder copy ('Label'). Use real words such as "Save profile" so examples read like the product |

### AI opinion (not scored)

- **Clear headings and structure** (warning): Add a group wrapper with a shared legend in the design file so reading order starts with the question, not the first option.
- **Works at narrow widths** (warning): Confirm the label and description wrap onto several lines at 320px while the radio stays aligned to the first line.
- **Links vs buttons** (pass): No links or buttons are drawn, so there is nothing to confuse with the choice control.
- **Not colour alone** (pass): Error adds a written message under the description, so the red border is not the only signal.

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
