# Input Field

> **Design System Readiness: 97%**

A single-line text entry built as a variant set of ten combinations: five states crossed with two value types. Label, description and error message are each optional through boolean properties.

### Purpose

Collects short free text such as a name, email address or postcode. The field groups a label, an optional description, the input box itself and an optional error message in one vertical stack.

### Behaviour

The State property covers Default, Hover, Focus, Error and Disabled. Hover and Focus change the border treatment, Focus adds a focus ring, Error switches the border and message text to the danger colours, and Disabled uses the disabled background, border and text tokens. Value Type switches the input text between real content (Default) and placeholder styling (Placeholder), which uses the tertiary text colour. Note that State=Error and Has Error are separate controls, so both need setting for a complete error presentation.

### Composition

No nested component instances. The structure is plain text layers for Label, Description and Error, plus an Input frame containing the Value text. AI code generators should still check the development codebase for an existing input primitive before building a new one.

### Usage

Use for short single-line text. Use Textarea Field for multi-line input and Select Field for a fixed list of options. Keep the visible label on; a placeholder is not a substitute for a label. Add the description when the user needs guidance before typing, and the error message only when the field is invalid.

### Code Generation Notes

Map to <InputField> from primitives, or <Input> when Has Label is false. Hover and Focus are browser-driven, so do not encode them as props; expose state through disabled, invalid or similar flags. The label must be tied to the input with a for/id pair, the description and error linked by aria-describedby, and the input marked aria-invalid when in error. The error message needs a live region so it is announced. Placeholder styling comes from the ::placeholder selector, not a separate text layer.

## Design System Adoption

| Criterion | Score | Basis |
|-----------|-------|-------|
| Reuse | 3/3 — Needed across teams or products | set manually |
| Pattern Strength | 3/3 — Clear, reusable pattern with variants | suggested: 2 variant axes and 7 component properties. |
| System Fit | 3/3 — Clearly extends and improves the system | set manually |
| Value | 3/3 — Saves time, reduces duplication, or solves a clear problem | set manually |
| Evidence | 3/3 — Proven need (multiple teams or repeated implementations) | set manually |

**Total: 15/15** (13–15) — Add to the design system

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>State</td><td><code>Disabled</code> <code>Default</code> <code>Error</code> <code>Hover</code> <code>Focus</code></td></tr>
<tr><td>Value Type</td><td><code>Default</code> <code>Placeholder</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Has Label</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>Shows or hides the label above the input.</td></tr>
<tr><td>Has Error</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>Shows or hides the error message below the input.</td></tr>
<tr><td>Label</td><td><code>TEXT</code></td><td><code>Label</code></td><td>No</td><td>Label text for the field.</td></tr>
<tr><td>Error</td><td><code>TEXT</code></td><td><code>Error</code></td><td>No</td><td>Error message text shown when the field is invalid.</td></tr>
<tr><td>Has Description</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>Shows or hides the helper description between the label and the input.</td></tr>
<tr><td>Description</td><td><code>TEXT</code></td><td><code>Description</code></td><td>No</td><td>Helper text that explains what to enter.</td></tr>
<tr><td>Value</td><td><code>TEXT</code></td><td><code>Value</code></td><td>No</td><td>Text inside the input, used for both entered content and placeholder copy.</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>Visual state of the input box and its text.</td></tr>
<tr><td>Value Type</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>Switches the input text between entered content and placeholder styling.</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Has Label</td><td><code>true</code> <code>false</code></td><td><code>true</code></td></tr>
<tr><td>Has Error</td><td><code>true</code> <code>false</code></td><td><code>false</code></td></tr>
<tr><td>Label</td><td><code>Label</code></td><td><code>Label</code></td></tr>
<tr><td>Error</td><td><code>Error</code></td><td><code>Error</code></td></tr>
<tr><td>Has Description</td><td><code>true</code> <code>false</code></td><td><code>false</code></td></tr>
<tr><td>Description</td><td><code>Description</code></td><td><code>Description</code></td></tr>
<tr><td>Value</td><td><code>Value</code></td><td><code>Value</code></td></tr>
<tr><td>State</td><td><code>Disabled</code> <code>Default</code> <code>Error</code> <code>Hover</code> <code>Focus</code></td><td><code>Default</code></td></tr>
<tr><td>Value Type</td><td><code>Default</code> <code>Placeholder</code></td><td><code>Default</code></td></tr>
</tbody>
</table>

## States

- ✅ `Disabled`
- ✅ `Default`
- ✅ `Error`
- ✅ `Hover`
- ✅ `Focus`

## Design Tokens

| Metric | Count |
|--------|-------|
| Total items | 24 |
| Design tokens | 24 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#1e1e1e"></span>`Text/Default/Default` → #1e1e1e — Using Text/Default/Default token
- <span class="swatch" style="background:#757575"></span>`Text/Default/Secondary` → #757575 — Using Text/Default/Secondary token
- <span class="swatch" style="background:#ffffff"></span>`Background/Default/Default` → #ffffff — Using Background/Default/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Border/Default/Default` → #d9d9d9 — Using Border/Default/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Default/Tertiary` → #b3b3b3 — Using Text/Default/Tertiary token
- <span class="swatch" style="background:#900b09"></span>`Border/Danger/Default` → #900b09 — Using Border/Danger/Default token
- <span class="swatch" style="background:#900b09"></span>`Text/Danger/Default` → #900b09 — Using Text/Danger/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Disabled/Default` → #b3b3b3 — Using Text/Disabled/Default token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Disabled/Default` → #d9d9d9 — Using Background/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Border/Disabled/default` → #b3b3b3 — Using Border/Disabled/default token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Disabled/On Disabled` → #b3b3b3 — Using Text/Disabled/On Disabled token
- <span class="swatch" style="background:#757575"></span>`Border/Default/Secondary` → #757575 — Using Border/Default/Secondary token
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

### Borders

**Tokens in use:**
- `Stroke/Border` → 1px — Using Stroke/Border token
- `Radius/200` → 8px — Using Radius/200 token
- `Stroke/Focus Ring` → 2px — Using Stroke/Focus Ring token

## Accessibility · ARIA

<table>
<thead><tr><th>Item</th><th>Element</th><th>Role</th><th>States → ARIA</th><th>Keyboard</th><th>Accessible name</th></tr></thead>
<tbody>
<tr><td>Input Field</td><td><code>&lt;input&gt; + &lt;label for&gt;</code></td><td>textbox (implicit)</td><td>Disabled → <code>disabled</code><br>Error → <code>aria-invalid</code>=&quot;true&quot; + <code>aria-describedby</code> → error message id<br>Required → <code>required</code> / <code>aria-required</code>=&quot;true&quot;</td><td>Standard text editing; Tab moves on</td><td><code>&lt;label for&gt;</code> or <code>aria-labelledby</code> (placeholder is not a label)</td></tr>
</tbody>
</table>

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Accessibility

### Accessibility Audit

| Check | Status | Details |
|-------|--------|---------|
| Touch target size | ✅ Pass | Target size 120×70px meets recommended 44px minimum (smallest variant: "State=Default, Value Type=Placeholder") |
| Focus state | ✅ Pass | Component has a focus state for keyboard navigation |
| Minimum font size | ✅ Pass | Smallest text is 16px, meets readability guidelines |
| Color contrast | ❌ Fail | "Value" has 1.5:1 contrast, below WCAG AA minimum of 3:1. 30 text layers not measurable: "Label" (no solid fill behind the text), "Description" (no solid fill behind the text), "Error" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 11/13 (85%)

| Rule | Status | Details |
|------|--------|---------|
| Text contrast ≥ 4.5:1 (3:1 large) | ❌ Fail | 6 text layers below contrast minimum: 'Value' 2.1:1, 'Value' 2.1:1, 'Value' 1.49:1, … |
| Ruby font (Fira Sans) | ⚠️ Warning | 20 text layers not using Fira Sans: 'Label' Inter, 'Value' Inter, 'Label' Inter, … |
| Real copy, not placeholders | ⚠️ Warning | 20 text layers use placeholder copy ('Label', 'Value'). Use real words such as "Save profile" so examples read like the product |

### AI opinion (not scored)

- **Works at narrow widths** (warning): Confirm the label, description and error text wrap rather than truncate when the field is 320px wide.
- **Clear headings and structure** (pass): Label, description, input and error follow a logical top-to-bottom order; link the description and error to the input so screen readers pick them up.
- **Links vs buttons** (pass): No links or buttons are present in the field, so nothing is mistaken for a control.
- **Not colour alone** (pass): The error state pairs the danger border with a text message, so meaning is not carried by colour alone.

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ✅ Pass | Component has description for MCP/AI context |

## AI Interpretation (Readiness score: 97%)

**What AI Reads Well:**
- Has component description for better MCP/AI context
- Has 9 configurable properties
- Uses design tokens for consistency

---

*Generated by RubyLint — 11/24/2026*
