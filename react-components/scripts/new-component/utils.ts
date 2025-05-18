import chalk from "chalk";
import { execSync } from "child_process";
import { existsSync } from "fs";
import { mkdir, readFile, rm, writeFile as writeFileFs } from "fs/promises";
import path from "path";
import readline from "readline/promises";
import { TransformWordsMap } from "./constants";

export const scanner = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const handle = {
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
  input: async () =>
    (
      await scanner.question(
        chalk.whiteBright.bold(
          "Enter component name (e.g.: my new component) : ",
        ),
      )
    )
      .trim()
      .toLowerCase(),
};

export const transform = {
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

export const validations = (input: string) => {
  if (!input) {
    handle.error("Component name must not be empty!");
  }

  if (!/^[a-zA-Z ]+$/.test(input)) {
    handle.error(
      "Component name must not have any special characters or numbers!",
    );
  }
};

export const writeFile = async ({
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

  const folderPath = filePath.split(path.sep).slice(0, -1).join(path.sep);
  if (!existsSync(folderPath)) {
    await mkdir(folderPath, { recursive: true });
  }

  writeFileFs(filePath, template, {
    encoding: "utf-8",
  });
};

export const makeComponentFolder = async ({
  folderPath,
  componentNameUserInput,
}: {
  folderPath: string;
  componentNameUserInput: string;
}) => {
  if (existsSync(folderPath)) {
    handle.warn(
      `Folder ${transform.kebabCase(componentNameUserInput)} already exists!\nDelete contents?`,
    );

    const deleteContents = (
      await scanner.question("Type 'yes' to delete contents: ")
    )
      .trim()
      .toLowerCase()
      .charAt(0);

    if (deleteContents === "y" || deleteContents === "") {
      handle.info(
        `Deleting contents of ${transform.kebabCase(componentNameUserInput)}...`,
      );
      await rm(folderPath, { recursive: true });
      await mkdir(folderPath, { recursive: true });
    } else {
      handle.error("Aborting...");
    }
  } else {
    await mkdir(folderPath, { recursive: true });
  }
};
