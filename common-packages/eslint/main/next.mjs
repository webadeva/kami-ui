import nextPlugin from "@next/eslint-plugin-next";
import reactConfig from "./react.mjs";

/** @type {Linter.Config[]} */
const config = [
  ...reactConfig,
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      "@next/next/no-img-element": "warn",
    },
    settings: {
      next: {
        rootDir: ".",
      },
    },
  },
];

export default config;
