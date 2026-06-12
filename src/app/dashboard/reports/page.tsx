import type { Metadata } from "next";

import MobileScreen from "@/src/features/onboarding/components/MobileScreen";
import ReportScreen from "@/src/features/dashboard/components/ReportScreen";

export const metadata: Metadata = {
  title: "Laporan | Lumbera",
  description: "Pantau kinerja operasional koperasi melalui halaman laporan.",
};

export default function DashboardReportsPage() {
  return (
    <MobileScreen className="bg-[#f7f8f9]">
      <ReportScreen />
    </MobileScreen>
  );
}
