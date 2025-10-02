import type { ColorsObject } from "@kami-ui/theme-shop";
import { create, type ThemeVarsPartial } from "storybook/theming";
import { defaultThemeColors } from "./common";

const getColorWithCorrectType = (
  key: keyof ColorsObject,
  weight: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
) => {
  const color = defaultThemeColors?.[key]?.[weight];
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- needed
  return color || (null as unknown as string);
};

const partialTheme: Omit<ThemeVarsPartial, "base"> = {
  appBg: getColorWithCorrectType("background", 4),
  appContentBg: getColorWithCorrectType("background", 4),
  appPreviewBg: getColorWithCorrectType("background", 4),
  barBg: getColorWithCorrectType("background", 4),
  inputBg: getColorWithCorrectType("background", 4),
  buttonBg: getColorWithCorrectType("background", 4),

  appBorderColor: getColorWithCorrectType("gray", 8),
};

export const sbThemeConfig = create({
  base: "dark",
  brandTitle: "Kami UI",
  brandTarget: "_self",

  ...Object.keys(partialTheme)
    .map((key) => {
      const item = partialTheme[key as keyof typeof partialTheme];
      if (item) return item;
      delete partialTheme[key as keyof typeof partialTheme];
      return null;
    })
    .filter((item) => {
      return item;
    }),
});

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
