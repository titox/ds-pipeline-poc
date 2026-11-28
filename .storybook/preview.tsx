import type { Preview } from "@storybook/react-vite";
import "../src/index.css";
import "../src/theme.css";
import theme from "./theme";

const preview: Preview = {
  parameters: {
    docs: {
      theme: theme,
    },
    options: {
      // Plugins goes last in the sidebar; everything else keeps its order.
      storySort: {
        order: ["SDS", "*", "Plugins"],
      },
    },
  },

  tags: [],
};

export default preview;
