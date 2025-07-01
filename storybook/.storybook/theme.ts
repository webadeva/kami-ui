import { create, type ThemeVarsPartial } from "storybook/theming";

export const sbThemeConfig: ThemeVarsPartial = {
  base: "dark",
  brandTitle: "Kami UI",
  brandTarget: "_self",
};

export const updatedSbThemeConfig: ThemeVarsPartial = {
  ...sbThemeConfig,

  // Brand colors
  //   colorPrimary: "var(--color-primary-500)",
  //   colorSecondary: "var(--color-secondary-500)",

  // App background and content
  appBg: "var(--color-background-100)",
  appContentBg: "var(--color-background-200)",
  appPreviewBg: "var(--color-background-300)",
  appBorderColor: "var(--color-gray-600)",
  appBorderRadius: 8,

  // Typography
  fontBase: "var(--font-sans)",
  fontCode: "var(--font-mono)",

  // Text colors
  textColor: "var(--color-text-900)",
  textInverseColor: "var(--color-text-100)",
  textMutedColor: "var(--color-text-700)",

  // Toolbar default and active colors
  barTextColor: "var(--color-text-800)",
  barHoverColor: "var(--color-primary-500)",
  barSelectedColor: "var(--color-primary-600)",
  barBg: "var(--color-background-200)",

  // Button colors
  buttonBg: "var(--color-background-400)",
  buttonBorder: "var(--color-gray-600)",
  booleanBg: "var(--color-background-300)",
  booleanSelectedBg: "var(--color-primary-500)",

  // Input colors
  inputBg: "var(--color-background-300)",
  inputBorder: "var(--color-gray-600)",
  inputTextColor: "var(--color-text-900)",
};

export default create(sbThemeConfig);
