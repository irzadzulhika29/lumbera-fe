import type { Metadata } from "next";

import OfficerSecurityReportScreen from "@/src/features/dashboard/components/officer/screens/OfficerSecurityReportScreen";

export const metadata: Metadata = {
  title: "Keamanan Koperasi | Lumbera",
  description: "Audit keamanan dan sertifikat ledger koperasi.",
};

export default function DashboardSecurityReportPage() {
  return <OfficerSecurityReportScreen />;
}
