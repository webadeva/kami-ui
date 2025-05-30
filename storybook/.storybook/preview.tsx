import { MultiThemeProvider } from "@kami-ui/next-theme";
import { defaultTheme } from "@kami-ui/theme-shop";
import type { Preview } from "@storybook/nextjs";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CustomToastContainer, GlobalStyles } from "../pages/_app";

import "react-toastify/dist/ReactToastify.css";

export const decorators: Preview["decorators"] = [
  (Story) => {
    const [toastRoot, setToastRoot] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!document.body) return;
      const el = document.createElement("div");
      el.id = "react-toastify";
      document.body.appendChild(el);
      setToastRoot(el);
      return () => {
        document.body.removeChild(el);
        setToastRoot(null);
      };
    }, []);

    return (
      <MultiThemeProvider themes={defaultTheme}>
        <GlobalStyles />
        <Story />
        {toastRoot && createPortal(<CustomToastContainer />, toastRoot)}
      </MultiThemeProvider>
    );
  },
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
