const pluginJs = require("@eslint/js");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const eslintComments = require("@eslint-community/eslint-plugin-eslint-comments");
const importPlugin = require("eslint-plugin-import");
const prettier = require("eslint-plugin-prettier");
const globals = require("globals");
const tseslint = require("typescript-eslint");
const preferArrowFunctions = require("eslint-plugin-prefer-arrow-functions");

/** @type {any} */
const prettierRecommendedConfig = prettier.configs?.recommended ?? {};

/** @type {any} */
const tsEslintConfig = tseslint?.configs?.recommendedTypeChecked ?? {};

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    ignores: [
      "**/__tests__/**/**/*",
      "**/__mocks__/**/**/*",
      "dist",
      "rollup.config.*",
      "node_modules/**/*.*",
      "dist/**/*.*",
      "eslint.config.*",
      "!.storybook",
      "!**/.storybook/**",
    ],
  },
  pluginJs.configs.recommended,
  ...tsEslintConfig,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: { ...(globals?.browser ?? {}), ...(globals?.node ?? {}) },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: ["./tsconfig.json"],
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      prettier,
      "prefer-arrow-functions": preferArrowFunctions,
      "@typescript-eslint": tsPlugin,
      "eslint-comments": eslintComments,
      import: importPlugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tsPlugin.configs["recommended-type-checked"]?.rules,
      ...tsPlugin.configs["stylistic-type-checked"]?.rules,
      ...(prettierRecommendedConfig?.rules ?? {}),
      camelcase: "error",
      "no-undef": "off",
      "no-unused-vars": "off",
      "no-console": "warn",
      "consistent-return": "off",
      "object-shorthand": "off",
      "no-process-exit": "off",
      "no-underscore-dangle": "off",
      "class-methods-use-this": "off",
      "prefer-destructuring": ["warn", { object: true, array: false }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_$",
          varsIgnorePattern: "^_$",
        },
      ],
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-explicit-any": "off",

      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",

      "@typescript-eslint/consistent-indexed-object-style": "off",

      "prefer-arrow-callback": "error",
      "eslint-comments/require-description": ["error"],

      "prefer-arrow-functions/prefer-arrow-functions": [
        "warn",
        {
          allowNamedFunctions: false,
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: "explicit",
          singleReturnOnly: false,
        },
      ],
    },
  },
];

module.exports = config;
