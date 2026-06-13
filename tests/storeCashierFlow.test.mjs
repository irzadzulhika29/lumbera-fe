import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const requiredFiles = [
  "src/app/dashboard/officer/store/cashier/page.tsx",
  "src/app/dashboard/officer/store/cashier/checkout/page.tsx",
  "src/app/dashboard/officer/store/cashier/success/page.tsx",
  "src/features/dashboard/components/officer/store/screens/OfficerStoreCashierScreen.tsx",
  "src/features/dashboard/components/officer/store/screens/OfficerStoreCashierCheckoutScreen.tsx",
  "src/features/dashboard/components/officer/store/screens/OfficerStoreCashierSuccessScreen.tsx",
  "src/features/dashboard/utils/storeCashierDraftStorage.ts",
];

for (const file of requiredFiles) {
  assert.equal(existsSync(resolve(file)), true, `${file} should exist`);
}

const storeDataSource = readFileSync(
  resolve("src/features/dashboard/storeData.ts"),
  "utf8",
);

assert.match(
  storeDataSource,
  /label: "Kasir"[\s\S]*href: "\/dashboard\/officer\/store\/cashier"/,
  "Kasir action should point to the cashier route",
);

assert.doesNotMatch(
  storeDataSource,
  /name: "Beras Premium"[\s\S]{0,120}initials: "AA"/,
  "Beras Premium should no longer use AA as initials",
);

const cashierScreenSource = readFileSync(
  resolve(
    "src/features/dashboard/components/officer/store/screens/OfficerStoreCashierScreen.tsx",
  ),
  "utf8",
);

assert.match(cashierScreenSource, /Kasir Padiwangi/);
assert.match(cashierScreenSource, /Cari produk/);
assert.match(cashierScreenSource, /Lihat detail/);
assert.match(cashierScreenSource, /Bayar tunai/);
assert.match(cashierScreenSource, /<PressButton/);
assert.match(cashierScreenSource, /rounded-t-\[10px\]/);
assert.match(cashierScreenSource, /AnimatePresence/);
assert.match(cashierScreenSource, /motion\.div/);
assert.match(cashierScreenSource, /setIsDetailOpen\(true\)/);
assert.match(cashierScreenSource, /if \(currentQuantity > 0\)/);
assert.match(
  cashierScreenSource,
  /router\.push\("\/dashboard\/officer\/store\/cashier\/checkout"\)/,
);

const checkoutScreenSource = readFileSync(
  resolve(
    "src/features/dashboard/components/officer/store/screens/OfficerStoreCashierCheckoutScreen.tsx",
  ),
  "utf8",
);

assert.match(checkoutScreenSource, /Ringkasan pembelian/);
assert.match(checkoutScreenSource, /Uang diterima/);
assert.match(checkoutScreenSource, /Kembalian/);
assert.match(checkoutScreenSource, /Proses Pembayaran/);
assert.match(
  checkoutScreenSource,
  /router\.push\("\/dashboard\/officer\/store\/cashier\/success"\)/,
);

const successScreenSource = readFileSync(
  resolve(
    "src/features/dashboard/components/officer/store/screens/OfficerStoreCashierSuccessScreen.tsx",
  ),
  "utf8",
);

assert.match(successScreenSource, /Pembayaran telah berhasil!/);
assert.match(successScreenSource, /Cetak Struk/);
assert.match(successScreenSource, /Transaksi Baru/);
assert.match(successScreenSource, /motion\./);

const cashierHeaderSource = readFileSync(
  resolve(
    "src/features/dashboard/components/officer/store/common/StoreCashierHeader.tsx",
  ),
  "utf8",
);

assert.match(cashierHeaderSource, /solar:home-2-linear/);

console.log("store cashier flow smoke test passed");
