import { createLibraryBuildConfig } from "@kami-ui/rollup";

const outputFolder = "dist";

/** @type {import("rollup").RollupOptions[]} */
const themeConfig = createLibraryBuildConfig({
  name: "theme-shop", // Unique name for this package
  input: "src/index.ts",
  outputFolder,
});

export default themeConfig;
