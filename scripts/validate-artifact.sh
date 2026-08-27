#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

worker="${SITES_PROJECT_ROOT}/dist/server/index.js"
asset_manifest="${SITES_PROJECT_ROOT}/dist/client/.vite/manifest.json"

[[ -f "${worker}" ]] || {
  echo "Missing Cloudflare Worker entry: dist/server/index.js" >&2
  exit 66
}
[[ -f "${asset_manifest}" ]] || {
  echo "Missing client asset manifest: dist/client/.vite/manifest.json" >&2
  exit 66
}

node --input-type=module - "${worker}" <<'NODE'
import { pathToFileURL } from "node:url";

const [workerPath] = process.argv.slice(2);

const workerUrl = pathToFileURL(workerPath);
workerUrl.searchParams.set("sites-validation", `${process.pid}-${Date.now()}`);
const worker = await import(workerUrl.href);
if (!worker.default || typeof worker.default.fetch !== "function") {
  throw new Error("dist/server/index.js must have an ESM default export with fetch(request, env, ctx)");
}
NODE

echo "Validated Cloudflare artifact: ESM Worker default.fetch and client assets are present."
