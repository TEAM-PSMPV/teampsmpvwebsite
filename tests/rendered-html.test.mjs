import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
  assert.match(html, /calabi-yau-poster\.png/);
  assert.match(html, /CALABI YAU SURFACE/);
  assert.match(html, /surface-bridge-title/);
  assert(html.indexOf('id="proof-title"') < html.indexOf('id="assembly-title"'));
  assert(!html.includes("C:/Shishir"), "font assets must use public URLs");
});

test("ships the complete supplied model and its fallback image", async () => {
  const source = await readFile(new URL("../public/models/calabi_yau_surface.glb", import.meta.url));
  const emitted = await readFile(new URL("../dist/client/models/calabi_yau_surface.glb", import.meta.url));
  assert.equal(emitted.toString("ascii", 0, 4), "glTF");
  assert.equal(emitted.readUInt32LE(4), 2);
  assert.equal(emitted.readUInt32LE(8), emitted.length);
  assert.deepEqual(emitted, source);
  const poster = await readFile(new URL("../dist/client/images/calabi-yau-poster.png", import.meta.url));
  assert.equal(poster.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
});
