"use client";

import { getAuthSession } from "@/src/features/auth/utils/authSessionStorage";
import { ApiError } from "@/src/shared/api";
import type { DashboardTransaction } from "@/src/features/dashboard/types";

const TRANSACTIONS_API_ROUTE = "/api/dashboard/officer/transactions";

const getRequiredAccessToken = () => {
  const session = getAuthSession();

  if (!session?.accessToken) {
    throw new Error("Sesi login tidak ditemukan. Silakan masuk kembali.");
  }

  return session.accessToken;
};

export type OfficerTransactionItem = {
  amount: number;
  client_transaction_id: string;
  cooperative_id: string;
  current_hash: string;
  description: string;
  is_offline_created: boolean;
  member_id: string;
  member_mcs_grade: string;
  member_name: string;
  member_number: string;
  officer_id: string;
  officer_name: string;
  recorded_at: string;
  sync_status: string;
  synced_at: string | null;
  transaction_group: "SIMPANAN" | "PINJAMAN" | "ANGSURAN" | "PENARIKAN";
  transaction_id: string;
  transaction_type: string;
  transaction_type_label: string;
  hash_preview?: string;
};

export type OfficerTransactionListResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: {
    items: OfficerTransactionItem[];
    page: number;
    limit: number;
    total: number;
  };
};

export type OfficerTransactionListParams = {
  limit?: number;
  page?: number;
  search?: string;
  type?: string;
};

export type OfficerSavingsType = "POKOK" | "WAJIB" | "SUKARELA";

export type CreateOfficerSavingsTransactionParams = {
  amount: number;
  client_transaction_id: string;
  description: string;
  is_offline_created: boolean;
  member_id: string;
  recorded_at: string;
  savings_type: OfficerSavingsType;
};

export type CreateOfficerSavingsTransactionResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: OfficerTransactionItem & {
    prev_hash: string;
  };
};

function formatDateTime(recordedAt: string) {
  const date = new Date(recordedAt);

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  })
    .format(date)
    .replace(/\//g, ".");
}

function formatAmount(value: number, transactionGroup: OfficerTransactionItem["transaction_group"]) {
  const prefix = transactionGroup === "PENARIKAN" ? "-" : "+";
  return `${prefix}Rp${new Intl.NumberFormat("id-ID").format(value)}`;
}

function resolveAvatarTone(
  transactionGroup: OfficerTransactionItem["transaction_group"],
): DashboardTransaction["avatarTone"] {
  return transactionGroup === "PENARIKAN" ? "teal" : "blue";
}

function buildInitials(fullName: string) {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

export function mapOfficerTransactionToDashboardTransaction(
  item: OfficerTransactionItem,
): DashboardTransaction {
  return {
    id: item.transaction_id,
    initials: buildInitials(item.member_name),
    name: item.member_name,
    description: `${item.transaction_type_label} · ${formatDateTime(item.recorded_at)}`,
    amount: formatAmount(item.amount, item.transaction_group),
    status: item.sync_status === "SYNCED" ? "Sinkron" : "Pending",
    statusTone: item.sync_status === "SYNCED" ? "success" : "warning",
    avatarTone: resolveAvatarTone(item.transaction_group),
  };
}

export async function getOfficerTransactions(
  params: OfficerTransactionListParams = {},
): Promise<OfficerTransactionListResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(TRANSACTIONS_API_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken, ...params }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new ApiError({
      message:
        errorPayload?.message || "Gagal mengambil data transaksi. Silakan coba lagi.",
      status: response.status,
    });
  }

  return (await response.json()) as OfficerTransactionListResponse;
}

export async function createOfficerSavingsTransaction(
  params: CreateOfficerSavingsTransactionParams,
): Promise<CreateOfficerSavingsTransactionResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(`${TRANSACTIONS_API_ROUTE}/savings`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken, ...params }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new ApiError({
      message:
        errorPayload?.message ||
        "Gagal menyimpan transaksi simpanan. Silakan coba lagi.",
      status: response.status,
    });
  }

  return (await response.json()) as CreateOfficerSavingsTransactionResponse;
}
