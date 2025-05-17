// This is a init file. Will be completed in the next commit.

const main = async () => {
  const cwd = process.cwd();
  console.log(`Current working directory: ${cwd}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
