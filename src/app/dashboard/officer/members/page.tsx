import type { Metadata } from "next";

import OfficerMembersScreen from "@/src/features/dashboard/components/officer/screens/OfficerMembersScreen";

export const metadata: Metadata = {
  title: "Anggota Koperasi | Lumbera",
  description: "Kelola anggota dalam koperasi anda.",
};

export default function MembersPage() {
  return <OfficerMembersScreen />;
}
