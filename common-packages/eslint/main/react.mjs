import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import preferFunctionComponentConfig from "eslint-plugin-react-prefer-function-component/config";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import baseConfig from "./index.mjs";
// import preferFunctionComponentPlugin from "eslint-plugin-react-prefer-function-component";

/** @type {Linter.Config[]} */
const config = [
  ...baseConfig,
  pluginReact.configs.flat.recommended,
  pluginReactHooks.configs["recommended-latest"],
  pluginReactRefresh.configs.recommended,
  preferFunctionComponentConfig.configs.recommended,
  {
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.flat?.recommended?.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/jsx-indent-props": ["warn", 2],
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "react/prop-types": "off",
      "react/require-default-props": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      "react/function-component-definition": [
        "warn",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react-prefer-function-component/react-prefer-function-component": [
        "error",
        { allowComponentDidCatch: false, allowJsxUtilityClass: false },
      ],
    },
    settings: {
      react: { version: "detect" },
    },
  },
];

export default config;
