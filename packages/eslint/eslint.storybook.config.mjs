import storybook from "eslint-plugin-storybook";
import nextConfig from "./eslint.next.config.mjs";

/** @type {import('eslint').Linter.Config[]} */
// @ts-expect-error -- no types
export default [
  ...nextConfig,
  ...storybook.configs["flat/recommended"],
  {
    rules: {
      "node/no-unsupported-features/es-syntax": "off",
      "node/no-missing-import": "off",
      "react/jsx-props-no-spreading": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];
