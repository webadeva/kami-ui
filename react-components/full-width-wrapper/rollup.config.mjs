import { createLibraryBuildConfig } from "@kami-ui/rollup";

const outputFolder = "dist";

/** @type {import("rollup").RollupOptions[]} */
const themeConfig = createLibraryBuildConfig({
  name: "react-component-full-width-wrapper",
  input: "src/index.tsx",
  outputFolder,
});

export default themeConfig;
