import type { Metadata } from "next";

import OfficerStoreProductCreateScreen from "@/src/features/dashboard/components/officer/store/screens/OfficerStoreProductCreateScreen";

export const metadata: Metadata = {
  title: "Tambah Produk Officer | Lumbera",
  description: "Tambahkan produk koperasi baru.",
};

export default function OfficerStoreProductCreatePage() {
  return <OfficerStoreProductCreateScreen />;
}
