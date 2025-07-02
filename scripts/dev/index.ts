import { checkbox } from "@inquirer/prompts";
import { execSync } from "node:child_process";

type Pkg = { name: string; path: string };

const allPackages: Pkg[] = JSON.parse(
  execSync("pnpm m ls -r --json", { encoding: "utf8" }),
);

const filteredPackages = allPackages
  .filter((pkg) => pkg.name?.startsWith("@kami-ui/"))
  .map((pkg) => pkg.name)
  .sort();

const main = async () => {
  const answer = await checkbox({
    message: "Select packages to run in dev mode:",
    choices: filteredPackages.map((pkg) => ({
      value: pkg,
      name: pkg,
      checked: pkg.includes("storybook") || pkg.includes("react-components"),
    })),
    required: true,
  });

  if (!answer.length) {
    console.log("❌ No packages selected.");
    process.exit(1);
  }

  const filters = answer.map((pkg) => `${pkg}#dev`).join(" ");
  const cmd = `turbo run ${filters}`;
  console.log(`\n▶ Running: ${cmd}\n`);
  execSync(cmd, { stdio: "inherit" });
};

main();
