import type { Metadata } from "next";

import MemberSavingsScreen from "@/src/features/dashboard/components/screens/MemberSavingsScreen";

export const metadata: Metadata = {
  title: "Buku Tabungan | Lumbera",
  description: "Riwayat tabungan anggota koperasi Lumbera.",
};

export default function MemberSavingsPage() {
  return <MemberSavingsScreen />;
}
