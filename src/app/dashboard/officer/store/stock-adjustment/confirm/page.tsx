import type { Metadata } from "next";

import OfficerStoreStockAdjustmentConfirmScreen from "@/src/features/dashboard/components/officer/store/screens/OfficerStoreStockAdjustmentConfirmScreen";

export const metadata: Metadata = {
  title: "Konfirmasi Penyesuaian Stok Officer | Lumbera",
  description: "Konfirmasi pencatatan penyesuaian stok produk.",
};

export default function OfficerStoreStockAdjustmentConfirmPage() {
  return <OfficerStoreStockAdjustmentConfirmScreen />;
}
