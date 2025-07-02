import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const tempDir = join("node_modules", ".temp");
const markerFile = join(tempDir, "first-build");

if (existsSync(markerFile)) {
  process.exit(0);
}

execSync("pnpm build", { stdio: "inherit" });

mkdirSync(tempDir, { recursive: true });
writeFileSync(markerFile, "built");

process.exit(0);
