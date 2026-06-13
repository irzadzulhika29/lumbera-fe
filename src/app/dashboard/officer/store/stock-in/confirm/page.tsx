import type { Metadata } from "next";

import OfficerStoreStockInConfirmScreen from "@/src/features/dashboard/components/officer/store/screens/OfficerStoreStockInConfirmScreen";

export const metadata: Metadata = {
  title: "Konfirmasi Stok Masuk Officer | Lumbera",
  description: "Konfirmasi pencatatan pertambahan stok.",
};

export default function OfficerStoreStockInConfirmPage() {
  return <OfficerStoreStockInConfirmScreen />;
}
