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
type Story = StoryObj<typeof RadioField>;
type StoryGroup = StoryObj<typeof RadioGroup>;

/**
 * Story-only controls that mirror Figma properties with no matching prop on
 * the field. A radio is checked and marked invalid through its group, and the
 * description and the error message are shown by passing their text.
 */
type FigmaControls = {
  isSelected?: boolean;
  isInvalid?: boolean;
  hasDescription?: boolean;
  hasError?: boolean;
};
const storyControl = "Story control, not a prop. Mirrors the Figma property: ";

export const StoryRadioField: StoryObj<
  React.ComponentProps<typeof RadioField> & FigmaControls
> = {
  name: "Radio Field",
  args: {
    label: "Label",
    hasDescription: true,
    description: "Description",
    isSelected: true,
    isDisabled: false,
    isInvalid: false,
    hasError: false,
    errorMessage: "Error",
  },
  argTypes: {
    label: { control: { type: "text" } },
    hasDescription: {
      name: "Has Description",
      control: { type: "boolean" },
      description: storyControl + "shows the description.",
    },
    description: { control: { type: "text" } },
    isSelected: {
      name: "Checked",
      control: { type: "boolean" },
      description:
        storyControl +
        "Value Type. In code a radio is checked through the value of its group.",
    },
    isDisabled: { control: { type: "boolean" } },
    isInvalid: {
      name: "Invalid",
      control: { type: "boolean" },
      description:
        storyControl +
        "State Error. In code `isInvalid` is set on the radio group.",
    },
    hasError: {
      name: "Has Error",
      control: { type: "boolean" },
      description:
        storyControl +
        "shows the error message. In code the message only appears while the group is invalid.",
    },
    errorMessage: { control: { type: "text" } },
  },
  render: (args) => {
    const [{ isSelected }, updateArgs] = useArgs();
    return (
      <RadioGroup
        aria-label="Radio field example"
        isInvalid={args.isInvalid}
        value={isSelected ? "hello" : null}
        onChange={() => updateArgs({ isSelected: true })}
      >
        <RadioField
          value="hello"
          isDisabled={args.isDisabled}
          label={args.label}
          description={args.hasDescription ? args.description : undefined}
          errorMessage={args.hasError ? args.errorMessage : undefined}
        />
      </RadioGroup>
    );
  },
};

const states = ["Default", "Hover", "Focus", "Error", "Disabled"] as const;
const valueTypes = ["Unchecked", "Checked"] as const;

/**
 * Mirrors the ten Figma variants: `State` in columns, `Value Type` in rows.
 * Each field sits in its own group so it can be checked on its own. Hover and
 * Focus are interaction states, so the play function hovers one field and
 * moves keyboard focus to another.
 */
export const StoryRadioStates: Story = {
  name: "Radio States",
  parameters: { layout: "padded" },
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "var(--sds-size-space-600)",
        gridTemplateColumns: `repeat(${states.length}, 14rem)`,
        alignItems: "start",
      }}
    >
      {valueTypes.map((valueType) =>
        states.map((state) => (
          <RadioGroup
            key={`${state} ${valueType}`}
            aria-label={`${state}, ${valueType}`}
            isInvalid={state === "Error"}
            value={valueType === "Checked" ? "value" : null}
            onChange={() => {}}
          >
            <RadioField
              value="value"
              label={`${state}, ${valueType}`}
              description="Description"
              isDisabled={state === "Disabled"}
            />
          </RadioGroup>
        )),
      )}
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const target = canvas.getByRole("radio", { name: "Focus, Checked" });
    for (let i = 0; i < 12 && document.activeElement !== target; i++) {
      await userEvent.tab();
    }
    await userEvent.hover(
      canvas.getByRole("radio", { name: "Hover, Checked" }),
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
