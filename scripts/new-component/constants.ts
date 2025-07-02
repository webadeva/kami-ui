import { transform } from "./utils";

export enum FileTypes {
  component = "tsx",
  eslint = "config.mjs",
  package = "json",
  README = "md",
  rollup = "config.mjs",
  styles = "ts",
  tsconfig = "json",
  types = "ts",
  watch = "cjs",
}

export const TransformWordsMap: Record<string, (keyof typeof transform)[]> = {
  "<COMPONENT_NAME_TEXT>": ["capitalize"],
  "<COMPONENT_NAME>": ["capitalize", "removeSpaces"],
  "<COMPONENT_NAME_LOWERCASE_KEBAB>": ["lowerCase", "kebabCase"],
};
