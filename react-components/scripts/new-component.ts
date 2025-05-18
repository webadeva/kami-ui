import chalk from "chalk";
import { execSync } from "child_process";
import { existsSync } from "fs";
import {
  mkdir,
  readdir,
  readFile,
  rm,
  writeFile as writeFileFs,
} from "fs/promises";
import path from "path";
import readline from "readline/promises";

enum FileTypes {
  component = "tsx",
  eslint = "config.mjs",
  package = "json",
  readme = "md",
  rollup = "config.mjs",
  styles = "ts",
  tsconfig = "json",
  types = "ts",
  watch = "cjs",
}

const scanner = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const handle = {
  error: (message: string) => {
    console.error(chalk.redBright.bold(`\n${message}\n`));
    scanner.close();
    process.exit(1);
  },
  info: (message: string) => {
    console.log(chalk.blueBright.bold(`\n${message}`));
  },
  warn: (message: string) => {
    console.warn(chalk.yellowBright.bold(`\n${message}`));
  },
  success: (message: string, isFinal: boolean = false) => {
    console.log(chalk.greenBright.bold(`\n${message}`));
    if (!isFinal) return;
    console.log("\n");
    scanner.close();
    handle.info("Installing dependencies...");
    execSync("pnpm install", { stdio: "inherit" });
    process.exit(0);
  },
  log: (message: string) => {
    console.log(chalk.whiteBright.bold(`\n${message}`));
  },
};

const transform = {
  capitalize: (str: string) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),

  removeSpaces: (str: string) => str.replace(/\s+/gm, ""),
  kebabCase: (str: string) =>
    str
      .split(" ")
      .map((word) => word.toLowerCase())
      .join("-"),
  lowerCase: (str: string) => str.toLowerCase(),
};

const TransformWordsMap: Record<string, (keyof typeof transform)[]> = {
  "<COMPONENT_NAME_TEXT>": ["capitalize"],
  "<COMPONENT_NAME>": ["capitalize", "removeSpaces"],
  "<COMPONENT_NAME_LOWERCASE_KEBAB>": ["lowerCase", "kebabCase"],
};

const validations = (input: string) => {
  if (!input) {
    handle.error("Component name must not be empty!");
  }

  if (!/^[a-zA-Z ]+$/.test(input)) {
    handle.error(
      "Component name must not have any special characters or numbers!",
    );
  }
};

const writeFile = async ({
  templatePath,
  filePath,
  name,
}: {
  templatePath: string;
  filePath: string;
  name: string;
}) => {
  let template = await readFile(templatePath, "utf-8");
  for (const [key, transformMethods] of Object.entries(TransformWordsMap)) {
    let transformedName = name;
    for (const method of transformMethods) {
      const fn = transform[method];
      transformedName = fn(transformedName);
    }
    template = template.replaceAll(key, transformedName);
  }
  // write the file -- first create the folder if it doesn't exist
  // for example a/b/c/file.txt
  // should create a/b/c if it doesn't exist

  const folderPath = filePath.split(path.sep).slice(0, -1).join(path.sep);
  if (!existsSync(folderPath)) {
    await mkdir(folderPath, { recursive: true });
  }

  writeFileFs(filePath, template, {
    encoding: "utf-8",
  });
};

const main = async () => {
  const input = (
    await scanner.question(
      chalk.whiteBright.bold(
        "Enter component name (e.g.: my new component) : ",
      ),
    )
  )
    .trim()
    .toLowerCase();

  validations(input);

  handle.info(`Creating component ${transform.capitalize(input)}...`);

  const cwd = process.cwd();
  const rootFolder = path.join(cwd, "react-components");

  const componentFolder = path.join(rootFolder, transform.kebabCase(input));
  if (existsSync(componentFolder)) {
    handle.warn(
      `Folder ${transform.kebabCase(input)} already exists!\nDelete contents?`,
    );

    const deleteContents = (
      await scanner.question("Type 'yes' to delete contents: ")
    )
      .trim()
      .toLowerCase()
      .charAt(0);

    if (deleteContents === "y" || deleteContents === "") {
      handle.info(`Deleting contents of ${transform.kebabCase(input)}...`);
      await rm(componentFolder, { recursive: true });
      await mkdir(componentFolder, { recursive: true });
    } else {
      handle.error("Aborting...");
    }
  } else {
    await mkdir(componentFolder, { recursive: true });
  }

  const templatesFolder = path.join(rootFolder, "templates");

  // loop through all files in templates folder and print names
  for (const file of await readdir(templatesFolder)) {
    const fileName = file.replace(/\.template$/, "") as keyof typeof FileTypes;
    const templateFile = path.join(templatesFolder, file);
    let newFileName = `${fileName}.${FileTypes[fileName]}`;
    const paths: string[] = [];
    switch (fileName) {
      case "component":
        newFileName = newFileName.replace(/component/g, "index");
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
