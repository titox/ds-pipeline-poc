# Component descriptions

Source for the descriptions on the Figma components. Each `## <Figma component name>` section is written to that component's description with `npm run descriptions`. RubyLint then uses it as the summary in the Markdown and Jira specs.

Edit here, not in Figma, or the next sync overwrites the Figma text.

Only complete components get a description: all states of the state standard designed (Default, Hover, Focus, Disabled, plus Error for fields and Loading for buttons), a React component and a Code Connect mapping. Add the section when a component is fixed, as part of the workflow in `docs/PROCESS.md`.

## Input Field

Single-line text entry with an optional label, description and error message.

Use for short free text such as a name, email address or postcode. For several lines of text use Textarea Field. For a fixed list of options use Select Field.

States: Default, Hover, Focus, Error, Disabled.

Accessibility: the label is linked to the input. The error message is announced when the field is invalid. Keep a visible label; a placeholder alone is not a label.

Code: `<InputField>` from primitives (`<Input>` when there is no label).
