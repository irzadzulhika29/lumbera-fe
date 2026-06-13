import type { Metadata } from "next";

import MemberLoansScreen from "@/src/features/dashboard/components/screens/MemberLoansScreen";

export const metadata: Metadata = {
  title: "Pinjaman | Lumbera",
  description: "Ringkasan pinjaman anggota koperasi Lumbera.",
};

export default function MemberLoansPage() {
  return <MemberLoansScreen />;
}
