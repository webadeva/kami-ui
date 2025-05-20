import pluginJs from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
// @ts-expect-error -- no types
import eslintComments from "eslint-plugin-eslint-comments";
// @ts-expect-error -- no types
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {any} */
const prettierRecommendedConfig = prettier.configs?.recommended ?? {};

/** @type {any} */
const tsEslintConfig = tseslint?.configs?.recommendedTypeChecked ?? {};

/** @type {import('eslint').Linter.Config[]} */
const config = [
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
        project: "./tsconfig.json",
        // tsconfigRootDir: import.meta.dirname,
      },
    },
    ignores: [
      "rollup.config.*",
      "node_modules/**/*.*",
      "dist/**/*.*",
      "eslint.config.*",
      "scripts/**/*.*",
      "!.storybook",
      "!**/.storybook/**",
    ],
    plugins: {
      prettier,
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
      "no-console": "warn",
      "consistent-return": "off",
      "object-shorthand": "off",
      "no-process-exit": "off",
      "no-underscore-dangle": "off",
      "class-methods-use-this": "off",
      "prefer-destructuring": ["error", { object: true, array: false }],
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

      "func-style": ["error", "expression"],
      "prefer-arrow-callback": "error",
      "eslint-comments/require-description": ["error"],
    },
  },
];

export default config;
