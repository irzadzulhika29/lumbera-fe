import type { Metadata } from "next";

import OfficerStoreCashierScreen from "@/src/features/dashboard/components/officer/store/screens/OfficerStoreCashierScreen";

export const metadata: Metadata = {
  title: "Kasir Officer | Lumbera",
  description: "Kelola penjualan produk koperasi di kasir.",
};

export default function OfficerStoreCashierPage() {
  return <OfficerStoreCashierScreen />;
}
