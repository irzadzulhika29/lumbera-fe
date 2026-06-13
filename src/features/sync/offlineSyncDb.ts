"use client";

const OFFLINE_SYNC_DB_NAME = "lumbera-offline-sync";
const OFFLINE_SYNC_DB_VERSION = 1;

export const OFFLINE_OPERATIONS_STORE = "offline_operations";
export const CACHED_ENTITIES_STORE = "cached_entities";
export const SYNC_META_STORE = "sync_meta";

export type OfflineSyncOperationStatus =
  | "pending"
  | "syncing"
  | "synced"
  | "rejected"
  | "retryable_error";

export type OfflineSyncOperation = {
  client_operation_id: string;
  operation_type: string;
  recorded_at: string;
  payload: Record<string, unknown>;
  status: OfflineSyncOperationStatus;
  retry_count: number;
  last_error?: string;
  created_at: string;
  updated_at: string;
  preview?: {
    amount: number;
    description: string;
    member_id: string;
    member_name: string;
    member_number: string;
    transaction_group: "SIMPANAN" | "PINJAMAN" | "ANGSURAN" | "PENARIKAN";
    transaction_type_label: string;
  };
};

export type CachedEntityRecord = {
  key: string;
  entity_id: string;
  entity_type: string;
  data: Record<string, unknown>;
  updated_at: string;
};

export type SyncMetaRecord = {
  key: string;
  value: string;
  updated_at: string;
};

let offlineSyncDbPromise: Promise<IDBDatabase> | null = null;

function canUseIndexedDb() {
  return typeof window !== "undefined" && "indexedDB" in window;
}

function requestToPromise<T>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed"));
  });
}

function transactionCompleteToPromise(transaction: IDBTransaction) {
  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("IndexedDB transaction failed"));
    transaction.onabort = () =>
      reject(transaction.error ?? new Error("IndexedDB transaction aborted"));
  });
}

function upgradeOfflineSyncDb(database: IDBDatabase) {
  if (!database.objectStoreNames.contains(OFFLINE_OPERATIONS_STORE)) {
    const store = database.createObjectStore(OFFLINE_OPERATIONS_STORE, {
      keyPath: "client_operation_id",
    });

    store.createIndex("status", "status", { unique: false });
    store.createIndex("operation_type", "operation_type", { unique: false });
    store.createIndex("updated_at", "updated_at", { unique: false });
  }

  if (!database.objectStoreNames.contains(CACHED_ENTITIES_STORE)) {
    const store = database.createObjectStore(CACHED_ENTITIES_STORE, {
      keyPath: "key",
    });

    store.createIndex("entity_type", "entity_type", { unique: false });
    store.createIndex("updated_at", "updated_at", { unique: false });
  }

  if (!database.objectStoreNames.contains(SYNC_META_STORE)) {
    database.createObjectStore(SYNC_META_STORE, {
      keyPath: "key",
    });
  }
}

export function openOfflineSyncDb() {
  if (!canUseIndexedDb()) {
    return Promise.reject(new Error("IndexedDB is not available in this environment."));
  }

  if (!offlineSyncDbPromise) {
    offlineSyncDbPromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(
        OFFLINE_SYNC_DB_NAME,
        OFFLINE_SYNC_DB_VERSION,
      );

      request.onupgradeneeded = () => {
        upgradeOfflineSyncDb(request.result);
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () =>
        reject(request.error ?? new Error("Failed to open IndexedDB."));
    });
  }

  return offlineSyncDbPromise;
}

async function runReadonlyQuery<T>(
  storeName: string,
  query: (store: IDBObjectStore) => IDBRequest<T>,
) {
  const database = await openOfflineSyncDb();
  const transaction = database.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);
  const result = await requestToPromise(query(store));
  await transactionCompleteToPromise(transaction);
  return result;
}

async function runReadwriteQuery<T>(
  storeName: string,
  query: (store: IDBObjectStore) => IDBRequest<T>,
) {
  const database = await openOfflineSyncDb();
  const transaction = database.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  const result = await requestToPromise(query(store));
  await transactionCompleteToPromise(transaction);
  return result;
}

export async function putOfflineSyncOperation(operation: OfflineSyncOperation) {
  await runReadwriteQuery(OFFLINE_OPERATIONS_STORE, (store) => store.put(operation));
}

export async function getOfflineSyncOperation(client_operation_id: string) {
  const record = await runReadonlyQuery(OFFLINE_OPERATIONS_STORE, (store) =>
    store.get(client_operation_id),
  );

  return (record as OfflineSyncOperation | undefined) ?? null;
}

export async function getAllOfflineSyncOperations() {
  const items =
    (await runReadonlyQuery(OFFLINE_OPERATIONS_STORE, (store) => store.getAll())) ?? [];

  return items as OfflineSyncOperation[];
}

export async function getOfflineSyncOperationsByStatuses(
  statuses: OfflineSyncOperationStatus[],
) {
  const items = await getAllOfflineSyncOperations();

  return items.filter((item) => statuses.includes(item.status));
}

export async function countOfflineSyncOperationsByStatuses(
  statuses: OfflineSyncOperationStatus[],
) {
  const items = await getOfflineSyncOperationsByStatuses(statuses);
  return items.length;
}

export async function updateOfflineSyncOperation(
  client_operation_id: string,
  updater: (current: OfflineSyncOperation) => OfflineSyncOperation,
) {
  const current = await getOfflineSyncOperation(client_operation_id);

  if (!current) {
    return null;
  }

  const next = updater(current);
  await putOfflineSyncOperation(next);
  return next;
}

export async function updateOfflineSyncOperationStatus(
  client_operation_id: string,
  status: OfflineSyncOperationStatus,
  options: {
    incrementRetryCount?: boolean;
    last_error?: string;
  } = {},
) {
  return updateOfflineSyncOperation(client_operation_id, (current) => ({
    ...current,
    status,
    retry_count: options.incrementRetryCount
      ? current.retry_count + 1
      : current.retry_count,
    last_error: options.last_error,
    updated_at: new Date().toISOString(),
  }));
}

export async function putCachedEntityRecord(record: CachedEntityRecord) {
  await runReadwriteQuery(CACHED_ENTITIES_STORE, (store) => store.put(record));
}

export async function putCachedEntityRecords(records: CachedEntityRecord[]) {
  if (records.length === 0) {
    return;
  }

  const database = await openOfflineSyncDb();
  const transaction = database.transaction(CACHED_ENTITIES_STORE, "readwrite");
  const store = transaction.objectStore(CACHED_ENTITIES_STORE);

  records.forEach((record) => {
    store.put(record);
  });

  await transactionCompleteToPromise(transaction);
}

export async function getCachedEntityRecords(entityType: string) {
  const items =
    (await runReadonlyQuery(CACHED_ENTITIES_STORE, (store) => store.getAll())) ?? [];

  return (items as CachedEntityRecord[]).filter(
    (item) => item.entity_type === entityType,
  );
}

export async function putSyncMetaRecord(record: SyncMetaRecord) {
  await runReadwriteQuery(SYNC_META_STORE, (store) => store.put(record));
}

export async function getSyncMetaRecord(key: string) {
  const record = await runReadonlyQuery(SYNC_META_STORE, (store) => store.get(key));
  return (record as SyncMetaRecord | undefined) ?? null;
}

export async function getOrCreateOfflineDeviceId() {
  const existingRecord = await getSyncMetaRecord("device_id");

  if (existingRecord?.value) {
    return existingRecord.value;
  }

  const device_id = crypto.randomUUID();
  const updated_at = new Date().toISOString();

  await putSyncMetaRecord({
    key: "device_id",
    value: device_id,
    updated_at,
  });

  return device_id;
}
