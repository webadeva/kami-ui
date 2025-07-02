// import fs from 'fs'
import { execSync } from "child_process";
import { writeFile } from "fs/promises";
import path from "path";
import packageJson from "../../react-components/components/package.json";
import { transform } from "./utils";

type Deps = typeof packageJson.dependencies;
interface FinalDeps extends Deps {
  [key: string]: string;
}

const insertElement = (props: {
  array: string[];
  index: number;
  beforeElement: string;
  afterElement: string;
}): string[] => {
  const { array, index, beforeElement, afterElement } = props;
  return [
    ...array.slice(0, index),
    beforeElement,
    array[index],
    afterElement,
    ...array.slice(index + 1),
  ];
};

export const updateComponents = async ({
  componentName,
  rootFolder,
}: {
  componentName: string;
  rootFolder: string;
}) => {
  const deps = packageJson.dependencies;
  const componentKebabName = transform.kebabCase(componentName);
  const componentCapName = transform.removeSpaces(
    transform.capitalize(componentName),
  );

  deps[`@kami-ui/rc-${componentKebabName}`] = "workspace:*";

  const finalDeps: FinalDeps = {} as never;
  Object.keys(deps)
    .sort()
    .map((key) => (finalDeps[key] = packageJson.dependencies[key]));
  packageJson.dependencies = finalDeps;

  await writeFile(
    "react-components/components/package.json",
    JSON.stringify(packageJson, null, 2),
    { encoding: "utf-8" },
  );

  const componentsSrcFolder = path.join(rootFolder, "components", "src");
  const componentsIndexFile = path.join(componentsSrcFolder, "index.ts");

  const indexContent = `export type * from "@kami-ui/rc-${componentKebabName}";
  export { default as ${componentCapName} } from "@kami-ui/rc-${componentKebabName}";\n`;
  await writeFile(componentsIndexFile, indexContent, {
    encoding: "utf-8",
    flag: "a",
  });

  const componentsPackageName = `@kami-ui/react-components`;
  execSync(
    `pnpm i && pnpm --filter ${componentsPackageName} lint:fix && pnpm --filter ${componentsPackageName} build`,
    {
      stdio: "inherit",
    },
  );
};
