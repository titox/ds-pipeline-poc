// url=<FIGMA_INPUTS_RADIO_FIELD>
// source=https://github.com/titox/ds-pipeline-poc/blob/main/src/ui/primitives/Radio/Radio.tsx
// component=RadioField

import figma from "figma";

const instance = figma.selectedInstance;
const rp = figma.helpers.react.renderProp;

const label = instance.getString("Label");
const description = instance.getBoolean("Has Description", {
  true: instance.getString("Description"),
  false: undefined,
});
const isDisabled = instance.getEnum("State", { Disabled: true });
const errorMessage = instance.getBoolean("Has Error", {
  true: instance.getString("Error"),
  false: undefined,
});

// "Value Type" (Checked, Unchecked) and the Error state have no prop on the
// field: the selected option and `isInvalid` are set on the RadioGroup.
export default {
  id: "RadioField",
  imports: ['import { RadioField } from "primitives";'],
  example: figma.code`<RadioField
      value="Initial value"
      ${rp("label", label)}
      ${rp("description", description)}
      ${rp("isDisabled", isDisabled)}
      ${rp("errorMessage", errorMessage)}
    />`,
  metadata: { nestable: true },
};
