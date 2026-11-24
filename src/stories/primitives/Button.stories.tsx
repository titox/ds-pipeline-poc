import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { IconActivity, IconArrowLeft } from "icons";
import { Button, ButtonDanger, ButtonGroup } from "primitives";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "SDS Primitives/Buttons",
  parameters: { layout: "centered" },
};
export default meta;

export const StoryButton: StoryObj<typeof Button> = {
  name: "Button",
  args: {
    children: "Hello world",
    variant: "primary",
  },
  argTypes: {
    children: {
      control: { type: "text" },
    },
    size: {
      control: { type: "select" },
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "neutral", "subtle"],
    },
  },
  render: ({ children, ...props }) => (
    <Button {...props}>
      <IconArrowLeft />
      {children}
      <IconActivity />
    </Button>
  ),
};

export const StoryButtonStates: StoryObj<typeof Button> = {
  name: "Button States",
  parameters: { layout: "padded" },
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "var(--sds-size-space-400)",
        gridTemplateColumns: "repeat(4, max-content)",
        alignItems: "center",
      }}
    >
      {(["primary", "neutral", "subtle"] as const).map((variant) => (
        <React.Fragment key={variant}>
          <Button variant={variant}>Default</Button>
          <Button variant={variant} isDisabled>
            Disabled
          </Button>
          <Button variant={variant} isLoading>
            Loading
          </Button>
          <Button variant={variant} size="small" isLoading>
            Loading small
          </Button>
        </React.Fragment>
      ))}
    </div>
  ),
};

export const StoryButtonDanger: StoryObj<typeof ButtonDanger> = {
  name: "Button Danger",
  args: {
    children: "Hello world",
    variant: "danger-primary",
  },
  argTypes: {
    children: {
      control: { type: "text" },
    },
    size: {
      control: { type: "select" },
    },
    variant: {
      control: { type: "select" },
      options: ["danger-primary", "danger-subtle"],
    },
  },
  render: ({ children, ...props }) => (
    <ButtonDanger {...props}>
      <IconArrowLeft />
      {children}
      <IconActivity />
    </ButtonDanger>
  ),
};

export const StoryButtonGroup: StoryObj<typeof ButtonGroup> = {
  name: "Button Group",
  args: {
    align: "center",
  },
  argTypes: {
    align: {
      control: { type: "select" },
      options: ["center", "start", "end", "justify", "stack"],
    },
  },
  render: ({ ...props }) => (
    <ButtonGroup {...props} style={{ width: 300 }}>
      <Button variant="neutral">Cancel</Button>
      <Button variant="primary">Submit</Button>
    </ButtonGroup>
  ),
};
