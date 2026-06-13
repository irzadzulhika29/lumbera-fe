import type { Metadata } from "next";

import MemberLoanHistoryScreen from "@/src/features/dashboard/components/screens/MemberLoanHistoryScreen";

export const metadata: Metadata = {
  title: "Riwayat Pinjaman | Lumbera",
  description: "Jadwal dan riwayat pinjaman anggota koperasi Lumbera.",
};

export default function MemberLoanHistoryPage() {
  return <MemberLoanHistoryScreen />;
}
