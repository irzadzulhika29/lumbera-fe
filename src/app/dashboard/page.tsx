import type { Metadata } from "next";

import DashboardScreen from "@/src/features/dashboard/components/screens/DashboardScreen";

export const metadata: Metadata = {
  title: "Dashboard | Lumbera",
  description: "Ringkasan aktivitas koperasi Lumbera.",
};

export default function DashboardPage() {
  // Replace this fixture with the authenticated user's server-side session role.
  return <DashboardScreen role="officer" />;
}
