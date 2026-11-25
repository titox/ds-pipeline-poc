import { useArgs } from "storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, CheckboxField, CheckboxGroup } from "primitives";
import React from "react";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "SDS Primitives/Inputs",
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof CheckboxField>;
type StoryGroup = StoryObj<typeof CheckboxGroup>;

/**
 * Story-only control that mirrors a Figma property with no matching prop.
 * In code the description is shown by passing its text.
 */
type FigmaControls = { hasDescription?: boolean };
const storyControl = "Story control, not a prop. Mirrors the Figma property: ";

export const StoryCheckboxField: StoryObj<
  React.ComponentProps<typeof CheckboxField> & FigmaControls
> = {
  name: "Checkbox Field",
  args: {
    label: "Label",
    hasDescription: true,
    description: "Description",
    isSelected: true,
    isIndeterminate: false,
    isDisabled: false,
  },
  argTypes: {
    label: { control: { type: "text" } },
    hasDescription: {
      name: "Has Description",
      control: { type: "boolean" },
      description: storyControl + "shows the description.",
    },
    description: { control: { type: "text" } },
  },
  render: (args) => {
    const [{ isSelected }, updateArgs] = useArgs();
    return (
      <CheckboxField
        isDisabled={args.isDisabled}
        isSelected={isSelected}
        isIndeterminate={args.isIndeterminate}
        onChange={() => updateArgs({ isSelected: !isSelected })}
        label={args.label}
        description={args.hasDescription ? args.description : undefined}
      />
    );
  },
};

const states = ["Default", "Hover", "Focus", "Disabled"] as const;
const valueTypes = ["Unchecked", "Checked", "Indeterminate"] as const;

/**
 * Mirrors the twelve Figma variants: `State` in columns, `Value Type` in rows.
 * Hover and Focus are interaction states, so the play function hovers one
 * field and moves keyboard focus to another.
 */
export const StoryCheckboxStates: Story = {
  name: "Checkbox States",
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
          <CheckboxField
            key={`${state} ${valueType}`}
            label={`${state}, ${valueType}`}
            description="Description"
            isDisabled={state === "Disabled"}
            isSelected={valueType !== "Unchecked"}
            isIndeterminate={valueType === "Indeterminate"}
            onChange={() => {}}
          />
        )),
      )}
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const target = canvas.getByRole("checkbox", { name: "Focus, Checked" });
    for (let i = 0; i < 12 && document.activeElement !== target; i++) {
      await userEvent.tab();
    }
    await userEvent.hover(
      canvas.getByRole("checkbox", { name: "Hover, Checked" }),
    );
  },
};

export const StoryCheckboxGroup: StoryGroup = {
  name: "Checkbox Group",
  args: {
    label: "Label",
    description: "Description",
    isDisabled: false,
  },
  render: (args) => {
    return (
      <CheckboxGroup
        {...args}
        onChange={console.log}
      >
        <CheckboxField value="one">Value one</CheckboxField>
        <CheckboxField value="two">Value two</CheckboxField>
        <CheckboxField value="three">Value three</CheckboxField>
      </CheckboxGroup>
    );
  },
};
