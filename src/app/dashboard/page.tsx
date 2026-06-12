import type { Metadata } from "next";

import DashboardScreen from "@/src/features/dashboard/components/screens/DashboardScreen";

export const metadata: Metadata = {
  title: "Dashboard | Lumbera",
  description: "Ringkasan aktivitas koperasi Lumbera.",
};

export default function DashboardPage() {
  return <DashboardScreen role="officer" />;
}
