import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const requiredFiles = [
  "src/app/dashboard/officer/store/stock-adjustment/page.tsx",
  "src/app/dashboard/officer/store/stock-adjustment/confirm/page.tsx",
  "src/app/dashboard/officer/store/stock-adjustment/success/page.tsx",
  "src/features/dashboard/components/officer/store/screens/OfficerStoreStockAdjustmentCreateScreen.tsx",
  "src/features/dashboard/components/officer/store/screens/OfficerStoreStockAdjustmentConfirmScreen.tsx",
  "src/features/dashboard/components/officer/store/screens/OfficerStoreStockAdjustmentSuccessScreen.tsx",
  "src/features/dashboard/utils/storeStockAdjustmentDraftStorage.ts",
];

for (const file of requiredFiles) {
  assert.equal(existsSync(resolve(file)), true, `${file} should exist`);
}

const createScreenSource = readFileSync(
  resolve(
    "src/features/dashboard/components/officer/store/screens/OfficerStoreStockAdjustmentCreateScreen.tsx",
  ),
  "utf8",
);

assert.match(createScreenSource, /Penyesuaian Stok/);
assert.match(createScreenSource, /Jenis penyesuaian/);
assert.match(createScreenSource, /Pengurangan/);
assert.match(createScreenSource, /Penambahan/);
assert.match(createScreenSource, /Alasan/);
assert.match(
  createScreenSource,
  /router\.push\("\/dashboard\/officer\/store\/stock-adjustment\/confirm"\)/,
);

const confirmScreenSource = readFileSync(
  resolve(
    "src/features/dashboard/components/officer/store/screens/OfficerStoreStockAdjustmentConfirmScreen.tsx",
  ),
  "utf8",
);

assert.match(confirmScreenSource, /Konfirmasi/);
assert.match(
  confirmScreenSource,
  /router\.push\("\/dashboard\/officer\/store\/stock-adjustment\/success"\)/,
);

const summaryCardSource = readFileSync(
  resolve(
    "src/features/dashboard/components/officer/store/common/StoreAdjustmentSummaryCard.tsx",
  ),
  "utf8",
);

assert.match(summaryCardSource, /Ringkasan mutasi/);
assert.match(summaryCardSource, /Jenis penyesuaian/);
assert.match(summaryCardSource, /Selisih stok/);
assert.match(summaryCardSource, /Alasan/);

const successScreenSource = readFileSync(
  resolve(
    "src/features/dashboard/components/officer/store/screens/OfficerStoreStockAdjustmentSuccessScreen.tsx",
  ),
  "utf8",
);

assert.match(successScreenSource, /Hooray!/);
assert.match(successScreenSource, /Anda berhasil menyesuaikan stok/);
assert.match(
  successScreenSource,
  /href="\/dashboard\/officer\/store\/stock-adjustment"/,
);

console.log("store stock adjustment flow smoke test passed");
