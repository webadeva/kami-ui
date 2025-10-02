import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { dirname, resolve } from "path";
import del from "rollup-plugin-delete";
import { dts } from "rollup-plugin-dts";
import external from "rollup-plugin-peer-deps-external";
import { fileURLToPath } from "url";
import BuildCoordinator from "./build-coordinator.mjs";

/** @type {typescript.RollupTypescriptOptions} */
export const tsOptions = {
  tsconfig: "tsconfig.json",
  sourceMap: true,
};

export const externalPackages = [
  "@emotion/styled",
  "@emotion/react",
  "@emotion",
  "@emotion/react/jsx-runtime",
  "react",
  "react-dom",
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

// Global coordinator instance
const globalCoordinator = new BuildCoordinator();

// Plugin factory for main build coordination
export const createMainBuildCoordinator = (buildName = "main") => ({
  name: "main-build-coordinator",
  buildStart() {
    globalCoordinator.registerBuild(buildName);
  },
  writeBundle() {
    globalCoordinator.completeBuild(buildName);
  },
  watchChange() {
    // Reset on file changes to ensure proper sequencing
    globalCoordinator.reset();
  },
});

// Plugin factory for dependent build coordination
export const createDependentBuildCoordinator = (dependsOn = "main") => ({
  name: "dependent-build-coordinator",
  async buildStart() {
    await globalCoordinator.waitForBuild(dependsOn);
  },
});

export const commonConfig = ({
  tsConfigOpts: { outDir, ...restTsOpts },
  resolveNode = true,
  extraExternalPackages = [],
}) => {
  const finalExternalPackages = [...externalPackages, ...extraExternalPackages];

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
    plugins,
  };
  return config;
};

/** @type {(props:any) => import('rollup').Plugin} */
const dtsPostProcessingPlugin = ({
  outputFolder,
  defaultDtsCleanupPaths,
  dtsCleanupPaths,
  extraExternalPackages = [],
}) => ({
  name: "post-build-dts-processor",
  async writeBundle() {
    // Import rollup dynamically to process DTS files
    const { rollup } = await import("rollup");

    try {
      const dtsInputFile = `${outputFolder}/index.d.ts`;
      const fs = await import("fs");

      // Check if DTS file exists
      if (!fs.existsSync(dtsInputFile)) {
        console.log("⚠️  No .d.ts file generated, skipping DTS processing");
        return;
      }

      console.log("🔄 Processing DTS files...");

      const dtsBundle = await rollup({
        input: dtsInputFile,
        plugins: [...getDtsCommonPlugins()],
        external: [...externalPackages, ...extraExternalPackages],
      });

      // Write to temporary file first
      const tempOutput = `${outputFolder}/index.d.ts.tmp`;
      await dtsBundle.write({
        file: tempOutput,
        format: "esm",
      });

      await dtsBundle.close();

      // Replace original with processed version
      if (fs.existsSync(tempOutput)) {
        fs.renameSync(tempOutput, dtsInputFile);
        console.log("✓ DTS processing completed");
      }

      // Clean up unwanted files
      const delPlugin = dtsDelete([
        ...defaultDtsCleanupPaths,
        ...dtsCleanupPaths,
      ]);
      if (delPlugin && delPlugin.buildEnd) {
        await delPlugin.buildEnd.call(this);
      }
    } catch (error) {
      console.error("❌ DTS processing failed:", error.message);
    }
  },
});

// Enhanced factory function for creating complete build configurations
export const createLibraryBuildConfig = ({
  name,
  input,
  outputFolder = "dist",
  tsConfigOpts = {},
  resolveNode = true,
  watchPaths = ["src/**/*", "node_modules/@kami-ui/**/*"],
  dtsCleanupPaths = [],
  extraExternalPackages = [],
}) => {
  // Create main build config without DTS processing initially
  const mainConfig = commonConfig({
    tsConfigOpts: {
      outDir: outputFolder,
      declaration: true, // Generate .d.ts files
      ...tsConfigOpts,
    },
    resolveNode,
    extraExternalPackages,
  });

  const defaultDtsCleanupPaths = [
    `${outputFolder}/**/*.*`,
    `${outputFolder}/**`,
    `!${outputFolder}/index.*{d.ts,js,map}`,
  ];

  /** @type {import("rollup").RollupOptions['watch']} */
  const watchOptions = {};

  if (watchPaths.length > 0) {
    watchOptions.include = watchPaths;
  }

  /** @type {import("rollup").RollupOptions[]} */
  const config = [
    // Main build configuration
    {
      ...mainConfig,
      input,
      watch: watchOptions,
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
      plugins: [
        ...(mainConfig.plugins || []),
        createMainBuildCoordinator(name || "main"),
        // Plugin to process DTS files after main build
        dtsPostProcessingPlugin({
          outputFolder,
          defaultDtsCleanupPaths,
          dtsCleanupPaths,
          extraExternalPackages,
        }),
      ],
    },
  ];

  return config;
};

export { commonjs, dts, nodeResolve, terser };
