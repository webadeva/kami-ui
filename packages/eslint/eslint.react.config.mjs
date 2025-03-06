import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import baseConfig from "./eslint.config.mjs";

/** @type {import('eslint').Linter.Config[]} */
// @ts-expect-error -- no types
export default [
  ...baseConfig,
  pluginReact.configs.flat.recommended,
  pluginReactHooks.configs["recommended-latest"],
  pluginReactRefresh.configs.recommended,
  {
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.flat?.recommended?.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/jsx-indent-props": ["warn", 2],
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "react/prop-types": "off",
      "react/require-default-props": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
    },
    settings: {
      react: { version: "detect" },
    },
  },
];
