import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputField } from "primitives";
import React from "react";

const meta: Meta<typeof InputField> = {
  component: InputField,
  title: "SDS Primitives/Inputs",
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof InputField>;

/**
 * Story-only controls that mirror Figma properties with no matching prop.
 * In code a label, description or error message is shown by passing its text.
 */
type FigmaControls = {
  hasLabel?: boolean;
  hasDescription?: boolean;
  hasError?: boolean;
  valueType?: "Default" | "Placeholder";
};
const storyControl = "Story control, not a prop. Mirrors the Figma property: ";

export const StoryInputField: StoryObj<
  React.ComponentProps<typeof InputField> & FigmaControls
> = {
  name: "Input Field",
  args: {
    hasLabel: true,
    label: "Label",
    hasDescription: false,
    description: "Description",
    hasError: false,
    errorMessage: "Error",
    value: "Value",
    valueType: "Default",
    isDisabled: false,
    isInvalid: false,
  },
  argTypes: {
    hasLabel: {
      name: "Has Label",
      control: { type: "boolean" },
      description: storyControl + "shows the label.",
    },
    label: { control: { type: "text" } },
    hasDescription: {
      name: "Has Description",
      control: { type: "boolean" },
      description: storyControl + "shows the description.",
    },
    description: { control: { type: "text" } },
    hasError: {
      name: "Has Error",
      control: { type: "boolean" },
      description:
        storyControl +
        "shows the error message. In code the message only appears while the field is invalid.",
    },
    errorMessage: { control: { type: "text" } },
    value: { control: { type: "text" } },
    valueType: {
      name: "Value Type",
      control: { type: "select" },
      options: ["Default", "Placeholder"],
      description:
        storyControl + "shows Value as entered text or as a placeholder.",
    },
    isDisabled: { control: { type: "boolean" } },
    isInvalid: { control: { type: "boolean" } },
  },
  render: ({
    hasLabel,
    label,
    hasDescription,
    description,
    hasError,
    errorMessage,
    value,
    valueType,
    ...props
  }) => (
    <InputField
      // The value is uncontrolled so it can be typed over; the key resets it
      // when the Value or Value Type control changes.
      key={`${valueType}-${value}`}
      {...props}
      label={hasLabel ? label : undefined}
      aria-label={hasLabel ? undefined : String(label)}
      description={hasDescription ? description : undefined}
      errorMessage={hasError ? errorMessage : undefined}
      defaultValue={valueType === "Default" ? value : undefined}
      placeholder={valueType === "Placeholder" ? value : undefined}
    />
  ),
};

const states = ["Default", "Hover", "Focus", "Error", "Disabled"] as const;

/**
 * Mirrors the Figma `State` variants. Hover and Focus are interaction states,
 * so the play function hovers and focuses the matching fields.
 */
export const StoryInputStates: Story = {
  name: "Input States",
  parameters: { layout: "padded" },
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "var(--sds-size-space-400)",
        gridTemplateColumns: `repeat(${states.length}, 14rem)`,
        alignItems: "start",
      }}
    >
      {states.map((state) => (
        <InputField
          key={state}
          label={state}
          placeholder="Placeholder"
          data-state={state}
          isDisabled={state === "Disabled"}
          isInvalid={state === "Error"}
          errorMessage={state === "Error" ? "Error message" : undefined}
        />
      ))}
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.hover(canvas.getByLabelText("Hover"));
    canvas.getByLabelText("Focus").focus();
  },
};
