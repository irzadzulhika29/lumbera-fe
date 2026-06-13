export const financePeriodOptions = [
  { label: "Juni 2026", value: "2026-06" },
  { label: "Mei 2026", value: "2026-05" },
  { label: "April 2026", value: "2026-04" },
] as const;

export type FinanceReportPeriod = string;

export type FinanceReportConfig = {
  columns: string[];
  label: string;
  value: FinanceReportPeriod;
};

const DEFAULT_FINANCE_PERIOD = "2026-06";
const legacyPeriodMap: Record<string, string> = {
  monthly: DEFAULT_FINANCE_PERIOD,
  weekly: DEFAULT_FINANCE_PERIOD,
  semester: DEFAULT_FINANCE_PERIOD,
  yearly: DEFAULT_FINANCE_PERIOD,
};

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
] as const;

function normalizeFinancePeriod(period: string | undefined) {
  if (!period) return DEFAULT_FINANCE_PERIOD;
  if (period in legacyPeriodMap) return legacyPeriodMap[period];
  if (/^\d{4}-\d{2}$/.test(period)) return period;
  return DEFAULT_FINANCE_PERIOD;
}

function formatFinancePeriodLabel(period: string) {
  const [year, month] = period.split("-");
  const monthIndex = Number(month) - 1;
  const monthName = monthNames[monthIndex] ?? month;

  return `Periode ${monthName} ${year}`;
}

export function getFinanceReportConfig(
  period: string | undefined,
): FinanceReportConfig {
  const normalizedPeriod = normalizeFinancePeriod(period);

  return {
    value: normalizedPeriod,
    label: formatFinancePeriodLabel(normalizedPeriod),
    columns: [],
  };
}
