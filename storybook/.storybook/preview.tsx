import { CustomToastContainer, GlobalStyles } from "@common";
import { MultiThemeProvider } from "@kami-ui/react-theme";
import * as allThemes from "@kami-ui/theme-shop";
import type { Preview } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { defaultThemeName } from "./common";
import SbThemeInjector from "./theme-injector";

import "react-toastify/dist/ReactToastify.css";

export const objectKeysArr = Object.keys(allThemes).filter(
  (key) => key.includes("DarkTheme") || key.includes("LightTheme"),
);

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

    const themes = objectKeysArr.map((objKey) => ({
      name: objKey,
      theme: allThemes[
        objKey as keyof typeof allThemes
      ] as allThemes.ThemeObject,
    }));

    return (
      <MultiThemeProvider themes={themes} defaultThemeName={defaultThemeName}>
        <SbThemeInjector />
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
    options: {
      storySort: {
        order: ["Introduction", "*"],
      },
    },
  },
};

export default preview;
