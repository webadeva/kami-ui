import {
  commonConfig,
  dtsDelete,
  externalPackages,
  getDtsCommonPlugins,
} from "@kami-ui/rollup";

const outputFolder = "dist";
const config = commonConfig({
  tsConfigOpts: {
    outDir: outputFolder,
    compilerOptions: {
      baseUrl: ".",
      paths: {
        "@kami-ui/react-theme-common": [
          "../../react-theme-common/dist/index.d.ts",
        ],
      },
    },
  },
});

/** @type {import("rollup").RollupOptions} */
const themeConfig = [
  {
    ...config,
    input: "src/index.ts",
    output: [
      {
        file: `${outputFolder}/index.mjs`,
        format: "esm",
        interop: "auto",
        sourcemap: true,
      },
      {
        file: `${outputFolder}/index.cjs`,
        format: "cjs",
        interop: "auto",
        sourcemap: true,
      },
    ],
  },
  {
    input: `${outputFolder}/index.d.ts`,
    output: {
      file: `${outputFolder}/index.d.ts`,
      format: "esm",
    },
    plugins: [
      ...getDtsCommonPlugins(),
      dtsDelete(["dist/**/*.*", "dist/**", "!dist/index.*{d.ts,js,map}"]),
    ],
    external: externalPackages,
  },
];

export default themeConfig;
