import type { Metadata } from "next";

import SecurityReportScreen from "@/src/features/dashboard/components/SecurityReportScreen";

export const metadata: Metadata = {
  title: "Keamanan Koperasi | Lumbera",
  description: "Audit keamanan dan sertifikat ledger koperasi.",
};

export default function DashboardSecurityReportPage() {
  return <SecurityReportScreen />;
}
