export const financePeriodOptions = [
  { label: "Minggu ini", value: "weekly" },
  { label: "Bulan ini", value: "monthly" },
  { label: "Semester ini", value: "semester" },
  { label: "Tahun ini", value: "yearly" },
] as const;

export type FinanceReportPeriod = (typeof financePeriodOptions)[number]["value"];

export type FinanceReportConfig = {
  columns: string[];
  label: string;
  value: FinanceReportPeriod;
};

const financeReportConfigs: Record<FinanceReportPeriod, FinanceReportConfig> = {
  weekly: {
    value: "weekly",
    label: "Periode 10 Juni 2026 - 30 Juni 2026",
    columns: ["MINGGU 1", "MINGGU 2", "MINGGU 3", "MINGGU 4"],
  },
  monthly: {
    value: "monthly",
    label: "Periode April 2026 - Juni 2026",
    columns: ["APRIL 2026", "MEI 2026", "JUNI 2026"],
  },
  semester: {
    value: "semester",
    label: "Periode Januari 2026 - Juni 2026",
    columns: [
      "JAN 2026",
      "FEB 2026",
      "MAR 2026",
      "APR 2026",
      "MEI 2026",
      "JUNI 2026",
    ],
  },
  yearly: {
    value: "yearly",
    label: "Periode Januari 2026 - Desember 2026",
    columns: [
      "JAN 2026",
      "FEB 2026",
      "MAR 2026",
      "APR 2026",
      "MEI 2026",
      "JUNI 2026",
      "JUL 2026",
      "AGS 2026",
      "SEP 2026",
      "OKT 2026",
      "NOV 2026",
      "DES 2026",
    ],
  },
};

export function getFinanceReportConfig(
  period: string | undefined,
): FinanceReportConfig {
  if (period && period in financeReportConfigs) {
    return financeReportConfigs[period as FinanceReportPeriod];
  }

  return financeReportConfigs.monthly;
}
