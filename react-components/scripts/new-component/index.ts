import { readdir } from "fs/promises";
import path from "path";
import { FileTypes } from "./constants";
import {
  handle,
  makeComponentFolder,
  transform,
  validations,
  writeFile,
} from "./utils";

const main = async () => {
  const input = await handle.input();

  validations(input);

  handle.info(`Creating component ${transform.capitalize(input)}...`);

  const cwd = process.cwd();
  const rootFolder = path.join(cwd, "react-components");

  const componentFolder = path.join(rootFolder, transform.kebabCase(input));

  await makeComponentFolder({
    componentNameUserInput: input,
    folderPath: componentFolder,
  });

  const templatesFolder = path.join(rootFolder, "templates");

  for (const file of await readdir(templatesFolder)) {
    const fileName = file.replace(/\.template$/, "") as keyof typeof FileTypes;
    const templateFile = path.join(templatesFolder, file);
    let newFileName = `${fileName}.${FileTypes[fileName]}`;
    const paths: string[] = [];
    switch (fileName) {
      case "component":
        newFileName = newFileName.replace(/component/gm, "index");
      case "styles":
      case "types":
        paths.push("src");
        break;
      case "watch":
        paths.push("scripts");
        break;
    }
    const newFilePath = path.join(componentFolder, ...paths, newFileName);
    await writeFile({
      templatePath: templateFile,
      filePath: newFilePath,
      name: input,
    });
  }
};

main()
  .catch((err) => {
    handle.error("Something went wrong!\n\n" + err);
  })
  .then(() => {
    handle.success("Done!", true);
  });
