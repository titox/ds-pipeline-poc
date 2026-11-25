import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { IconActivity, IconArrowLeft, IconStar, IconX } from "icons";
import { Button, ButtonDanger, ButtonGroup } from "primitives";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "SDS Primitives/Buttons",
  parameters: { layout: "centered" },
};
export default meta;

/**
 * Story-only controls that mirror Figma properties with no matching prop.
 * In code an icon is shown by passing it as a child.
 */
type IconControls = { hasIconStart?: boolean; hasIconEnd?: boolean };
const iconControls = {
  hasIconStart: {
    name: "Has Icon Start",
    control: { type: "boolean" },
    description:
      "Story control, not a prop. Mirrors the Figma property: shows an icon before the label.",
  },
  hasIconEnd: {
    name: "Has Icon End",
    control: { type: "boolean" },
    description:
      "Story control, not a prop. Mirrors the Figma property: shows an icon after the label.",
  },
} as const;

export const StoryButton: StoryObj<
  React.ComponentProps<typeof Button> & IconControls
> = {
  name: "Button",
  args: {
    children: "Button",
    variant: "primary",
    size: "medium",
    isDisabled: false,
    isLoading: false,
    hasIconStart: false,
    hasIconEnd: false,
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
      table: { defaultValue: { summary: "primary" } },
    },
    isDisabled: {
      control: { type: "boolean" },
    },
    ...iconControls,
  },
  render: ({ children, hasIconStart, hasIconEnd, ...props }) => (
    <Button {...props}>
      {hasIconStart ? <IconStar /> : null}
      {children}
      {hasIconEnd ? <IconX /> : null}
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
        justifyItems: "start",
      }}
    >
      {(["medium", "small"] as const).map((size) =>
        (["primary", "neutral", "subtle"] as const).map((variant) => (
          <React.Fragment key={`${size}-${variant}`}>
            <Button variant={variant} size={size}>
              Button
            </Button>
            <Button variant={variant} size={size}>
              <IconArrowLeft />
              Button
              <IconActivity />
            </Button>
            <Button variant={variant} size={size} isDisabled>
              Button
            </Button>
            <Button variant={variant} size={size} isLoading>
              Button
              <IconActivity />
            </Button>
          </React.Fragment>
        )),
      )}
    </div>
  ),
};

export const StoryButtonLinkLoading: StoryObj<typeof Button> = {
  name: "Button Link Loading",
  render: () => (
    <Button href="#navigated" isLoading>
      Button
      <IconActivity />
    </Button>
  ),
};

export const StoryButtonDanger: StoryObj<
  React.ComponentProps<typeof ButtonDanger> & IconControls
> = {
  name: "Button Danger",
  args: {
    children: "Button",
    variant: "danger-primary",
    size: "medium",
    isDisabled: false,
    hasIconStart: false,
    hasIconEnd: false,
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
    isDisabled: {
      control: { type: "boolean" },
    },
    // Figma has no Loading state for Button Danger, so the control is hidden.
    isLoading: { table: { disable: true } },
    ...iconControls,
  },
  render: ({ children, hasIconStart, hasIconEnd, ...props }) => (
    <ButtonDanger {...props}>
      {hasIconStart ? <IconStar /> : null}
      {children}
      {hasIconEnd ? <IconX /> : null}
    </ButtonDanger>
  ),
};

export const StoryButtonGroup: StoryObj<
  React.ComponentProps<typeof ButtonGroup> & {
    buttonStart?: boolean;
    buttonEnd?: boolean;
  }
> = {
  name: "Button Group",
  args: {
    align: "justify",
    buttonStart: true,
    buttonEnd: true,
  },
  argTypes: {
    align: {
      control: { type: "select" },
      options: ["justify", "start", "end", "center", "stack"],
    },
    buttonStart: {
      name: "Button Start",
      control: { type: "boolean" },
      description:
        "Story control, not a prop. Mirrors the Figma property: shows the first button.",
    },
    buttonEnd: {
      name: "Button End",
      control: { type: "boolean" },
      description:
        "Story control, not a prop. Mirrors the Figma property: shows the second button.",
    },
    // These belong to Button, not to the group.
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    isLoading: { table: { disable: true } },
    href: { table: { disable: true } },
    type: { table: { disable: true } },
  } as StoryObj["argTypes"],
  render: ({ buttonStart, buttonEnd, ...props }) => (
    <ButtonGroup {...props} style={{ width: 300 }}>
      {buttonStart ? <Button variant="neutral">Cancel</Button> : null}
      {buttonEnd ? <Button variant="primary">Submit</Button> : null}
    </ButtonGroup>
  ),
};
