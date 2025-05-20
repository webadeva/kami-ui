import { saveColorScheme, stringTrimmer } from "@kami-ui/react-theme-common";
import { ColorsObject } from "@kami-ui/types";
import { useContext } from "react";
import { ThemeContext } from "./context";

export const useTheme = () => {
  const { themes, disableConsole } = useContext(ThemeContext);
  const warn = (message: string) => {
    // eslint-disable-next-line no-console -- controlled by disableConsole
    if (!disableConsole) console.warn(message);
  };
  const updateTheme = (themeName: string) => {
    if (!(document && themeName)) return;
    const theme = themes.find(({ name }) => name === themeName);
    if (!theme) {
      if (!disableConsole) warn(`Theme ${themeName} not found`);
      return;
    }
    for (const bodyClass of Array.from(document.body.classList)) {
      if (bodyClass.startsWith("kami-ui-")) {
        document.body.classList.remove(bodyClass);
        break;
      }
    }
    document.body.classList.add(`kami-ui-${stringTrimmer(themeName)}`);
    try {
      if (themeName.includes("dark")) {
        saveColorScheme("dark");
      } else if (themeName.includes("light")) {
        saveColorScheme("light");
      } else {
        // do nothing
      }
    } catch {
      if (!disableConsole)
        warn(`Failed to update theme ${themeName} in local storage`);
    }
  };
  const getTheme = (themeName: string | undefined) =>
    themes.find(({ name }) => name === themeName);
  const getColor = (color: keyof ColorsObject, index: number) => {
    try {
      const currentBodyClass = Array.from(document.body.classList).find(
        (bodyClass) => bodyClass.startsWith("kami-ui-"),
      );
      const currentTheme = getTheme(
        currentBodyClass?.replace("kami-ui-", "") ?? themes?.[0]?.name,
      );
      if (!currentTheme) {
        if (!disableConsole) warn(`Current theme not found`);
        return null;
      }
      const fetchedColor = currentTheme?.theme?.colors?.[color]?.[index];
      if (!color) {
        if (!disableConsole)
          warn(
            `--color-${fetchedColor}-${index + 1}00 in theme ${currentTheme?.name} not found`,
          );
        return null;
      }
      return fetchedColor ?? null;
    } catch {
      return null;
    }
  };
  const getCurrentTheme = (): string | null => {
    const currentBodyClass =
      Array.from(document.body.classList).find((bodyClass) =>
        bodyClass.startsWith("kami-ui-"),
      ) ?? "";
    return currentBodyClass.replace("kami-ui-", "") || null;
  };
  return { updateTheme, getColor, getTheme, getCurrentTheme };
};
