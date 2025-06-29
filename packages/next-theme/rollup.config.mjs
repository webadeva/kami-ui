import { createLibraryBuildConfig } from "@kami-ui/rollup";

const outputFolder = "dist";

/** @type {import("rollup").RollupOptions[]} */
const themeConfig = createLibraryBuildConfig({
  name: "next-theme",
  input: "src/index.tsx",
  outputFolder,
  // tsConfigOpts: {
  //   compilerOptions: {
  //     baseUrl: ".",
  //     paths: {
  //       "@kami-ui/react-theme-common": [
  //         "../../react-theme-common/dist/index.d.ts",
  //       ],
  //     },
  //   },
  // },
});

export default themeConfig;
