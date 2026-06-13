import type { Metadata } from "next";

import OfficerFinanceReportScreen from "@/src/features/dashboard/components/officer/screens/OfficerFinanceReportScreen";
import { getFinanceReportConfig } from "@/src/features/dashboard/reportData";

type PageProps = {
  searchParams: Promise<{ period?: string; type?: string }>;
};

function resolveFinanceReportType(type: string | undefined) {
  if (type === "balance" || type === "profit-loss" || type === "cash-flow") {
    return type;
  }

  return "balance";
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { period, type } = await searchParams;
  const report = getFinanceReportConfig(period);
  const reportType = resolveFinanceReportType(type);
  const titlePrefix =
    reportType === "profit-loss"
      ? "Laba Rugi"
      : reportType === "cash-flow"
        ? "Arus Kas"
        : "Neraca";

  return {
    title: `${titlePrefix} - ${report.label} | Lumbera`,
    description: "Detail laporan keuangan koperasi.",
  };
}

export default async function DashboardFinanceReportPage({
  searchParams,
}: PageProps) {
  const { period, type } = await searchParams;
  const report = getFinanceReportConfig(period);
  const reportType = resolveFinanceReportType(type);

  return (
    <OfficerFinanceReportScreen period={report.value} type={reportType} />
  );
}
