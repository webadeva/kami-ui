import * as allThemes from "@kami-ui/theme-shop";

export const defaultThemeName: keyof typeof allThemes = "acapulcoTheaDarkTheme";
export const defaultThemeColors = allThemes[defaultThemeName]?.colors ?? {};
