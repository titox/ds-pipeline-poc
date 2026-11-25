// url=<FIGMA_INPUTS_INPUT_FIELD>
// source=https://github.com/titox/ds-pipeline-poc/blob/main/src/ui/primitives/Input/Input.tsx
// component=InputField

import figma from "figma";

const instance = figma.selectedInstance;
const hasLabel = instance.getPropertyValue("Has Label");

// Hover and Focus are interaction states: same code as Default.
const isDisabled = instance.getEnum("State", { Disabled: true });
const isInvalid = instance.getEnum("State", { Error: true });
const value = instance.getEnum("Value Type", {
  Default: instance.getString("Value"),
});
const placeholder = instance.getEnum("Value Type", {
  Placeholder: instance.getString("Value"),
});
// Has Error shows the message; State=Error only sets the invalid look.
const errorMessage = instance.getBoolean("Has Error", {
  true: instance.getString("Error"),
  false: undefined,
});
const label = hasLabel ? instance.getString("Label") : undefined;
const description = instance.getBoolean("Has Description", {
  true: instance.getString("Description"),
  false: undefined,
});

// Without a visible label the field still needs an accessible name.
const ariaLabel = hasLabel ? undefined : instance.getString("Label");

const rp = figma.helpers.react.renderProp;

export default {
  id: "InputField",
  imports: ['import { InputField } from "primitives";'],
  example: figma.code`<InputField
      ${rp("isDisabled", isDisabled)}
      ${rp("isInvalid", isInvalid)}
      ${rp("errorMessage", errorMessage)}
      ${rp("label", label)}
      ${rp("aria-label", ariaLabel)}
      ${rp("description", description)}
      ${rp("defaultValue", value)}
      ${rp("placeholder", placeholder)}
    />`,
  metadata: { nestable: true },
};
