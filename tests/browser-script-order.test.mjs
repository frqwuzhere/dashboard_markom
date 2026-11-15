import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("deferred browser scripts retain the shared-global dependency order", async () => {
  const html = await readFile(
    new URL("../public/index.html", import.meta.url),
    "utf8",
  );
  const scripts = [
    "/vendor/lucide.min.js",
    "/vendor/echarts.min.js",
    "/js/social-dashboard.js",
    "/js/api-client.js",
    "/js/app.js",
    "/js/app-content.js",
    "/js/app-home.js",
    "/js/app-sections.js",
    "/js/app-forms.js",
    "/js/app-actions.js",
    "/js/app-bootstrap.js",
  ];
  const positions = scripts.map((script) => html.indexOf(`src="${script}"`));

  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.match(
    html,
    /<script src="\/js\/api-client\.js" defer><\/script>\s*<script src="\/js\/app\.js" defer><\/script>/,
  );
});
