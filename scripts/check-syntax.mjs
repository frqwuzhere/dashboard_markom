import { readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

async function collectJavaScriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectJavaScriptFiles(fullPath);
      return /\.(?:js|mjs|cjs)$/.test(entry.name) ? [fullPath] : [];
    }),
  );

  return nested.flat().sort();
}

const sourceDirectories = ["netlify/functions", "public/js"];
const files = (
  await Promise.all(sourceDirectories.map(collectJavaScriptFiles))
).flat();
let failed = false;

for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], {
    stdio: "inherit",
  });

  if (result.error) {
    console.error(`Could not check ${file}: ${result.error.message}`);
    process.exitCode = 1;
    failed = true;
    break;
  }

  if (result.status !== 0) {
    process.exitCode = result.status || 1;
    failed = true;
    break;
  }
}

if (!failed) {
  console.log(`Syntax checked ${files.length} JavaScript files.`);
}
