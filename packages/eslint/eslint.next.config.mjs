import reactConfig from "./eslint.react.config.mjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...reactConfig,
  {
    settings: {
      next: {
        rootDir: ".",
      },
    },
  },
];
