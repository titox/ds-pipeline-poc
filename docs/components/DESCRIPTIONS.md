# Component descriptions

Source for the descriptions on the Figma components. Each `## <Figma component name>` section is written to that component's description with `npm run descriptions`. RubyLint then uses it as the summary in the Markdown and Jira specs.

Edit here, not in Figma, or the next sync overwrites the Figma text.

Only complete components get a description: all states of the state standard designed (Default, Hover, Focus, Disabled, plus Error for fields and Loading for buttons), a React component and a Code Connect mapping. Add the section when a component is fixed, as part of the workflow in `docs/PROCESS.md`.

## Input Field

Single-line text field with an optional label, description and error message. It has five states (Default, Hover, Focus, Error, Disabled) and shows either a value or a placeholder.

PURPOSE: Lets a person type one line of free text, such as a name, an email address or a postcode. The label says what to enter, the description gives extra help and the error message says what to fix.

BEHAVIOUR: Hover changes the border to `Border/Default/Secondary`. Focus draws a 2px border in `Border/Focus/Default` and takes priority over Hover and Error. Error changes the border to `Border/Danger/Default`. Disabled uses the disabled background, text and border colours and does not react to Hover or Focus. `Value Type` switches the text between an entered value and a placeholder. `State=Error` and `Has Error` are separate controls: the first sets the error border, the second shows the error message.

COMPOSITION: A label, the input, a description and an error message, stacked in that order. In code these are `Label`, `Input`, `Description` and `FieldError` from `primitives`. Reuse them, do not create new ones.

USAGE: Use for short free text. For several lines use Textarea Field. For a fixed list of options use Select Field. For a search query use Search. Keep a visible label; a placeholder alone is not a label.

CODE GENERATION NOTES: Use `<InputField>` from `primitives`, or `<Input>` when `Has Label` is false. Both are built on React Aria Components. `State=Error` maps to `isInvalid` plus `errorMessage`, `State=Disabled` maps to `isDisabled`, and `Value Type=Placeholder` maps `Value` to `placeholder`. Hover and Focus are interaction states and need no props: the CSS reads `data-hovered` and `data-focused`. Focus shows on any focus, pointer or keyboard. `Has Error` has no Code Connect mapping; pass `errorMessage` instead. React Aria links the label, description and error message to the input and announces the error when the field is invalid.
