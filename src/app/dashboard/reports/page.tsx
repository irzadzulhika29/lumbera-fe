import type { Metadata } from "next";

import ReportScreen from "@/src/features/dashboard/components/screens/ReportScreen";
import { getFinanceReportConfig } from "@/src/features/dashboard/reportData";

export const metadata: Metadata = {
  title: "Laporan | Lumbera",
  description: "Pantau kinerja operasional koperasi melalui halaman laporan.",
};

type PageProps = {
  searchParams: Promise<{ period?: string }>;
};

export default async function DashboardReportsPage({
  searchParams,
}: PageProps) {
  const { period } = await searchParams;
  const report = getFinanceReportConfig(period);

  return <ReportScreen initialPeriod={report.value} />;
}
