import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import jsx from "acorn-jsx";
import { dirname, resolve } from "path";
import del from "rollup-plugin-delete";
import { dts } from "rollup-plugin-dts";
import external from "rollup-plugin-peer-deps-external";
import { fileURLToPath } from "url";

/** @type {typescript.RollupTypescriptOptions} */
export const tsOptions = {
  tsconfig: "tsconfig.json",
};

export const externalPackages = [
  "@emotion/styled",
  "@emotion/react",
  "@emotion",
  "@emotion/react/jsx-runtime",
  "react",
  "react-dom",
  "react",
  "react/jsx-runtime",
  "@types/react",
  "@types/react/jsx-runtime",
  "colord",
  "shade-generator",
  "next",
  "react-helment",
  "next/head",
  "@kami-ui/types",
];

export const dtsDelete = (paths = []) =>
  del({
    hook: "buildEnd",
    targets: paths,
  });

export const dtsCommonOptions = {
  compilerOptions: {
    baseUrl: ".",
    paths: {},
  },
  respectExternal: true,
  fixExternal: true,
};

export const getDtsCommonPlugins = (resolveNode = true) => {
  const plugins = [dts(dtsCommonOptions)];
  if (resolveNode) {
    plugins.unshift(
      nodeResolve({
        modulePaths: [resolve(dirname(fileURLToPath(import.meta.url)), "../")],
        mainFields: ["module", "main", "types"],
        moduleDirectories: ["node_modules", "packages"],
      }),
    );
  }
  return plugins;
};

export const commonConfig = ({
  tsConfigOpts: { outDir, ...restTsOpts },
  resolveNode = true,
}) => {
  const finalExternalPackages = [...externalPackages];

  /** @type {import('rollup').RollupOptions["plugins"]} */
  const plugins = [
    typescript({ ...tsOptions, outDir: outDir, ...restTsOpts }),
    commonjs({
      include: /node_modules|packages/,
      requireReturnsDefault: "auto",
    }),
    external(),
    terser(),
  ];
  if (resolveNode) {
    plugins.unshift(
      nodeResolve({
        modulePaths: [resolve(dirname(fileURLToPath(import.meta.url)), "../")],
        mainFields: ["module", "main", "types"],
        moduleDirectories: ["node_modules", "packages"],
      }),
    );
  }

  /** @type {import('rollup').RollupOptions} */
  const config = {
    external: finalExternalPackages,
    acornInjectPlugins: [jsx()],
    plugins,
  };
  return config;
};

export { commonjs, dts, nodeResolve, terser };
