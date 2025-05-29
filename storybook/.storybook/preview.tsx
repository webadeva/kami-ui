import { MultiThemeProvider } from "@kami-ui/next-theme";
import { defaultTheme } from "@kami-ui/theme-shop";
import type { Preview } from "@storybook/nextjs";
import { GlobalStyles } from "../pages/_app";

export const decorators: Preview["decorators"] = [
  (Story) => (
    <MultiThemeProvider themes={defaultTheme}>
      <GlobalStyles />
      <Story />
    </MultiThemeProvider>
  ),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
