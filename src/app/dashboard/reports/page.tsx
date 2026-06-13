import type { Metadata } from "next";

import OfficerReportScreen from "@/src/features/dashboard/components/officer/screens/OfficerReportScreen";
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

  return <OfficerReportScreen initialPeriod={report.value} />;
}
