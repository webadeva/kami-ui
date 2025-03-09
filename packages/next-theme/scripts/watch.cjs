const watch = require("node-watch");
const { exec } = require("child_process");
const { resolve } = require("path");

const fn = (event, name) => {
  const pwd = process.cwd();
  console.log(
    `File ${name} @ ${pwd} has been changed on ${new Date().toLocaleTimeString()}; building theme...\n\n`,
  );
  exec(
    `cd ../react-theme-common && pnpm build:no-lint && cd ../next-theme && pnpm build:no-lint`,
  );
};

watch(
  [
    "src",
    ...["index.ts", "helpers", "hooks", "utils"].map((e) =>
      resolve(`../react-theme-common/${e}`),
    ),
  ],
  { recursive: true },
  fn,
);
