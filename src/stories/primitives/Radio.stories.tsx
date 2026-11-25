import React from "react";
import { useArgs } from "storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, RadioField, RadioGroup } from "primitives";

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: "SDS Primitives/Inputs",
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<
  React.ComponentProps<typeof RadioField> & { isSelected?: boolean }
>;
type StoryGroup = StoryObj<typeof RadioGroup>;

export const StoryRadioField: Story = {
  name: "Radio Field",
  args: {
    label: "Label",
    description: "Description",
    isDisabled: false,
    isSelected: true,
  },
  argTypes: {
    isSelected: {
      name: "Checked",
      control: { type: "boolean" },
      description:
        "Story control, not a prop. Mirrors the Figma Value Type: a radio is checked through its group.",
    },
  },
  render: ({ isSelected: _isSelected, ...args }) => {
    const [{ isSelected }, updateArgs] = useArgs();
    return (
      <RadioGroup
        aria-label="Radio field example"
        value={isSelected ? "hello" : null}
        onChange={() => updateArgs({ isSelected: true })}
      >
        <RadioField {...args} value="hello" />
      </RadioGroup>
    );
  },
};

export const StoryRadioGroup: StoryGroup = {
  name: "Radio Group",
  args: {
    label: "Delivery speed",
    description: "Description",
    isDisabled: false,
  },
  render: (args) => (
    <RadioGroup {...args} onChange={console.log}>
      <RadioField value="one">Value one</RadioField>
      <RadioField value="two">Value two</RadioField>
      <RadioField value="three">Value three</RadioField>
    </RadioGroup>
  ),
};
