# Select Field

> **Design System Readiness: 97%**

A dropdown select with a label, optional description, a value row with a chevron, and an expandable options list. Ten variants cover five states crossed with two value types, plus boolean toggles for label, description and error text.

### Purpose

Lets a user pick one value from a list of options. The field shows the current value, or placeholder text when nothing has been chosen yet.

### Behaviour

State covers Default, Hover, Focus, Error and Disabled. The Open boolean controls whether the Options panel is shown below the field; Default, Error, Hover and Focus variants include an Options frame, while the Disabled variants do not. Focus adds a Stroke/Focus Ring with Border/Focus/Default. Error swaps the border to Border/Danger/Default and reveals the Error text in Text/Danger/Default. Disabled uses Background/Disabled/Default, Border/Disabled/default, Text/Disabled/Default and Icon/Disabled/On Disabled. Value Type switches the value text between a real selection and placeholder styling.

### Composition

One nested instance, Chevron down, sits at the right of the Select frame. The Options frame holds five child layers for the open list. Code generators should look for an existing chevron or icon component and an existing option/list item component in the codebase before building new ones.

### Usage

Use for a single choice from a known, moderate list of options. For two or three options use radio buttons instead. For free text or a filterable list use a text input or combobox. Keep the label on and use Description for guidance that applies before the user picks, and Error for validation feedback after.

### Code Generation Notes

Map the Open boolean to the expanded state of the listbox, not to a separate component. Keep Label, Description, Value and Error as text slots. The Options frame in the design is static, so option rendering, keyboard navigation, type-ahead, selected and active option styling, and closing on outside click all need to be added in code. Wire the label to the control, link the description and error text by id, and set an invalid flag when State is Error. Disabled should block focus and the open interaction. Reuse the existing chevron icon and apply a rotation or swap on open.

## Design System Adoption

| Criterion | Score | Basis |
|-----------|-------|-------|
| Reuse | 3/3 — Needed across teams or products | set manually |
| Pattern Strength | 3/3 — Clear, reusable pattern with variants | suggested: 2 variant axes and 8 component properties. |
| System Fit | 3/3 — Clearly extends and improves the system | suggested: No overlap with the 11 other local components. Library components aren't checked. |
| Value | 3/3 — Saves time, reduces duplication, or solves a clear problem | set manually |
| Evidence | 3/3 — Proven need (multiple teams or repeated implementations) | set manually |

**Total: 15/15** (13–15) — Add to the design system

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>State</td><td><code>Default</code> <code>Error</code> <code>Disabled</code> <code>Hover</code> <code>Focus</code></td></tr>
<tr><td>Value Type</td><td><code>Default</code> <code>Placeholder</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Has Label</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>Shows the label above the field</td></tr>
<tr><td>Has Error</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>Shows the error message below the field</td></tr>
<tr><td>Label</td><td><code>TEXT</code></td><td><code>Label</code></td><td>No</td><td>Label text content</td></tr>
<tr><td>Error</td><td><code>TEXT</code></td><td><code>Error</code></td><td>No</td><td>Error message text content</td></tr>
<tr><td>Open</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>Shows or hides the Options panel below the field</td></tr>
<tr><td>Description</td><td><code>TEXT</code></td><td><code>Description</code></td><td>No</td><td>Helper text content</td></tr>
<tr><td>Has Description</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>Shows the helper description under the label</td></tr>
<tr><td>Value</td><td><code>TEXT</code></td><td><code>Value</code></td><td>No</td><td>Selected value or placeholder text in the field</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>Visual and interaction state of the field</td></tr>
<tr><td>Value Type</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>Whether the value row shows a chosen value or placeholder text</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Has Label</td><td><code>true</code> <code>false</code></td><td><code>true</code></td></tr>
<tr><td>Has Error</td><td><code>true</code> <code>false</code></td><td><code>true</code></td></tr>
<tr><td>Label</td><td><code>Label</code></td><td><code>Label</code></td></tr>
<tr><td>Error</td><td><code>Error</code></td><td><code>Error</code></td></tr>
<tr><td>Open</td><td><code>true</code> <code>false</code></td><td><code>false</code></td></tr>
<tr><td>Description</td><td><code>Description</code></td><td><code>Description</code></td></tr>
<tr><td>Has Description</td><td><code>true</code> <code>false</code></td><td><code>false</code></td></tr>
<tr><td>Value</td><td><code>Value</code></td><td><code>Value</code></td></tr>
<tr><td>State</td><td><code>Default</code> <code>Error</code> <code>Disabled</code> <code>Hover</code> <code>Focus</code></td><td><code>Default</code></td></tr>
<tr><td>Value Type</td><td><code>Default</code> <code>Placeholder</code></td><td><code>Default</code></td></tr>
</tbody>
</table>

## States

- ✅ `Default`
- ✅ `Error`
- ✅ `Disabled`
- ✅ `Hover`
- ✅ `Focus`

## Design Tokens

| Metric | Count |
|--------|-------|
| Total items | 32 |
| Design tokens | 32 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#1e1e1e"></span>`Text/Default/Default` → #1e1e1e — Using Text/Default/Default token
- <span class="swatch" style="background:#757575"></span>`Text/Default/Secondary` → #757575 — Using Text/Default/Secondary token
- <span class="swatch" style="background:#ffffff"></span>`Background/Default/Default` → #ffffff — Using Background/Default/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Border/Default/Default` → #d9d9d9 — Using Border/Default/Default token
- <span class="swatch" style="background:#1e1e1e"></span>`Icon/Default/Default` → #1e1e1e — Using Icon/Default/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Default/Tertiary` → #b3b3b3 — Using Text/Default/Tertiary token
- <span class="swatch" style="background:#900b09"></span>`Border/Danger/Default` → #900b09 — Using Border/Danger/Default token
- <span class="swatch" style="background:#900b09"></span>`Text/Danger/Default` → #900b09 — Using Text/Danger/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Disabled/Default` → #b3b3b3 — Using Text/Disabled/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Disabled/Default` → #d9d9d9 — Using Background/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Border/Disabled/default` → #b3b3b3 — Using Border/Disabled/default token
- <span class="swatch" style="background:#b3b3b3"></span>`Icon/Disabled/On Disabled` → #b3b3b3 — Using Icon/Disabled/On Disabled token
- <span class="swatch" style="background:#ec221f"></span>`Border/Focus/Default` → #ec221f — Using Border/Focus/Default token

### Spacing

**Tokens in use:**
- `Space/200` → 8px — Using Space/200 token
- `Space/300` → 12px — Using Space/300 token
- `Space/400` → 16px — Using Space/400 token

### Typography

**Tokens in use:**
- `Body Base` → unresolved — Using Body Base token
- `Body/Font Family` → Inter — Using Body/Font Family token
- `Body/Font Weight Regular` → 400 — Using Body/Font Weight Regular token
- `Body/Size Medium` → 16px — Using Body/Size Medium token
- `Single Line/Body Base` → unresolved — Using Single Line/Body Base token
- `Body Strong` → unresolved — Using Body Strong token
- `Body/Font Weight Strong` → 600 — Using Body/Font Weight Strong token

### Effects

**Tokens in use:**
- `Drop Shadow/200` → unresolved — Using Drop Shadow/200 token
- <span class="swatch" style="background:#0c0c0d"></span>`Black/100` → #0c0c0d — Using Black/100 token
- <span class="swatch" style="background:#0c0c0d"></span>`Black/200` → #0c0c0d — Using Black/200 token
- `Depth/0` → 0 — Using Depth/0 token
- `Depth/025` → 1 — Using Depth/025 token
- `Depth/100` → 4 — Using Depth/100 token

### Borders

**Tokens in use:**
- `Stroke/Border` → 1px — Using Stroke/Border token
- `Radius/200` → 8px — Using Radius/200 token
- `Stroke/Focus Ring` → 2px — Using Stroke/Focus Ring token

## Accessibility · ARIA

<table>
<thead><tr><th>Item</th><th>Element</th><th>Role</th><th>States → ARIA</th><th>Keyboard</th><th>Accessible name</th></tr></thead>
<tbody>
<tr><td>Select Field</td><td><code>&lt;select&gt; (or role=&quot;combobox&quot; + listbox)</code></td><td>combobox</td><td>Open → <code>aria-expanded</code>=&quot;true&quot; + <code>aria-controls</code> → listbox id<br>Disabled → <code>disabled</code><br>Error → <code>aria-invalid</code>=&quot;true&quot; + <code>aria-describedby</code></td><td>Arrow keys move, Enter selects, Esc closes</td><td><code>&lt;label for&gt;</code> or <code>aria-labelledby</code></td></tr>
</tbody>
</table>

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Accessibility

### Accessibility Audit

| Check | Status | Details |
|-------|--------|---------|
| Touch target size | ✅ Pass | Target size 120×70px meets recommended 44px minimum (smallest variant: "State=Default, Value Type=Default") |
| Focus state | ✅ Pass | Component has a focus state for keyboard navigation |
| Minimum font size | ✅ Pass | Smallest text is 16px, meets readability guidelines |
| Color contrast | ❌ Fail | "Value" has 1.5:1 contrast, below WCAG AA minimum of 3:1. 22 text layers not measurable: "Label" (no solid fill behind the text), "Description" (no solid fill behind the text), "Label" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 12/14 (86%)

| Rule | Status | Details |
|------|--------|---------|
| Text contrast ≥ 4.5:1 (3:1 large) | ❌ Fail | 6 text layers below contrast minimum: 'Value' 2.1:1, 'Value' 2.1:1, 'Value' 1.49:1, … |
| Ruby font (Fira Sans) | ⚠️ Warning | 22 text layers not using Fira Sans: 'Label' Inter, 'Value' Inter, 'Label' Inter, … |
| Real copy, not placeholders | ⚠️ Warning | 20 text layers use placeholder copy ('Label', 'Value'). Use real words such as "Save profile" so examples read like the product |

### AI opinion (not scored)

- **Works at narrow widths** (warning): Confirm long values and option labels wrap or truncate at 320px instead of forcing the field wider.
- **Clear headings and structure** (pass): Keep the order label, description, field, error so reading and focus order match the visual stack.
- **Links vs buttons** (pass): The field reads as a control rather than a link; make sure the label, not the placeholder, names it.
- **Not colour alone** (pass): The error state adds message text alongside the red border, so meaning is not colour only.

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ✅ Pass | Component has description for MCP/AI context |

## AI Interpretation (Readiness score: 97%)

**What AI Reads Well:**
- Has component description for better MCP/AI context
- Has 10 configurable properties
- Uses design tokens for consistency

---

*Generated by RubyLint — 11/24/2026*
