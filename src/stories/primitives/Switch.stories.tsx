import { useArgs } from "storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SwitchField, SwitchGroup } from "primitives";

const meta: Meta<typeof SwitchField> = {
  component: SwitchField,
  title: "SDS Primitives/Inputs",
  parameters: { layout: "centered" },
};
export default meta;

export const StorySwitchField: StoryObj<typeof SwitchField> = {
  name: "Switch Field",
  args: {
    label: "Label",
    description: "Description",
    isSelected: true,
    isDisabled: false,
  },
  argTypes: {
    isSelected: { control: { type: "boolean" } },
    placeholder: { table: { disable: true } },
    errorMessage: { table: { disable: true } },
  },
  render: (args) => {
    const [{ isSelected }, updateArgs] = useArgs();
    return (
      <SwitchField
        {...args}
        isSelected={isSelected}
        onChange={(value) => updateArgs({ isSelected: value })}
      />
    );
  },
};

export const StorySwitchGroup: StoryObj<typeof SwitchGroup> = {
  name: "Switch Group",
  args: {},
  render: (args) => {
    return (
      <SwitchGroup {...args}>
        <SwitchField
          label="Enable"
          description="Allow others to embed your event details on their own site."
        />
        <SwitchField label="Dont you love it" description="Something magical" />
      </SwitchGroup>
    );
  },
};
