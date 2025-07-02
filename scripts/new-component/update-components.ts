// import fs from 'fs'
import { readFile, writeFile } from "fs/promises";
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

  const componentsOutFolder = path.join(rootFolder, "components", "output");

  const cjsFile = path.join(componentsOutFolder, "index.cjs");
  const cjsContentArr = (await readFile(cjsFile, "utf-8")).split("\n");
  const newCjsContent = insertElement({
    array: cjsContentArr,
    index: cjsContentArr.findIndex((line) => line.includes("insert here")),
    beforeElement: `var ${componentCapName} = require("@kami-ui/rc-${componentKebabName}");`,
    afterElement: `forReturn["${componentCapName}"] = ${componentCapName};`,
  }).join("\n");
  await writeFile(cjsFile, newCjsContent, { encoding: "utf-8" });

  const mjsFile = path.join(componentsOutFolder, "index.mjs");
  const newMjsContent = `export * from "@kami-ui/rc-${componentKebabName}";\n${await readFile(mjsFile, "utf-8")}`;
  await writeFile(mjsFile, newMjsContent, { encoding: "utf-8" });

  const dtsFile = path.join(componentsOutFolder, "index.d.ts");
  const newDtaContent = `export * from "@kami-ui/rc-${componentKebabName}";\n${await readFile(dtsFile, "utf-8")}`;
  await writeFile(dtsFile, newDtaContent, { encoding: "utf-8" });

  // to do - update package.json of components as well
};
