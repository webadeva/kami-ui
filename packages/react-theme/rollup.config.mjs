import { createLibraryBuildConfig } from "@kami-ui/rollup";

/** @type {import("rollup").RollupOptions[]} */
const themeConfig = createLibraryBuildConfig({
  name: "react-theme",
  input: "src/index.tsx",
});

export default themeConfig;
