"use client";

import { apiClient } from "@/src/shared/api";
import { getAuthSession } from "@/src/features/auth/utils/authSessionStorage";

import {
  getOrCreateOfflineDeviceId,
  type OfflineSyncOperation,
} from "./offlineSyncDb";

type SyncStatusResponseItem = {
  status: "synced" | "rejected" | "retryable_error";
  entity_type: string;
  server_id: string;
  client_reference_id?: string;
  data?: Record<string, unknown>;
  message?: string;
};

type SyncResponseStatus = {
  code: number;
  isSuccess: boolean;
};

export type SyncConfigResponse = {
  status: SyncResponseStatus;
  message: string;
  data: {
    max_batch_size: number;
    retry_backoff_seconds: number[];
    supported_operations: string[];
  };
};

export type SyncBootstrapResponse = {
  status: SyncResponseStatus;
  message: string;
  data: {
    server_time: string;
    members: Record<string, unknown>[];
    products: Record<string, unknown>[];
    transactions: Record<string, unknown>[];
    movements: Record<string, unknown>[];
    sync_cursor: string;
  };
};

export type SyncPushResponse = {
  status: SyncResponseStatus;
  message: string;
  data: {
    batch_id: string;
    server_time: string;
    results: Array<
      SyncStatusResponseItem & {
        client_operation_id: string;
        operation_type: string;
        synced_at?: string;
      }
    >;
    next_pull_cursor: string;
  };
};

export type SyncStatusResponse = {
  status: SyncResponseStatus;
  message: string;
  data: SyncStatusResponseItem[];
};

function getRequiredAccessToken() {
  const session = getAuthSession();

  if (!session?.accessToken) {
    throw new Error("Sesi login tidak ditemukan. Silakan masuk kembali.");
  }

  return session.accessToken;
}

function createAuthorizedHeaders() {
  return {
    Authorization: `Bearer ${getRequiredAccessToken()}`,
  };
}

export async function getSyncConfig() {
  return apiClient.get<SyncConfigResponse>("/sync/config", {
    headers: createAuthorizedHeaders(),
    cache: "no-store",
  });
}

export async function getSyncBootstrap() {
  return apiClient.get<SyncBootstrapResponse>("/sync/bootstrap", {
    headers: createAuthorizedHeaders(),
    cache: "no-store",
  });
}

export async function pushSyncOperations(
  operations: OfflineSyncOperation[],
  batch_id = crypto.randomUUID(),
) {
  const device_id = await getOrCreateOfflineDeviceId();

  return apiClient.post<
    SyncPushResponse,
    {
      device_id: string;
      batch_id: string;
      operations: Array<{
        client_operation_id: string;
        operation_type: string;
        recorded_at: string;
        payload: Record<string, unknown>;
      }>;
    }
  >(
    "/sync/push",
    {
      device_id,
      batch_id,
      operations: operations.map((operation) => ({
        client_operation_id: operation.client_operation_id,
        operation_type: operation.operation_type,
        recorded_at: operation.recorded_at,
        payload: operation.payload,
      })),
    },
    {
      headers: createAuthorizedHeaders(),
      cache: "no-store",
    },
  );
}

export async function getSyncStatus({
  client_reference_ids = [],
  client_sale_ids = [],
  client_transaction_ids = [],
}: {
  client_reference_ids?: string[];
  client_sale_ids?: string[];
  client_transaction_ids?: string[];
}) {
  const searchParams = new URLSearchParams();

  client_transaction_ids.forEach((value) =>
    searchParams.append("client_transaction_ids[]", value),
  );
  client_reference_ids.forEach((value) =>
    searchParams.append("client_reference_ids[]", value),
  );
  client_sale_ids.forEach((value) =>
    searchParams.append("client_sale_ids[]", value),
  );

  const path = searchParams.size
    ? `/sync/status?${searchParams.toString()}`
    : "/sync/status";

  return apiClient.get<SyncStatusResponse>(path, {
    headers: createAuthorizedHeaders(),
    cache: "no-store",
  });
}
