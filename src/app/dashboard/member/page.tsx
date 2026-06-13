import type { Metadata } from "next";

import DashboardScreen from "@/src/features/dashboard/components/screens/DashboardScreen";

export const metadata: Metadata = {
  title: "Dashboard Anggota | Lumbera",
  description: "Ringkasan aktivitas anggota koperasi Lumbera.",
};

export default function MemberDashboardPage() {
  return <DashboardScreen role="member" />;
}
