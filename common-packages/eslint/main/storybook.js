const storybook = require("eslint-plugin-storybook");
const nextConfig = require("./next.js");

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...nextConfig,
  ...storybook.configs["flat/recommended"],
  {
    rules: {
      "node/no-unsupported-features/es-syntax": "off",
      "node/no-missing-import": "off",
      "react/jsx-props-no-spreading": "off",
      "react/react-in-jsx-scope": "off"
    }
  }
];

module.exports = config;
