import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = resolve(import.meta.dirname, "..");
const workerPath = resolve(projectRoot, "dist/server/index.js");
const assetManifestPath = resolve(projectRoot, "dist/client/.vite/manifest.json");

async function requireFile(path, label) {
  try {
    await access(path, constants.R_OK);
  } catch {
    throw new Error(`Missing ${label}: ${path.replace(`${projectRoot}/`, "")}`);
  }
}

await requireFile(workerPath, "Cloudflare Worker entry");
await requireFile(assetManifestPath, "client asset manifest");

const workerUrl = pathToFileURL(workerPath);
workerUrl.searchParams.set("sites-validation", `${process.pid}-${Date.now()}`);
const worker = await import(workerUrl.href);

if (!worker.default || typeof worker.default.fetch !== "function") {
  throw new Error(
    "dist/server/index.js must have an ESM default export with fetch(request, env, ctx)",
  );
}

console.log(
  "Validated Cloudflare artifact: ESM Worker default.fetch and client assets are present.",
);
