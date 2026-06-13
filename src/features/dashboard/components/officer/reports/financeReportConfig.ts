import type {
  OfficerFinancialReportData,
  OfficerFinancialReportLine,
} from "@/src/features/dashboard/api";

export type FinanceReportType = "balance" | "profit-loss" | "cash-flow";

export type FinanceTableCell = {
  amount: number;
  prefix?: "" | "+" | "-";
  tone?: "positive" | "negative" | "neutral";
};

export type FinanceTableRow = {
  label: string;
  type: "section" | "row" | "summary" | "total";
  tone?: "positive" | "negative";
  values?: Array<number | FinanceTableCell>;
};

export type FinanceTableConfig = {
  exportLabel: string;
  rows: FinanceTableRow[];
  title: string;
};

const financeTableMetadata: Record<
  FinanceReportType,
  Pick<FinanceTableConfig, "exportLabel" | "title">
> = {
  balance: {
    title: "Neraca",
    exportLabel: "Export .XLSX",
  },
  "profit-loss": {
    title: "Laba Rugi",
    exportLabel: "Export .XLSX",
  },
  "cash-flow": {
    title: "Arus Kas",
    exportLabel: "Export .XLSX",
  },
};

type FinancialReportLineKey =
  | "balance_sheet"
  | "income_statement"
  | "cash_flow";

const reportDataKeyByType: Record<FinanceReportType, FinancialReportLineKey> = {
  balance: "balance_sheet",
  "profit-loss": "income_statement",
  "cash-flow": "cash_flow",
};

function resolveCellTone(amount: number): FinanceTableCell["tone"] {
  if (amount < 0) return "negative";
  if (amount > 0) return "positive";
  return "neutral";
}

function resolveRowTone(
  line: OfficerFinancialReportLine,
): FinanceTableRow["tone"] {
  const values = Object.values(line.values);

  if (values.some((value) => value < 0)) return "negative";
  if (line.is_total || values.some((value) => value > 0)) return "positive";
  return undefined;
}

export function buildFinanceTableConfig(
  type: FinanceReportType,
  report: OfficerFinancialReportData | null,
): FinanceTableConfig {
  const metadata = financeTableMetadata[type];

  if (!report) {
    return {
      ...metadata,
      rows: [],
    };
  }

  const periodKeys = report.period_columns.map((column) => column.key);
  const rows: FinanceTableRow[] = [];
  const lines = report[reportDataKeyByType[type]];
  let activeSection = "";

  for (const line of lines) {
    if (line.section !== activeSection) {
      rows.push({ label: line.section, type: "section" });
      activeSection = line.section;
    }

    rows.push({
      label: line.label,
      type: line.is_total ? "total" : "row",
      tone: resolveRowTone(line),
      values: periodKeys.map((key) => {
        const amount = line.values[key] ?? 0;

        return {
          amount,
          tone: resolveCellTone(amount),
        };
      }),
    });
  }

  return {
    ...metadata,
    rows,
  };
}

export const financeReportTabs: Array<{
  label: string;
  value: FinanceReportType;
}> = [
  { label: "Neraca", value: "balance" },
  { label: "Laba Rugi", value: "profit-loss" },
  { label: "Arus Kas", value: "cash-flow" },
];
