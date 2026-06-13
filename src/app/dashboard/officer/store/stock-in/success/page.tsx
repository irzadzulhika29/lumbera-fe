import type { Metadata } from "next";

import OfficerStoreStockInSuccessScreen from "@/src/features/dashboard/components/officer/store/screens/OfficerStoreStockInSuccessScreen";

export const metadata: Metadata = {
  title: "Stok Masuk Berhasil | Lumbera",
  description: "Status sukses pencatatan stok masuk.",
};

export default function OfficerStoreStockInSuccessPage() {
  return <OfficerStoreStockInSuccessScreen />;
}
