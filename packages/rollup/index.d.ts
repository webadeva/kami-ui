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
  name: any;
  input: any;
  outputFolder: string;
  tsConfigOpts?: {} | undefined;
  resolveNode?: boolean | undefined;
  watchPaths?: never[] | undefined;
  dtsCleanupPaths?: never[] | undefined;
}) => RollupOptions[];

export {
  commonConfig,
  commonjs,
  createLibraryBuildConfig,
  dts,
  nodeResolver,
  terser,
};
