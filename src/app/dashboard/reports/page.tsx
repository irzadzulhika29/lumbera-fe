import type { Metadata } from "next";

import MobileScreen from "@/src/features/onboarding/components/MobileScreen";
import ReportScreen from "@/src/features/dashboard/components/ReportScreen";
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

  return (
    <MobileScreen className="bg-[#f7f8f9]">
      <ReportScreen initialPeriod={report.value} />
    </MobileScreen>
  );
}
