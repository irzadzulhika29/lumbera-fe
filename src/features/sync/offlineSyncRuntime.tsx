"use client";

import { useEffect, useRef } from "react";

import {
  getAllOfflineSyncOperations,
  getCachedEntityRecords,
  getOfflineSyncOperationsByStatuses,
  putCachedEntityRecords,
  putSyncMetaRecord,
  updateOfflineSyncOperationStatus,
  type CachedEntityRecord,
  type OfflineSyncOperation,
} from "./offlineSyncDb";
import {
  getSyncBootstrap,
  getSyncConfig,
  getSyncStatus,
  pushSyncOperations,
  type SyncBootstrapResponse,
} from "./syncApi";

function hasAuthSession() {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(window.localStorage.getItem("lumbera.auth-session"));
}

function getOperationReferenceId(operation: OfflineSyncOperation) {
  const payload = operation.payload;

  if (typeof payload.client_transaction_id === "string") {
    return payload.client_transaction_id;
  }

  if (typeof payload.client_reference_id === "string") {
    return payload.client_reference_id;
  }

  if (typeof payload.client_sale_id === "string") {
    return payload.client_sale_id;
  }

  return "";
}

function buildCachedEntityRecords(
  entityType: string,
  items: Record<string, unknown>[],
): CachedEntityRecord[] {
  const updated_at = new Date().toISOString();

  return items.map((item, index) => {
    const entity_id =
      (typeof item.transaction_id === "string" && item.transaction_id) ||
      (typeof item.member_id === "string" && item.member_id) ||
      (typeof item.product_id === "string" && item.product_id) ||
      (typeof item.movement_id === "string" && item.movement_id) ||
      `${entityType}-${index}`;

    return {
      key: `${entityType}:${entity_id}`,
      entity_id,
      entity_type: entityType,
      data: item,
      updated_at,
    };
  });
}

async function bootstrapOfflineCache() {
  const existingTransactions = await getCachedEntityRecords("transaction");

  if (existingTransactions.length > 0) {
    return;
  }

  const response = await getSyncBootstrap();
  const records = [
    ...buildCachedEntityRecords("member", response.data.members),
    ...buildCachedEntityRecords("product", response.data.products),
    ...buildCachedEntityRecords("transaction", response.data.transactions),
    ...buildCachedEntityRecords("movement", response.data.movements),
  ];

  await putCachedEntityRecords(records);
  await putSyncMetaRecord({
    key: "last_bootstrap_at",
    value: response.data.server_time,
    updated_at: response.data.server_time,
  });
  await putSyncMetaRecord({
    key: "last_sync_cursor",
    value: response.data.sync_cursor,
    updated_at: response.data.server_time,
  });
}

async function recoverSyncingOperations() {
  const syncingOperations = await getOfflineSyncOperationsByStatuses(["syncing"]);

  if (syncingOperations.length === 0) {
    return;
  }

  const client_transaction_ids = syncingOperations
    .map(getOperationReferenceId)
    .filter(Boolean);

  if (client_transaction_ids.length === 0) {
    await Promise.all(
      syncingOperations.map((operation) =>
        updateOfflineSyncOperationStatus(operation.client_operation_id, "retryable_error", {
          incrementRetryCount: true,
          last_error: "Referensi operasi lokal tidak ditemukan.",
        }),
      ),
    );
    return;
  }

  const response = await getSyncStatus({ client_transaction_ids });
  const results = response.data;

  await Promise.all(
    syncingOperations.map(async (operation) => {
      const operationReferenceId = getOperationReferenceId(operation);
      const matchedResult = results.find(
        (result) => result.client_reference_id === operationReferenceId,
      );

      if (!matchedResult) {
        await updateOfflineSyncOperationStatus(
          operation.client_operation_id,
          "rejected",
          {
            last_error: "Operasi belum ditemukan di server.",
          },
        );
        return;
      }

      if (matchedResult.status === "synced") {
        await updateOfflineSyncOperationStatus(operation.client_operation_id, "synced");

        if (matchedResult.data && matchedResult.entity_type) {
          await putCachedEntityRecords([
            {
              key: `${matchedResult.entity_type}:${matchedResult.server_id}`,
              entity_id: matchedResult.server_id,
              entity_type: matchedResult.entity_type,
              data: matchedResult.data,
              updated_at: new Date().toISOString(),
            },
          ]);
        }

        return;
      }

      await updateOfflineSyncOperationStatus(
        operation.client_operation_id,
        matchedResult.status,
        {
          incrementRetryCount: matchedResult.status === "retryable_error",
          last_error: matchedResult.message,
        },
      );
    }),
  );
}

async function flushOfflineOperations() {
  const config = await getSyncConfig();
  const maxBatchSize = config.data.max_batch_size || 50;

  await putSyncMetaRecord({
    key: "sync_config",
    value: JSON.stringify(config.data),
    updated_at: new Date().toISOString(),
  });

  const queue = await getOfflineSyncOperationsByStatuses([
    "pending",
    "retryable_error",
  ]);
  const operations = queue.slice(0, maxBatchSize);

  if (operations.length === 0) {
    return;
  }

  await Promise.all(
    operations.map((operation) =>
      updateOfflineSyncOperationStatus(operation.client_operation_id, "syncing", {
        last_error: undefined,
      }),
    ),
  );

  const response = await pushSyncOperations(operations);
  const syncedAt = response.data.server_time;

  await Promise.all(
    response.data.results.map(async (result) => {
      if (result.status === "synced") {
        await updateOfflineSyncOperationStatus(result.client_operation_id, "synced");

        if (result.data && result.entity_type) {
          await putCachedEntityRecords([
            {
              key: `${result.entity_type}:${result.server_id}`,
              entity_id: result.server_id,
              entity_type: result.entity_type,
              data: result.data,
              updated_at: syncedAt,
            },
          ]);
        }

        return;
      }

      await updateOfflineSyncOperationStatus(
        result.client_operation_id,
        result.status,
        {
          incrementRetryCount: result.status === "retryable_error",
          last_error: result.message,
        },
      );
    }),
  );

  await putSyncMetaRecord({
    key: "last_sync_cursor",
    value: response.data.next_pull_cursor,
    updated_at: syncedAt,
  });
}

async function runOfflineSyncCycle() {
  if (!hasAuthSession()) {
    return;
  }

  if (typeof window !== "undefined" && !window.navigator.onLine) {
    return;
  }

  await bootstrapOfflineCache();
  await recoverSyncingOperations();
  await flushOfflineOperations();
  await getAllOfflineSyncOperations();
}

export default function OfflineSyncRuntime() {
  const isRunningRef = useRef(false);

  useEffect(() => {
    const run = async () => {
      if (isRunningRef.current) {
        return;
      }

      isRunningRef.current = true;

      try {
        await runOfflineSyncCycle();
      } catch {
        // Keep runtime silent for MVP while queue remains local.
      } finally {
        isRunningRef.current = false;
      }
    };

    void run();

    const handleOnline = () => {
      void run();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return null;
}
