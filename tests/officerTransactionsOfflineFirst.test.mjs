import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const requiredFiles = [
  "src/features/dashboard/utils/officerTransactionOfflineStorage.ts",
  "src/features/sync/offlineSyncDb.ts",
  "src/features/sync/syncApi.ts",
  "src/features/sync/offlineSyncRuntime.tsx",
  "src/features/dashboard/components/officer/screens/OfficerTransactionConfirmScreen.tsx",
  "src/features/dashboard/components/officer/screens/OfficerTransactionsScreen.tsx",
];

for (const file of requiredFiles) {
  assert.equal(existsSync(resolve(file)), true, `${file} should exist`);
}

const storageSource = readFileSync(
  resolve("src/features/dashboard/utils/officerTransactionOfflineStorage.ts"),
  "utf8",
);
const syncDbSource = readFileSync(
  resolve("src/features/sync/offlineSyncDb.ts"),
  "utf8",
);
const syncApiSource = readFileSync(resolve("src/features/sync/syncApi.ts"), "utf8");
const syncRuntimeSource = readFileSync(
  resolve("src/features/sync/offlineSyncRuntime.tsx"),
  "utf8",
);
const confirmSource = readFileSync(
  resolve("src/features/dashboard/components/officer/screens/OfficerTransactionConfirmScreen.tsx"),
  "utf8",
);
const layoutSource = readFileSync(resolve("src/app/layout.tsx"), "utf8");
const listSource = readFileSync(
  resolve("src/features/dashboard/components/officer/screens/OfficerTransactionsScreen.tsx"),
  "utf8",
);

assert.match(syncDbSource, /indexedDB/);
assert.match(syncDbSource, /offline_operations/);
assert.match(syncDbSource, /cached_entities/);
assert.match(syncDbSource, /sync_meta/);
assert.match(syncDbSource, /client_operation_id/);
assert.match(syncDbSource, /device_id|deviceId/);

assert.match(syncApiSource, /\/sync\/config/);
assert.match(syncApiSource, /\/sync\/bootstrap/);
assert.match(syncApiSource, /\/sync\/push/);
assert.match(syncApiSource, /\/sync\/status/);
assert.match(syncRuntimeSource, /getSyncConfig/);
assert.match(syncRuntimeSource, /getSyncBootstrap/);
assert.match(syncRuntimeSource, /pushSyncOperations/);
assert.match(syncRuntimeSource, /getSyncStatus/);
assert.match(syncRuntimeSource, /window\.addEventListener\("online"/);
assert.match(syncRuntimeSource, /syncing|retryable_error|pending/);
assert.match(syncRuntimeSource, /cached_entities|last_sync_cursor|last_bootstrap_at/);
assert.match(layoutSource, /OfflineSyncRuntime/);

assert.match(storageSource, /pending|PENDING|retryable_error/);
assert.match(storageSource, /saveOfflineOfficerTransaction/);
assert.match(storageSource, /getOfflineOfficerTransactions/);
assert.match(storageSource, /countOfflineOfficerTransactions/);
assert.match(storageSource, /mapOfflineOfficerTransactionToDashboardTransaction/);
assert.match(storageSource, /offline_operations|client_operation_id|operation_type/);

assert.match(confirmSource, /saveOfflineOfficerTransaction/);
assert.match(confirmSource, /CREATE_SAVINGS_TRANSACTION|CREATE_LOAN_TRANSACTION|CREATE_INSTALLMENT_TRANSACTION|CREATE_CASH_WITHDRAWAL/);
assert.match(confirmSource, /navigator\.onLine|offline/i);
assert.match(confirmSource, /Pending|menunggu sinkronisasi/i);
assert.match(confirmSource, /router\.push/);

assert.match(listSource, /getOfflineOfficerTransactions/);
assert.match(listSource, /countOfflineOfficerTransactions/);
assert.match(listSource, /merge|pending/i);
assert.doesNotMatch(listSource, /3 transaksi menunggu sinkronisasi/);

console.log("officer transactions offline-first smoke test passed");
