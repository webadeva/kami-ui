import { createLibraryBuildConfig } from "@kami-ui/rollup";

const outputFolder = "dist";

/** @type {import("rollup").RollupOptions[]} */
const config = createLibraryBuildConfig({
  name: "react-theme-common", // Unique name for this package
  input: "src/index.ts",
  outputFolder,
});

export default config;
