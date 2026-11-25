import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconActivity } from "icons";
import { DestructiveIconButton, IconButton } from "primitives";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: "SDS Primitives/Buttons",
  parameters: { layout: "centered" },
};
export default meta;

export const StoryIconButton: StoryObj<typeof IconButton> = {
  name: "Icon Button",
  args: {
    variant: "primary",
    size: "medium",
    isDisabled: false,
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "neutral", "subtle"],
    },
    // Figma has no Loading state for Icon Button, so the control is hidden.
    isLoading: { table: { disable: true } },
  },
  render: ({ ...args }) => (
    <IconButton {...args}>
      <IconActivity />
    </IconButton>
  ),
};

export const StoryDestructiveIconButton: StoryObj<
  typeof DestructiveIconButton
> = {
  name: "Destructive Icon Button",
  args: {
    variant: "danger-primary",
    size: "medium",
    isDisabled: false,
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
    },
    variant: {
      control: { type: "select" },
      options: ["danger-primary", "danger-subtle"],
    },
    isLoading: { table: { disable: true } },
  },
  render: ({ ...args }) => (
    <DestructiveIconButton {...args}>
      <IconActivity />
    </DestructiveIconButton>
  ),
};
