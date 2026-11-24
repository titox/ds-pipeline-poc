import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputField } from "primitives";

const meta: Meta<typeof InputField> = {
  component: InputField,
  title: "SDS Primitives/Inputs",
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof InputField>;

export const StoryInputField: Story = {
  name: "Input Field",
  args: {
    label: "I am a field",
    description: "I am a description",
    isDisabled: false,
    placeholder: "I am a placeholder",
    isRequired: false,
    type: "email",
  },
  render: (args) => <InputField {...args} />,
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
