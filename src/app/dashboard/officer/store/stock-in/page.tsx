import type { Metadata } from "next";

import OfficerStoreStockInCreateScreen from "@/src/features/dashboard/components/officer/store/screens/OfficerStoreStockInCreateScreen";

export const metadata: Metadata = {
  title: "Stok Masuk Officer | Lumbera",
  description: "Catat pertambahan stok produk koperasi.",
};

export default function OfficerStoreStockInPage() {
  return <OfficerStoreStockInCreateScreen />;
}
