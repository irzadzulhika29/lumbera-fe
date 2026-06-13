"use client";

import type { FinanceReportConfig } from "@/src/features/dashboard/reportData";
import DashboardDataTable, {
  type DashboardDataTableCell,
  type DashboardDataTableRow,
} from "@/src/features/dashboard/components/common/DashboardDataTable";

import type {
  FinanceTableCell,
  FinanceTableConfig,
  FinanceTableRow,
} from "./financeReportConfig";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
}

function resolveRowValues(
  row: FinanceTableRow,
  columnCount: number,
): FinanceTableCell[] {
  if (row.values && row.values.length >= columnCount) {
    return row.values
      .slice(0, columnCount)
      .map((value) => (typeof value === "number" ? { amount: value } : value));
  }

  const fallbackValue =
    row.tone === "negative" || row.tone === "positive" ? 1_000_000 : 0;

  return Array.from({ length: columnCount }, () => ({
    amount: fallbackValue,
  }));
}

function mapRowToCells(
  row: FinanceTableRow,
  columnCount: number,
): DashboardDataTableCell[] {
  return resolveRowValues(row, columnCount).map((value) => ({
    content: `${value.prefix ?? ""}Rp ${formatCurrency(value.amount)}`,
    tone: value.tone ?? row.tone ?? "neutral",
  }));
}

function mapRows(
  rows: FinanceTableConfig["rows"],
  columnCount: number,
): DashboardDataTableRow[] {
  return rows.slice(1).map((row) =>
    row.type === "section"
      ? {
          label: row.label,
          type: "section",
        }
      : {
          label: row.label,
          type: row.type,
          tone: row.tone,
          cells: mapRowToCells(row, columnCount),
        },
  );
}

export default function FinanceReportTable({
  report,
  table,
}: {
  report: FinanceReportConfig;
  table: FinanceTableConfig;
}) {
  const headerLabel =
    table.rows.find((row) => row.type === "section")?.label ?? "LAPORAN";

  return (
    <DashboardDataTable
      columns={report.columns}
      headerLabel={headerLabel}
      rows={mapRows(table.rows, report.columns.length)}
    />
  );
}
