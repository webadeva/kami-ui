import type { MultiThemeProviderProps } from "@kami-ui/types";
import { createContext } from "react";

export const ThemeContext = createContext<{
  themes: MultiThemeProviderProps["themes"];
  disableConsole: boolean;
}>({
  themes: [],
  disableConsole: false,
});
