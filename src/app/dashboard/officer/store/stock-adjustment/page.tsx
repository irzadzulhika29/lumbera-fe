import type { Metadata } from "next";

import OfficerStoreStockAdjustmentCreateScreen from "@/src/features/dashboard/components/officer/store/screens/OfficerStoreStockAdjustmentCreateScreen";

export const metadata: Metadata = {
  title: "Penyesuaian Stok Officer | Lumbera",
  description: "Catat penyesuaian ketersediaan stok produk koperasi.",
};

export default function OfficerStoreStockAdjustmentPage() {
  return <OfficerStoreStockAdjustmentCreateScreen />;
}
