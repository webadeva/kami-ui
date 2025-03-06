import { PropsWithChildren } from "react";

export type ColorType = string | string[];
type String3Array = [string, string, string];
type String5Array = [string, string, string, string, string];
type String7Array = [string, string, string, string, string, string, string];
type String9Array = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];
type String11Array = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];
type String20Array = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export interface ColorsObject {
  primary: ColorType;
  secondary: ColorType;

  accent?: ColorType;
  neutral?: ColorType;

  complementary?: ColorType;
  analogous?: ColorType;
  triadic?: ColorType;
  tetradic?: ColorType;

  success?: ColorType;
  warning?: ColorType;
  info?: ColorType;
  error?: ColorType;

  gray?: ColorType;
  white?: ColorType;
  black?: ColorType;

  text?: ColorType;
  background?: ColorType;
}

export interface Breakpoint {
  min?: string;
  max?: string;
  orientation?: "landscape" | "portrait";
}

export interface BreakpointSize<T> {
  size: T;
  breakpoint: Breakpoint;
}

export type BreakpointSizeArray<T> = T | BreakpointSize<T>[];

export type FontSizeArray = String7Array | String9Array | String11Array;

export interface TypographyObject {
  /**
   * Font sizes: An array of 7, 9, or 11 strings representing font sizes
   * Or an array of objects with breakpoint and array of 7, 9, or 11 strings representing font sizes.
   */
  fontSizes: BreakpointSizeArray<FontSizeArray>;
  fontFamilies?: {
    sans?: string;
    serif?: string;
    mono?: string;
    cursive?: string;
  };
}

export type BorderRadiusArray = String3Array | String5Array | String7Array;

export interface SpacingObject {
  /**
   * Border radius: An array of 3, 5, or 7 strings representing border radius values
   * Or an array of objects with breakpoint and array of 3, 5, or 7 strings representing border radius values.
   */
  borderRadius?: BreakpointSizeArray<BorderRadiusArray>;
  /**
   * Space: An array of 20 strings representing space values
   * Or an array of objects with breakpoint and array of 20 strings representing space values.
   */
  space?: BreakpointSizeArray<String20Array>;
}

export interface ThemeObject {
  colors: ColorsObject;
  typography?: TypographyObject;
  spacing?: SpacingObject;
}

export type ThemeProviderProps = PropsWithChildren<{
  injectInBody?: boolean;
  mode?: string;
  theme: ThemeObject;
  disableOnAmp?: boolean;
}>;

export type MultiThemeProviderProps = PropsWithChildren<{
  themes: {
    name: string;
    theme: ThemeObject;
  }[];
  injectInBody?: boolean;
  disableConsole?: boolean;
  autoMaintainTheme?: boolean;
  disableOnAmp?: boolean;
}>;
