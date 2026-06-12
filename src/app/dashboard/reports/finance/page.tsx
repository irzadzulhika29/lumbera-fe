import type { Metadata } from "next";

import FinanceReportScreen from "@/src/features/dashboard/components/FinanceReportScreen";
import { getFinanceReportConfig } from "@/src/features/dashboard/reportData";

type PageProps = {
  searchParams: Promise<{ period?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { period } = await searchParams;
  const report = getFinanceReportConfig(period);

  return {
    title: `${report.label} | Lumbera`,
    description: "Detail laporan keuangan koperasi.",
  };
}

export default async function DashboardFinanceReportPage({
  searchParams,
}: PageProps) {
  const { period } = await searchParams;
  const report = getFinanceReportConfig(period);

  return <FinanceReportScreen period={report.value} />;
}
