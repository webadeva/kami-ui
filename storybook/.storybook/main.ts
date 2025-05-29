/* eslint-disable @typescript-eslint/no-unsafe-call -- testing */
/* eslint-disable @typescript-eslint/require-await -- testing  */
/* eslint-disable @typescript-eslint/no-unsafe-return -- testing */
import type { StorybookConfig } from "@storybook/nextjs";

import { dirname, join } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
const getAbsolutePath = (value: string): any => {
  return dirname(require.resolve(join(value, "package.json")));
};

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.story.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-docs"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  staticDirs: ["../public"],
};
export default config;
