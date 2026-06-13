import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const screenSource = readFileSync(
  resolve(
    "src/features/dashboard/components/officer/store/screens/OfficerStoreStockInCreateScreen.tsx",
  ),
  "utf8",
);

assert.match(
  screenSource,
  /className="flex min-h-full flex-col bg-white"/,
  "stock in screen should use a full-height flex column shell",
);

assert.match(
  screenSource,
  /className="sticky bottom-0 mt-auto border-t border-\[#e2e6ea\] bg-white\/96 px-4 pb-\[calc\(1rem\+env\(safe-area-inset-bottom\)\)\] pt-4 backdrop-blur"/,
  "stock in screen should keep the Lanjut CTA in a sticky bottom thumb zone",
);

console.log("store stock in layout smoke test passed");
