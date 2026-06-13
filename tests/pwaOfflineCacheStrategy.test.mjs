import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const requiredFiles = [
  "public/sw.js",
  "src/app/offline/page.tsx",
];

for (const file of requiredFiles) {
  assert.equal(existsSync(resolve(file)), true, `${file} should exist`);
}

const serviceWorkerSource = readFileSync(resolve("public/sw.js"), "utf8");
const offlinePageSource = readFileSync(resolve("src/app/offline/page.tsx"), "utf8");

assert.match(serviceWorkerSource, /lumbera-static-v2|lumbera-static-v3/);
assert.match(serviceWorkerSource, /lumbera-runtime-v2|lumbera-runtime-v3/);
assert.match(serviceWorkerSource, /\/offline/);
assert.match(serviceWorkerSource, /request\.mode === "navigate"/);
assert.match(serviceWorkerSource, /caches\.match\(OFFLINE_URL\)|caches\.match\("\/offline"\)/);
assert.match(serviceWorkerSource, /url\.pathname\.startsWith\("\/api\/"\)/);
assert.match(serviceWorkerSource, /_next\/static|STATIC_ASSET_PATTERN|font|image/);

assert.match(offlinePageSource, /Koneksi lagi tidak tersedia|offline/i);
assert.match(offlinePageSource, /Install PWA|Coba lagi|Buka lagi/);

console.log("pwa offline cache strategy smoke test passed");
