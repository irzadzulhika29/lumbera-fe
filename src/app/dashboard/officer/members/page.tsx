import type { Metadata } from "next";

import CooperativeMembersScreen from "@/src/features/dashboard/components/screens/CooperativeMembersScreen";

export const metadata: Metadata = {
  title: "Anggota Koperasi | Lumbera",
  description: "Kelola anggota dalam koperasi anda.",
};

export default function MembersPage() {
  return <CooperativeMembersScreen />;
}
