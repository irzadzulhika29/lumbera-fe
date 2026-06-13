import type { DashboardTransaction } from "@/src/features/dashboard/types";
import {
  countOfflineSyncOperationsByStatuses,
  getOfflineSyncOperationsByStatuses,
  putOfflineSyncOperation,
  type OfflineSyncOperation,
} from "@/src/features/sync/offlineSyncDb";

export type OfflineOfficerTransaction = OfflineSyncOperation;

type OfflineOfficerTransactionFilters = {
  search?: string;
  type?: string;
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

function buildInitials(fullName: string) {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

function buildOfflineTransactionDetailHref(item: OfflineOfficerTransaction) {
  const preview = item.preview;
  const params = new URLSearchParams({
    amount: String(preview?.amount ?? 0),
    description: preview?.description ?? "",
    hash: "Menunggu sinkronisasi",
    memberName: preview?.member_name ?? "-",
    memberNumber: preview?.member_number ?? "-",
    officerName: "Tersimpan di perangkat",
    recordedAt: item.recorded_at,
    status: item.status.toUpperCase(),
    transactionGroup: preview?.transaction_group ?? "SIMPANAN",
    transactionTypeLabel: preview?.transaction_type_label ?? "Transaksi",
  });

  return `/dashboard/officer/transactions/detail/${item.client_operation_id}?${params.toString()}`;
}

function formatAmount(
  value: number,
  transactionGroup: NonNullable<OfflineOfficerTransaction["preview"]>["transaction_group"],
) {
  const prefix = transactionGroup === "PENARIKAN" ? "-" : "+";
  return `${prefix}Rp${new Intl.NumberFormat("id-ID").format(value)}`;
}

function matchesFilters(
  item: OfflineOfficerTransaction,
  filters: OfflineOfficerTransactionFilters,
) {
  const normalizedSearch = filters.search?.trim().toLowerCase() ?? "";

  if (
    normalizedSearch &&
    !`${item.preview?.member_name ?? ""} ${item.preview?.description ?? ""} ${item.preview?.transaction_type_label ?? ""}`
      .toLowerCase()
      .includes(normalizedSearch)
  ) {
    return false;
  }

  if (filters.type && item.preview?.transaction_group !== filters.type) {
    return false;
  }

  return true;
}

export async function saveOfflineOfficerTransaction(item: OfflineOfficerTransaction) {
  await putOfflineSyncOperation(item);
}

export async function getOfflineOfficerTransactions(
  filters: OfflineOfficerTransactionFilters = {},
) {
  const items = await getOfflineSyncOperationsByStatuses([
    "pending",
    "syncing",
    "retryable_error",
  ]);

  return items
    .filter((item) => matchesFilters(item, filters))
    .sort((left, right) => right.recorded_at.localeCompare(left.recorded_at));
}

export async function countOfflineOfficerTransactions() {
  return countOfflineSyncOperationsByStatuses([
    "pending",
    "syncing",
    "retryable_error",
  ]);
}

export function mapOfflineOfficerTransactionToDashboardTransaction(
  item: OfflineOfficerTransaction,
): DashboardTransaction {
  const preview = item.preview;

  return {
    id: item.client_operation_id,
    href: buildOfflineTransactionDetailHref(item),
    initials: buildInitials(preview?.member_name ?? "Offline"),
    name: preview?.member_name ?? "Transaksi offline",
    description: `${preview?.transaction_type_label ?? "Transaksi"} · ${formatDateTime(item.recorded_at)}`,
    amount: formatAmount(preview?.amount ?? 0, preview?.transaction_group ?? "SIMPANAN"),
    status: "Pending",
    statusTone: "warning",
    avatarTone: preview?.transaction_group === "PENARIKAN" ? "teal" : "blue",
  };
}
