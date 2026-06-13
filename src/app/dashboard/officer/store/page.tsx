import type { Metadata } from "next";

import OfficerStoreOverviewScreen from "@/src/features/dashboard/components/officer/store/screens/OfficerStoreOverviewScreen";

export const metadata: Metadata = {
  title: "Toko & Stok Officer | Lumbera",
  description: "Kelola stok dan katalog produk koperasi.",
};

export default function OfficerStorePage() {
  return <OfficerStoreOverviewScreen />;
}
