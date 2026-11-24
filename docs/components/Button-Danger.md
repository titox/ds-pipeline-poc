# Button Danger

> **Design System Readiness: 93%**

A destructive action button with two emphasis levels (Primary, Subtle), two sizes and optional leading or trailing icons. Sixteen variants cover Default, Hover, Disabled and Focus across both emphasis levels and both sizes.

### Purpose

Triggers negative or irreversible actions such as deleting, removing or revoking. Primary is the solid danger fill for the main destructive action. Subtle is the low emphasis treatment for the same action in denser or secondary positions.

### Behaviour

Hover swaps the background to Background/Danger/Hover for Primary and Background/Danger/Tertiary Hover for Subtle. Focus draws a Stroke/Focus Ring. Disabled replaces background, border, text and icon with the Disabled token set and should block pointer and keyboard activation.

### Composition

Each variant holds two instances of a shared icon 'container' component, one before the label and one after, each wrapping a single Icon vector, plus a text layer for the label. Code generators should look for an existing icon or icon container component in the codebase before building a new one, and should reuse the base button implementation if one already exists.

### Usage

Use for destructive actions only. For confirming a normal action use the standard primary button. For cancelling or dismissing use a neutral or subtle button. Pair a Primary danger button with a Subtle or neutral cancel button in confirmation dialogs, and avoid placing two Primary danger buttons side by side.

### Code Generation Notes

Render as a native button element with type set explicitly. Icon slots are instance swaps, so expose them as nodes or component references rather than hard-coded names, and hide the slot entirely when Has Icon Start or Has Icon End is false rather than rendering an empty container. Hover and Focus are visual states in Figma and belong in CSS pseudo-classes (:hover, :focus-visible), not props. Disabled should set the disabled attribute and aria-disabled, and drop the hover and focus ring rules. Horizontal padding uses Space/300 with Space/200 as the gap between icon and label.

## Design System Adoption

| Criterion | Score | Basis |
|-----------|-------|-------|
| Reuse | 3/3 — Needed across teams or products | set manually |
| Pattern Strength | 3/3 — Clear, reusable pattern with variants | suggested: 3 variant axes and 5 component properties. |
| System Fit | 3/3 — Clearly extends and improves the system | set manually |
| Value | 3/3 — Saves time, reduces duplication, or solves a clear problem | set manually |
| Evidence | 3/3 — Proven need (multiple teams or repeated implementations) | set manually |

**Total: 15/15** (13–15) — Add to the design system

## Variants

<table>
<thead><tr><th>Variant group</th><th>Options</th></tr></thead>
<tbody>
<tr><td>Variant</td><td><code>Primary</code> <code>Subtle</code></td></tr>
<tr><td>State</td><td><code>Default</code> <code>Hover</code> <code>Disabled</code> <code>Focus</code></td></tr>
<tr><td>Size</td><td><code>Medium</code> <code>Small</code></td></tr>
</tbody>
</table>

## Properties

<table>
<thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Label</td><td><code>TEXT</code></td><td><code>Button</code></td><td>No</td><td>The button text. Should name the destructive action, for example Delete or Revoke access.</td></tr>
<tr><td>Icon End</td><td><code>INSTANCE_SWAP</code></td><td><code>X</code></td><td>No</td><td>Swaps the glyph in the trailing icon container. 576 preferred icons available.</td></tr>
<tr><td>Has Icon End</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>Shows or hides the trailing icon container after the label.</td></tr>
<tr><td>Has Icon Start</td><td><code>BOOLEAN</code></td><td><code>false</code></td><td>No</td><td>Shows or hides the leading icon container before the label.</td></tr>
<tr><td>Icon Start</td><td><code>INSTANCE_SWAP</code></td><td><code>Star</code></td><td>No</td><td>Swaps the glyph in the leading icon container. 576 preferred icons available.</td></tr>
<tr><td>Variant</td><td><code>VARIANT</code></td><td><code>Primary</code></td><td>No</td><td>Emphasis level. Primary is the solid danger fill, Subtle is the low emphasis treatment.</td></tr>
<tr><td>State</td><td><code>VARIANT</code></td><td><code>Default</code></td><td>No</td><td>Visual state of the button. Hover and Focus are presentation only, Disabled also blocks activation.</td></tr>
<tr><td>Size</td><td><code>VARIANT</code></td><td><code>Medium</code></td><td>No</td><td>Control height and density of the button.</td></tr>
</tbody>
</table>

## Property Quick Reference

<table>
<thead><tr><th>Property</th><th>Values</th><th>Default</th></tr></thead>
<tbody>
<tr><td>Label</td><td><code>Button</code></td><td><code>Button</code></td></tr>
<tr><td>Icon End</td><td><code>Instance swap · 576 preferred icons</code></td><td><code>X</code></td></tr>
<tr><td>Has Icon End</td><td><code>true</code> <code>false</code></td><td><code>false</code></td></tr>
<tr><td>Has Icon Start</td><td><code>true</code> <code>false</code></td><td><code>false</code></td></tr>
<tr><td>Icon Start</td><td><code>Instance swap · 576 preferred icons</code></td><td><code>Star</code></td></tr>
<tr><td>Variant</td><td><code>Primary</code> <code>Subtle</code></td><td><code>Primary</code></td></tr>
<tr><td>State</td><td><code>Default</code> <code>Hover</code> <code>Disabled</code> <code>Focus</code></td><td><code>Default</code></td></tr>
<tr><td>Size</td><td><code>Medium</code> <code>Small</code></td><td><code>Medium</code></td></tr>
</tbody>
</table>

## States

- ✅ `Default`
- ✅ `Hover`
- ✅ `Disabled`
- ✅ `Focus`

## Design Tokens

| Metric | Count |
|--------|-------|
| Total items | 24 |
| Design tokens | 24 |
| Hard-coded values | 0 |

### Colors

**Tokens in use:**
- <span class="swatch" style="background:#ec221f"></span>`Background/Danger/Default` → #ec221f — Using Background/Danger/Default token
- <span class="swatch" style="background:#c00f0c"></span>`Border/Danger/Secondary` → #c00f0c — Using Border/Danger/Secondary token
- <span class="swatch" style="background:#fee9e7"></span>`Icon/Danger/On Danger` → #fee9e7 — Using Icon/Danger/On Danger token
- <span class="swatch" style="background:#fee9e7"></span>`Text/Danger/On Danger` → #fee9e7 — Using Text/Danger/On Danger token
- <span class="swatch" style="background:#c00f0c"></span>`Background/Danger/Hover` → #c00f0c — Using Background/Danger/Hover token
- <span class="swatch" style="background:#900b09"></span>`Border/Danger/Default` → #900b09 — Using Border/Danger/Default token
- <span class="swatch" style="background:#900b09"></span>`Icon/Danger/Default` → #900b09 — Using Icon/Danger/Default token
- <span class="swatch" style="background:#900b09"></span>`Text/Danger/Default` → #900b09 — Using Text/Danger/Default token
- <span class="swatch" style="background:#fdd3d0"></span>`Background/Danger/Tertiary Hover` → #fdd3d0 — Using Background/Danger/Tertiary Hover token
- <span class="swatch" style="background:#d9d9d9"></span>`Background/Disabled/Default` → #d9d9d9 — Using Background/Disabled/Default token
- <span class="swatch" style="background:#b3b3b3"></span>`Border/Disabled/default` → #b3b3b3 — Using Border/Disabled/default token
- <span class="swatch" style="background:#b3b3b3"></span>`Icon/Disabled/On Disabled` → #b3b3b3 — Using Icon/Disabled/On Disabled token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Disabled/On Disabled` → #b3b3b3 — Using Text/Disabled/On Disabled token
- <span class="swatch" style="background:#b3b3b3"></span>`Text/Disabled/Default` → #b3b3b3 — Using Text/Disabled/Default token
- <span class="swatch" style="background:#ec221f"></span>`Icon/Danger/Tertiary` → #ec221f — Using Icon/Danger/Tertiary token

### Spacing

**Tokens in use:**
- `Space/300` → 12px — Using Space/300 token
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
- `Radius/200` → 8px — Using Radius/200 token
- `Stroke/Focus Ring` → 2px — Using Stroke/Focus Ring token

## Accessibility · ARIA

<table>
<thead><tr><th>Item</th><th>Element</th><th>Role</th><th>States → ARIA</th><th>Keyboard</th><th>Accessible name</th></tr></thead>
<tbody>
<tr><td>Button Danger</td><td><code>&lt;button&gt;</code></td><td>button (implicit)</td><td>Disabled → <code>disabled</code> (or <code>aria-disabled</code>=&quot;true&quot; to keep it focusable)</td><td>Enter, Space</td><td>Visible label text; <code>aria-label</code> if icon-only</td></tr>
</tbody>
</table>

Patterns: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Accessibility

### Accessibility Audit

| Check | Status | Details |
|-------|--------|---------|
| Touch target size | ⚠️ Warning | Target size 67×32px meets WCAG minimum (24px) but is below recommended 44px (smallest variant: "Variant=Primary, State=Default, Size=Small") |
| Focus state | ✅ Pass | Component has a focus state for keyboard navigation |
| Minimum font size | ✅ Pass | Smallest text is 16px, meets readability guidelines |
| Color contrast | ❌ Fail | "Button" has 1.5:1 contrast, below WCAG AA minimum of 3:1. 4 text layers not measurable: "Button" (no solid fill behind the text), "Button" (no solid fill behind the text), "Button" (no solid fill behind the text), …. Check manually |

## Web · WCAG 2.2 + Ruby DS review

**Score:** 10.5/13 (81%)

| Rule | Status | Details |
|------|--------|---------|
| Text contrast ≥ 4.5:1 (3:1 large) | ❌ Fail | 8 text layers below contrast minimum: 'Button' 3.73:1, 'Button' 3.73:1, 'Button' 1.49:1, … |
| Target size ≥ 24×24px (44 preferred) | ⚠️ Warning | Target 67×32px meets WCAG AA (24px) but not 44px (AAA) |
| Ruby font (Fira Sans) | ⚠️ Warning | 16 text layers not using Fira Sans: 'Button' Inter, 'Button' Inter, 'Button' Inter, … |
| Real copy, not placeholders | ⚠️ Warning | 16 text layers use placeholder copy ('Button'). Use real words such as "Save profile" so examples read like the product |

### AI opinion (not scored)

- **Works at narrow widths** (warning): Add a full width option so stacked dialog buttons reflow at 320px instead of overflowing.
- **Not colour alone** (warning): Red fill alone signals risk, so always use a destructive verb in the label and do not rely on colour to mark the Disabled state.
- **Clear headings and structure** (pass): Icon, label and icon sit in a single reading order, so place the danger button last in dialog footers to match focus order.
- **Links vs buttons** (pass): This reads as an action, so replace the placeholder Label with the verb and object, for example Delete project.

## Component Readiness

| Check | Status | Details |
|-------|--------|---------|
| Property configuration | ✅ Pass | Component has configurable properties |
| Component description | ✅ Pass | Component has description for MCP/AI context |

## AI Interpretation (Readiness score: 93%)

**What AI Reads Well:**
- Has component description for better MCP/AI context
- Has 8 configurable properties
- Uses design tokens for consistency

---

*Generated by RubyLint — 11/24/2026*
