# Storybook and Figma: consistency check

Checked on 25 November 2026. Scope: the 16 components of the Buttons and Inputs pages.

## Fixed in Storybook on the same day

The designer asked for the Storybook side to be fixed. Only story files were changed; Figma and the component code were not touched. Each changed story was loaded in the local Storybook and its controls were tried.

| Component | What changed in its story |
|---|---|
| Button | Label defaults to "Button". Icons are off by default, with "Has Icon Start" and "Has Icon End" controls that show Star and X, as in Figma. A Disabled control was added. The docs table now shows `primary` as the default variant. |
| Button Danger | Same label and icon controls as Button, plus a Disabled control. The Loading control is hidden, because Figma has no Loading state for it. |
| Button Group | Starts at Justify, as in Figma. "Button Start" and "Button End" controls were added. Button's own controls no longer appear. |
| Icon Button, Destructive Icon Button | The Loading control is hidden. |
| Checkbox Field | Label and description are now controls, with the Figma default texts. |
| Checkbox Group | Label, description and Disabled controls. The misspelt story address is corrected to `story-checkbox-group`. |
| Radio Field | Controls for label, description, Disabled and Checked. It starts checked, as in Figma. |
| Radio Group | Controls for the group label ("Delivery speed", as in Figma), description and Disabled. |
| Search | Controls for placeholder and Disabled. |
| Select Field | Label and description controls now work. Controls for Disabled, Invalid and the error text were added. |
| Switch Field | Label and description controls now work. An on/off control was added. It starts on, as in Figma. |
| Textarea Field | New story "Textarea States" showing Default, Hover, Focus, Error and Disabled, like "Input States". |

Still different after this, because a story cannot fix it:

- **Date Input Field** and **Date Picker Field** have no React component, so they cannot have a story.
- **Destructive Icon Button** has no counterpart in Figma. Either Figma gains a danger variant or the story goes.
- **`orientation`** on Checkbox Group and Radio Group is not supported by the code, so no control was added.
- **Loading** is hidden in the stories of Button Danger and Icon Button, but the code still accepts it.
- **Select Field** has no control for the Figma "Open" property.
- **Button Group** still defaults to Start in the code; only the story starts at Justify.
- The default icons, the Input Field description default and the Slider range were left as they are.

The tables below describe the state before these fixes.

## How it was checked

- **Figma:** read live from the file through the Desktop Bridge. For each component set: its properties, their options and their default values.
- **Storybook:** read from the running local Storybook (port 6006). For each story: its controls, their options and the default arguments. The story source files were read where the controls alone did not explain a result.
- **Compared:** properties and controls, option lists, default values, states, and whether each side has a counterpart on the other.

Not compared here: colours, spacing and other token values (the component review does that), and the published Storybook site (the local one was used).

## Summary

| Component | Result | Main difference |
|---|---|---|
| Button | Mostly consistent | Icons on by default in Storybook, off in Figma. No Disabled control. Wrong default shown for `variant`. |
| Button Danger | Differences | Storybook offers Loading. Figma has no Loading state. |
| Button Group | Differences | Three different defaults for alignment. Button Start and Button End have no control. |
| Icon Button | Differences | Storybook offers Loading. Figma has no Loading state. |
| Destructive Icon Button | Storybook only | No danger variant of Icon Button in Figma. |
| Checkbox Field | Mostly consistent | Label and description are fixed text in the story. |
| Checkbox Group | Differences | Figma has `orientation`. Storybook and the code do not. |
| Date Input Field | Figma only | No story and no React component. |
| Date Picker Field | Figma only | No story and no React component. |
| Input Field | Consistent | All five states have a story. Small differences in defaults. |
| Radio Field | Differences | The story has no controls at all. |
| Radio Group | Differences | No controls. Figma has `orientation` and a group label. |
| Search | Differences | No control for disabled, value or placeholder. |
| Select Field | Differences | Label and description controls do nothing. No control for error, disabled or open. |
| Slider Field | Mostly consistent | Storybook shows a two-handle range by default. Not confirmed in Figma. |
| Switch Field | Differences | Label and description controls do nothing. No on/off control. Default differs. |
| Textarea Field | Mostly consistent | No story that shows the Hover, Focus and Error states. |

Counts: 1 consistent, 4 mostly consistent, 9 with differences, 2 in Figma only, 1 in Storybook only.

## Findings, most important first

### 1. Components that exist on one side only

- **Date Input Field** and **Date Picker Field** are designed in Figma (10 variants each). There is no story and no React component.
- **Destructive Icon Button** has a story (variants `danger-primary`, `danger-subtle`). The Figma Icon Button set has only Primary, Neutral and Subtle.
- **Fieldset** and **Switch Group** have stories. They are not among the 16 audited Figma components. Whether they exist elsewhere in Figma was not checked.

### 2. States that exist on one side only

- **Loading** is available in Storybook for Button Danger and Icon Button (`isLoading`), because they share Button's code. Figma has a Loading state for Button only.
- **Textarea Field** has five states in Figma (Default, Error, Disabled, Hover, Focus). Storybook has one story with a Disabled control. Input Field has an "Input States" story that shows all five; Textarea has no equivalent.

### 3. Controls that do nothing

In these stories the label and description are written into the story after the controls are applied, so changing the control has no effect:

- **Select Field:** `label`, `description`.
- **Switch Field:** `label`, `description`.

### 4. Figma properties with no Storybook control

| Component | Figma property | Storybook |
|---|---|---|
| Button | Has Icon Start, Has Icon End | No control. Both icons are always shown. |
| Button | State = Disabled | No control on the "Button" story. Shown only in "Button States". |
| Button Group | Button Start, Button End | No control. |
| Checkbox Field | Label, Description, Has Description | Fixed text in the story. |
| Checkbox Group | orientation | No control, and no such prop in the code. |
| Radio Field | Value Type, State, Label, Description | No controls at all. |
| Radio Group | Group Label, orientation | No controls. No `orientation` prop in the code. |
| Search | State = Disabled, Value, Value Type | No control. |
| Select Field | Has Error, Error, Open, State = Disabled, Value | No working control. |
| Switch Field | Value Type (Checked, Unchecked) | No control. |

### 5. Default values that differ

| Component | Property | Figma | Storybook |
|---|---|---|---|
| Button | Icons | Off | Both on (arrow left, activity) |
| Button | Icon choice | Star, X | Arrow left, Activity |
| Button | Label | "Button" | "Hello world" |
| Button | `variant` default in the docs table | Primary | Shown as `danger-primary`. The real default in code is `primary`. |
| Button Group | Align | Justify | Story starts at `center`. Code default is `start`. |
| Input Field | Description | Hidden | Shown |
| Switch Field | Value | Checked | Unchecked |

### 6. Things that match

- **Option lists match** wherever both sides have the property: Button variant (Primary, Neutral, Subtle) and size (Medium, Small); Icon Button variant and size; Button Danger variant (Primary, Subtle in Figma; `danger-primary`, `danger-subtle` in code); Button Group alignment (the same five values).
- **Size default** is Medium on both sides for Button and Icon Button.
- **Checkbox Field** value: Unchecked, Checked and Indeterminate in Figma map to `isSelected` and `isIndeterminate`, and both sides start checked.
- **Input Field** states: all five Figma states are shown in the "Input States" story.
- **Disabled** has a control on Icon Button, Checkbox Field, Input Field, Slider Field, Switch Field and Textarea Field.

### 7. Smaller points

- The Button Group story lists Button's controls (`variant`, `size`, `isLoading`, `href`, `type`). They do not apply to the group.
- The Checkbox Group story's address is misspelt: `story-checkbox-gruop`. Supernova and any link to it use that address.
- Storybook lists props that Figma does not have and does not need, such as `href`, `type` and `isRequired`. That is expected: they are code concerns.

## Inconsistencies inside Figma itself

Seen while reading the Figma data, not part of the comparison:

- **Has Error** is on by default in Date Input Field, Date Picker Field and Select Field, and off by default in Input Field and Textarea Field.
- The default error text is "Error" everywhere except Textarea Field, where it is "Hint".
- Property names are mostly written with capitals ("Value Type", "Has Label"). In Checkbox Group and Radio Group the property is written `orientation`, in lower case.
- The State options are listed in a different order from one component to another (for example "Disabled" comes first in Input Field and Switch Field).
