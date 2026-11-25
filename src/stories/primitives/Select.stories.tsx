import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectField, SelectItem } from "primitives";

const meta: Meta<typeof SelectField> = {
  component: SelectField,
  title: "SDS Primitives/Inputs",
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof SelectField>;

export const StorySelectField: Story = {
  name: "Select Field",
  args: {
    label: "Label",
    description: "Description",
    placeholder: "Select a day",
    isDisabled: false,
    isInvalid: false,
    errorMessage: "Error",
  },
  argTypes: {
    errorMessage: {
      control: { type: "text" },
      description: "Shown when isInvalid is on.",
    },
    isDisabled: { control: { type: "boolean" } },
    isInvalid: { control: { type: "boolean" } },
    items: { table: { disable: true } },
  },
  render: (args) => (
    <SelectField {...args} defaultSelectedKey="monday">
      <SelectItem textValue="monday">Monday</SelectItem>
      <SelectItem>Tuesday</SelectItem>
      <SelectItem>Wednesday</SelectItem>
      <SelectItem>Thursday</SelectItem>
      <SelectItem>Friday</SelectItem>
      <SelectItem>Saturday</SelectItem>
      <SelectItem>Sunday</SelectItem>
    </SelectField>
  ),
};
