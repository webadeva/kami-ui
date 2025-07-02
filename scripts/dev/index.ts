import { checkbox } from "@inquirer/prompts";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const isReset = process.argv.includes("--reset");
const DEV_CONFIG_PATH = path.resolve("dev.json");
let devFileExists = fs.existsSync(DEV_CONFIG_PATH);

type Pkg = { name: string; path: string };
type DevJson = Record<string, boolean>;

const allPackages: Pkg[] = JSON.parse(
  execSync("pnpm m ls -r --json", { encoding: "utf8" }),
);

const filteredPackages = allPackages
  .filter((pkg) => pkg.name?.startsWith("@kami-ui/"))
  .map((pkg) => pkg.name)
  .sort();

// Load or create dev.json
let devJson: DevJson = {};
if (devFileExists && !isReset) {
  devJson = JSON.parse(fs.readFileSync(DEV_CONFIG_PATH, "utf8"));
} else {
  devJson = {};
}

// Add missing packages with default: false
let updated = false;
for (const pkg of filteredPackages) {
  if (!(pkg in devJson)) {
    devJson[pkg] = false;
    updated = true;
  }
}
if (updated) {
  fs.writeFileSync(DEV_CONFIG_PATH, JSON.stringify(devJson, null, 2));
}

// Prompt user
const main = async () => {
  const answer = await checkbox({
    message: "Select packages to run in dev mode:",
    choices: filteredPackages.map((pkg) => ({
      value: pkg,
      name: pkg,
      checked:
        devJson[pkg] || (devFileExists ? false : pkg.includes("storybook")),
    })),
    required: true,
  });

  if (!answer.length) {
    console.log("❌ No packages selected.");
    process.exit(1);
  }

  for (const pkg of filteredPackages) {
    devJson[pkg] = answer.includes(pkg);
  }
  fs.writeFileSync(DEV_CONFIG_PATH, JSON.stringify(devJson, null, 2));

  const filters = answer.map((pkg) => `${pkg}#dev`).join(" ");
  const cmd = `turbo run ${filters}`;
  console.log(`\n▶ Running: ${cmd}\n`);
  execSync(cmd, { stdio: "inherit" });
};

main();
