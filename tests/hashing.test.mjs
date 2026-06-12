import assert from "node:assert/strict";

const { sha256Hex } = await import("../src/shared/utils/hashing.ts");

assert.equal(
  await sha256Hex("3215010101900003"),
  "41bc602004fe4638e3039d0b1653a47b5d612016b29fffb3ffc6a18911162a79",
);

console.log("hashing smoke test passed");
