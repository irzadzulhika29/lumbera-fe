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

export type CreateOfficerLoanTransactionParams = {
  amount: number;
  client_transaction_id: string;
  description: string;
  is_offline_created: boolean;
  member_id: string;
  recorded_at: string;
};

export type CreateOfficerLoanTransactionResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: OfficerTransactionItem & {
    member_loan_outstanding: number;
    member_savings_balance: number;
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

function buildOfficerTransactionDetailHref(item: OfficerTransactionItem) {
  const params = new URLSearchParams({
    amount: String(item.amount),
    description: item.description,
    hash: item.hash_preview || `SHA-256: ${item.current_hash.slice(0, 8)}...`,
    memberName: item.member_name,
    memberNumber: item.member_number,
    officerName: item.officer_name,
    recordedAt: item.recorded_at,
    status: item.sync_status,
    transactionGroup: item.transaction_group,
    transactionTypeLabel: item.transaction_type_label,
  });

  return `/dashboard/officer/transactions/detail/${item.transaction_id}?${params.toString()}`;
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
    href: buildOfficerTransactionDetailHref(item),
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

export type CreateOfficerInstallmentTransactionParams = {
  amount: number;
  client_transaction_id: string;
  description: string;
  is_offline_created: boolean;
  loan_id: string;
  recorded_at: string;
};

export type CreateOfficerInstallmentTransactionResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: OfficerTransactionItem & {
    loan_id: string;
    loan_number: string;
    monthly_installment_amount: number;
    member_loan_outstanding: number;
    member_savings_balance: number;
    prev_hash: string;
    loan: {
      loan_id: string;
      loan_number: string;
      status: string;
      principal_amount: number;
      total_payable_amount: number;
      monthly_installment_amount: number;
      remaining_payable_amount: number;
      current_month_due_amount: number;
      term_months: number;
    };
    allocations: Array<{
      schedule_id: string;
      installment_no: number;
      due_date: string;
      allocated_amount: number;
      schedule_status: string;
    }>;
  };
};

export async function createOfficerInstallmentTransaction(
  params: CreateOfficerInstallmentTransactionParams,
): Promise<CreateOfficerInstallmentTransactionResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(`${TRANSACTIONS_API_ROUTE}/installments`, {
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
        "Gagal menyimpan transaksi angsuran. Silakan coba lagi.",
      status: response.status,
    });
  }

  return (await response.json()) as CreateOfficerInstallmentTransactionResponse;
}

export type CreateOfficerStockMutationTransactionParams = {
  amount: number;
  client_transaction_id: string;
  description: string;
  is_offline_created: boolean;
  member_id: string;
  recorded_at: string;
};

export type CreateOfficerStockMutationTransactionResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: OfficerTransactionItem & {
    member_loan_outstanding: number;
    member_savings_balance: number;
    prev_hash: string;
  };
};

export async function createOfficerStockMutationTransaction(
  params: CreateOfficerStockMutationTransactionParams,
): Promise<CreateOfficerStockMutationTransactionResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(`${TRANSACTIONS_API_ROUTE}/stock-mutations`, {
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
        "Gagal menyimpan transaksi penarikan. Silakan coba lagi.",
      status: response.status,
    });
  }

  return (await response.json()) as CreateOfficerStockMutationTransactionResponse;
}

export async function createOfficerLoanTransaction(
  params: CreateOfficerLoanTransactionParams,
): Promise<CreateOfficerLoanTransactionResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(`${TRANSACTIONS_API_ROUTE}/loans`, {
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
        "Gagal menyimpan transaksi pinjaman. Silakan coba lagi.",
      status: response.status,
    });
  }

  return (await response.json()) as CreateOfficerLoanTransactionResponse;
}
