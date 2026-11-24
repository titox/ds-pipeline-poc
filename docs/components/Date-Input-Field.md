# Date Input Field

> **Design System Readiness: 96%**

A three-part date entry field with separate day, month and year boxes, wrapped by an optional label, description and error message. Ten variants cover five states (Default, Error, Disabled, Hover, Focus) against two value types (Default and Placeholder).

### Purpose

Captures a date as three short numeric segments rather than one free-text string. Each segment is its own input frame, so DD, MM and YYYY can be validated and focused independently. The label, description and error text are text properties, so the same component serves birth dates, expiry dates, start dates and so on.

### Behaviour

The State property carries the visual response to interaction. Hover and Focus change the border treatment, Focus uses Border/Focus/Default. Error swaps the border to Border/Danger/Default and reveals the Error text layer, which only exists in the two Error components. Disabled applies Background/Disabled/Default, Border/Disabled/default and Text/Disabled/Default across the group. Value Type switches between a filled value and placeholder text, with placeholder content sitting on Text/Default/Tertiary.

### Composition

No nested component instances were detected. The three Input frames inside the Inputs row are plain frames, each holding a single text layer. Label, Description and Error are direct text layers on the component. If the development codebase already has a text input or field wrapper, AI code generators should reuse it for the three segments and for the label and error slots rather than writing new markup.

### Usage

Use this when a date must be typed and the parts matter separately, for example validating a month before a day. Use a single text input with a date mask if the date is pasted or copied often. Use a calendar or picker when the user is choosing from a range or needs to see surrounding days. Keep Has Description off unless the format or constraint needs explaining, and reserve the Error state for a resolved validation failure.

### Code Generation Notes

Group the three segments in one fieldset with the label as its legend or an aria-labelledby reference, so screen readers announce one date field, not three unlabelled boxes. Auto-advance focus from DD to MM to YYYY once a segment is complete, and allow Backspace to step back. Accept pasted full dates into the first segment and split them. The Error state in Figma shows border colour plus a text message, so keep both and wire the message with aria-describedby and aria-invalid. Disabled must set the disabled attribute on all three inputs, not just the styling. Hover and Focus are CSS states and should not become props.

## Design System Adoption

| Criterion | Score | Basis |
|-----------|-------|-------|
| Reuse | 2/3 — Used in a few places | set manually |
| Pattern Strength | 2/3 — Some flexibility | set manually |
| System Fit | 2/3 — Could fit with some adjustments | suggested: Similar to "Date Picker Field", "Input Field". |
| Value | 2/3 — Moderate benefit | set manually |
| Evidence | 2/3 — Some examples | set manually |

**Total: 10/15** (10–12) — Refine or extend an existing component

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
<tr><td>Has Label</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>Shows or hides the label text above the inputs.</td></tr>
<tr><td>Has Error</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>Shows or hides the error message below the inputs.</td></tr>
<tr><td>Label</td><td><code>TEXT</code></td><td><code>Label</code></td><td>No</td><td>Label text content.</td></tr>
<tr><td>Error</td><td><code>TEXT</code></td><td><code>Error</code></td><td>No</td><td>Validation message content shown in the Error state.</td></tr>
<tr><td>Description</td><td><code>TEXT</code></td><td><code>Description</code></td><td>No</td><td>Helper text content, typically the expected date format.</td></tr>
<tr><td>Has Description</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>Shows or hides the helper description under the label.</td></tr>
<tr><td>Day</td><td><code>TEXT</code></td><td><code>DD</code></td><td>No</td><td>Content of the first segment.</td></tr>
<tr><td>Month</td><td><code>TEXT</code></td><td><code>MM</code></td><td>No</td><td>Content of the second segment.</td></tr>
<tr><td>Year</td><td><code>TEXT</code></td><td><code>YYYY</code></td><td>No</td><td>Content of the third segment.</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>Visual and interaction state of the whole field, including border, background and text colours.</td></tr>
<tr><td>Value Type</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>Whether the three segments show entered values or placeholder text.</td></tr>
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
<tr><td>Description</td><td><code>Description</code></td><td><code>Description</code></td></tr>
<tr><td>Has Description</td><td><code>true</code> <code>false</code></td><td><code>false</code></td></tr>
<tr><td>Day</td><td><code>DD</code></td><td><code>DD</code></td></tr>
<tr><td>Month</td><td><code>MM</code></td><td><code>MM</code></td></tr>
<tr><td>Year</td><td><code>YYYY</code></td><td><code>YYYY</code></td></tr>
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
| Total items | 21 |
| Design tokens | 21 |
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

## Accessibility · ARIA

<table>
<thead><tr><th>Item</th><th>Element</th><th>Role</th><th>States → ARIA</th><th>Keyboard</th><th>Accessible name</th></tr></thead>
<tbody>
<tr><td>Date Input Field</td><td><code>&lt;input&gt; + &lt;label for&gt;</code></td><td>textbox (implicit)</td><td>Disabled → <code>disabled</code><br>Error → <code>aria-invalid</code>=&quot;true&quot; + <code>aria-describedby</code> → error message id<br>Required → <code>required</code> / <code>aria-required</code>=&quot;true&quot;</td><td>Standard text editing; Tab moves on</td><td><code>&lt;label for&gt;</code> or <code>aria-labelledby</code> (placeholder is not a label)</td></tr>
</tbody>
</table>

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Accessibility

### Accessibility Audit

| Check | Status | Details |
|-------|--------|---------|
| Touch target size | ✅ Pass | Target size 240×70px meets recommended 44px minimum (smallest variant: "State=Default, Value Type=Default") |
| Focus state | ✅ Pass | Component has a focus state for keyboard navigation |
| Minimum font size | ✅ Pass | Smallest text is 16px, meets readability guidelines |
| Color contrast | ❌ Fail | "DD" has 1.5:1 contrast, below WCAG AA minimum of 3:1. 22 text layers not measurable: "Label" (no solid fill behind the text), "Description" (no solid fill behind the text), "Label" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 11.5/14 (82%)

| Rule | Status | Details |
|------|--------|---------|
| Text contrast ≥ 4.5:1 (3:1 large) | ❌ Fail | 18 text layers below contrast minimum: 'DD' 2.1:1, 'MM' 2.1:1, 'YYYY' 2.1:1, … |
| Ruby font (Fira Sans) | ⚠️ Warning | 42 text layers not using Fira Sans: 'Label' Inter, 'DD' Inter, 'MM' Inter, … |
| Labels in sentence case | ⚠️ Warning | 10 labels not in sentence case: 'YYYY' "YYYY", 'YYYY' "YYYY", 'YYYY' "YYYY", … |
| Real copy, not placeholders | ⚠️ Warning | 10 text layers use placeholder copy ('Label'). Use real words such as "Save profile" so examples read like the product |

### AI opinion (not scored)

- **Clear headings and structure** (warning): Wrap the three segments in a fieldset with the label as legend so the grouping and focus order are announced correctly.
- **Works at narrow widths** (warning): Check that the DD, MM and YYYY row wraps or shrinks rather than overflowing at 320px.
- **Links vs buttons** (pass): No links or buttons are present, so nothing is mislabelled.
- **Not colour alone** (pass): The Error state adds a text message alongside the red border, so meaning is not colour-only.

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ✅ Pass | Component has description for MCP/AI context |

## AI Interpretation (Readiness score: 96%)

**What AI Reads Well:**
- Has component description for better MCP/AI context
- Has 11 configurable properties
- Uses design tokens for consistency

---

*Generated by RubyLint — 11/24/2026*
