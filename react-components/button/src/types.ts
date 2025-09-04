import { ColorsObject } from "@kami-ui/types";
import { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "filled" | "outlined" | "text";

export type ButtonColors = keyof Omit<
  ColorsObject,
  "white" | "black" | "text" | "background"
>;

export type TextColors = keyof Omit<
  ColorsObject,
  "white" | "black" | "background"
>;

type Weight = `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}00`;

export interface ButtonProps<ColorWeight = Weight, FontWeight = Weight>
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: ButtonVariant;
  $color?: ButtonColors;
  $size?: "sm" | "md" | "lg";
  $padding?: string;
  $borderRadius?: ("full" | "lg" | "md" | "sm" | "none") | (string & {});
  $colorWeight?: ColorWeight;
  $fontWeight?: FontWeight;
  $textColor?: TextColors;
  $textColorWeight?: ColorWeight;
}
