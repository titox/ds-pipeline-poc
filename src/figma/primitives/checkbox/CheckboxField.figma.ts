// url=<FIGMA_INPUTS_CHECKBOX_FIELD>
// source=https://github.com/titox/ds-pipeline-poc/blob/main/src/ui/primitives/Checkbox/Checkbox.tsx
// component=CheckboxField

import figma from "figma";

const instance = figma.selectedInstance;
const rp = figma.helpers.react.renderProp;

const label = instance.getString("Label");
const description = instance.getBoolean("Has Description", {
  true: instance.getString("Description"),
  false: undefined,
});
const defaultSelected = instance.getEnum("Value Type", {
  Checked: true,
  Indeterminate: true,
});
const isIndeterminate = instance.getEnum("Value Type", {
  Indeterminate: true,
});
const isDisabled = instance.getEnum("State", { Disabled: true });
const isInvalid = instance.getEnum("State", { Error: true });
const errorMessage = instance.getBoolean("Has Error", {
  true: instance.getString("Error"),
  false: undefined,
});

export default {
  id: "CheckboxField",
  imports: ['import { CheckboxField } from "primitives";'],
  example: figma.code`<CheckboxField
      ${rp("label", label)}
      ${rp("description", description)}
      ${rp("defaultSelected", defaultSelected)}
      ${rp("isIndeterminate", isIndeterminate)}
      ${rp("isDisabled", isDisabled)}
      ${rp("isInvalid", isInvalid)}
      ${rp("errorMessage", errorMessage)}
    />`,
  metadata: { nestable: true },
};
