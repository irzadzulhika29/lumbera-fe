import type { Metadata } from "next";

import OfficerStoreStockAdjustmentSuccessScreen from "@/src/features/dashboard/components/officer/store/screens/OfficerStoreStockAdjustmentSuccessScreen";

export const metadata: Metadata = {
  title: "Penyesuaian Stok Berhasil | Lumbera",
  description: "Status sukses pencatatan penyesuaian stok.",
};

export default function OfficerStoreStockAdjustmentSuccessPage() {
  return <OfficerStoreStockAdjustmentSuccessScreen />;
}
