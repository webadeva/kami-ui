import type { RollupTypescriptOptions } from "@rollup/plugin-typescript";
import type { RollupOptions } from "rollup";

declare const commonjs: any;
declare const dts: any;
declare const nodeResolver: any;
declare const terser: any;

declare const commonConfig: (props: {
  tsConfigOpts: RollupTypescriptOptions;
  resolveNode?: boolean | undefined;
}) => RollupOptions;

declare const createLibraryBuildConfig: ({
  name,
  input,
  outputFolder,
  tsConfigOpts,
  resolveNode,
  watchPaths,
  dtsCleanupPaths,
}: {
  name: string;
  input: string;
  outputFolder: string;
  tsConfigOpts?: object | undefined;
  resolveNode?: boolean | undefined;
  watchPaths?: string[] | undefined;
  dtsCleanupPaths?: string[] | undefined;
  extraExternalPackages?: string[];
}) => RollupOptions[];

export {
  commonConfig,
  commonjs,
  createLibraryBuildConfig,
  dts,
  nodeResolver,
  terser,
};
