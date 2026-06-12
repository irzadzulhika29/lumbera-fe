import type { Metadata } from "next";

import OfficerTransactionsScreen from "@/src/features/dashboard/components/screens/OfficerTransactionsScreen";

export const metadata: Metadata = {
  title: "Menu Transaksi Officer | Lumbera",
  description: "Akses seluruh menu transaksi untuk officer koperasi.",
};

export default function OfficerTransactionsPage() {
  return <OfficerTransactionsScreen />;
}
