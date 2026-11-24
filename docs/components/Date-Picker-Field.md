# Date Picker Field

> **Design System Readiness: 97%**

A text field for entering or displaying a date, with a Calendar icon instance inside the input and optional label, description and error text. Ten variants cover five states crossed with a Default or Placeholder value style.

### Purpose

Provides the form-field half of a date selection pattern. The field shows the chosen date as its value and carries the supporting text around it. The existing description says it is to be paired with the Calendar component, so the field itself holds the trigger and the overlay calendar comes from elsewhere.

### Behaviour

The State property drives Default, Hover, Focus, Error and Disabled appearances. Focus uses the Stroke/Focus Ring and Border/Focus/Default tokens, Error swaps the border and text to the danger tokens and reveals the Error text layer, and Disabled uses the disabled background, border and icon tokens. Value Type switches the value text between a real date (Text/Default/Default) and placeholder wording (Text/Default/Tertiary).

### Composition

One nested instance, Calendar, sits inside the Input frame as the trigger icon. Child text layers are Label, Description, Value and Error. AI code generators should look for an existing Calendar icon or calendar component in the development codebase before building a new one.

### Usage

Use for a single date entry in a form. Turn off Has Label only when an external label or table header already names the field. Use Has Description for format hints and Has Error for validation messages. For free text that is not a date, use the standard text input instead.

### Code Generation Notes

Build as a label, input wrapper and message block, with the Error text replacing or sitting below the Description. The error message needs to be linked to the input for assistive technology, and the Disabled state needs the input taken out of the tab order. Hover and Focus are visual states in Figma only, so implement them with CSS pseudo-classes rather than separate variants. The calendar overlay, keyboard date entry, parsing and formatting are not represented in this component set and must be wired to the Calendar component.

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
<tr><td>State</td><td><code>Default</code> <code>Error</code> <code>Disabled</code> <code>Hover</code> <code>Focus</code></td></tr>
<tr><td>Value Type</td><td><code>Default</code> <code>Placeholder</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Has Label</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>Shows or hides the label above the input</td></tr>
<tr><td>Has Error</td><td><code>BOOLEAN</code></td><td><code>true</code></td><td>No</td><td>Shows or hides the error message below the input</td></tr>
<tr><td>Label</td><td><code>TEXT</code></td><td><code>Label</code></td><td>No</td><td>Label text content</td></tr>
<tr><td>Error</td><td><code>TEXT</code></td><td><code>Error</code></td><td>No</td><td>Validation message text</td></tr>
<tr><td>Description</td><td><code>TEXT</code></td><td><code>Description</code></td><td>No</td><td>Supporting text, typically the expected date format</td></tr>
<tr><td>Has Description</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>Shows or hides the supporting description text</td></tr>
<tr><td>Value</td><td><code>TEXT</code></td><td><code>Value</code></td><td>No</td><td>Date or placeholder text shown inside the input</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>Visual state of the input and its border, text and icon colours</td></tr>
<tr><td>Value Type</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>Whether the value text reads as an entered date or as placeholder text</td></tr>
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
| Total items | 24 |
| Design tokens | 24 |
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
- <span class="swatch" style="background:#b2b2b2"></span>`Border/Neutral/tertiary` → #b2b2b2 — Using Border/Neutral/tertiary token
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

### Borders

**Tokens in use:**
- `Stroke/Border` → 1px — Using Stroke/Border token
- `Radius/200` → 8px — Using Radius/200 token
- `Stroke/Focus Ring` → 2px — Using Stroke/Focus Ring token

## Accessibility · ARIA

<table>
<thead><tr><th>Item</th><th>Element</th><th>Role</th><th>States → ARIA</th><th>Keyboard</th><th>Accessible name</th></tr></thead>
<tbody>
<tr><td>Date Picker Field</td><td><code>&lt;select&gt; (or role=&quot;combobox&quot; + listbox)</code></td><td>combobox</td><td>Open → <code>aria-expanded</code>=&quot;true&quot; + <code>aria-controls</code> → listbox id<br>Disabled → <code>disabled</code><br>Error → <code>aria-invalid</code>=&quot;true&quot; + <code>aria-describedby</code></td><td>Arrow keys move, Enter selects, Esc closes</td><td><code>&lt;label for&gt;</code> or <code>aria-labelledby</code></td></tr>
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

- **Clear headings and structure** (warning): Make sure the Description and Error text are tied to the input so they are announced, and that focus moves into the calendar when it opens.
- **Links vs buttons** (warning): Give the Calendar icon a button role with a label such as Choose date, since it reads as decoration at present.
- **Works at narrow widths** (pass): A single column label, input and message stack reflows to 320px without horizontal scrolling.
- **Not colour alone** (pass): The error state adds message text alongside the red border, so colour is not the only signal.

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
