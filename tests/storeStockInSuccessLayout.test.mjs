import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const screenSource = readFileSync(
  resolve(
    "src/features/dashboard/components/officer/store/screens/OfficerStoreStockInSuccessScreen.tsx",
  ),
  "utf8",
);

assert.equal(
  screenSource.includes("max-w-[420px]"),
  false,
  "stock in success screen should not constrain content width with max-w",
);

assert.match(
  screenSource,
  /className="flex w-full flex-col items-center"/,
  "stock in success screen should keep the inner content wrapper full width",
);

console.log("store stock in success layout smoke test passed");
