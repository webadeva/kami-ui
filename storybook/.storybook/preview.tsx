import type { Preview } from "@storybook/react-vite";
import DocDecorator from "./doc-decorator";
import StoryDecorator from "./story-decorator";

import "react-toastify/dist/ReactToastify.css";

export const decorators: Preview["decorators"][] = [StoryDecorator];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: DocDecorator,
    },
    options: {
      storySort: {
        order: ["Introduction", "*"],
      },
    },
  },
};

export default preview;
