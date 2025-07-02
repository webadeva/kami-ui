import { createLibraryBuildConfig } from "@kami-ui/rollup";
import { readFileSync } from "node:fs";

const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));
const outputFolder = "dist";

/** @type {import("rollup").RollupOptions[]} */
const themeConfig = createLibraryBuildConfig({
  name: "react-components",
  input: "src/index.ts",
  outputFolder,
  extraExternalPackages: Object.keys(packageJson.dependencies),
});

export default themeConfig;
