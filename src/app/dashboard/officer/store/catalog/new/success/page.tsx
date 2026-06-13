import type { Metadata } from "next";

import OfficerStoreProductSuccessScreen from "@/src/features/dashboard/components/officer/store/screens/OfficerStoreProductSuccessScreen";

export const metadata: Metadata = {
  title: "Produk Berhasil Ditambahkan | Lumbera",
  description: "Status sukses penambahan produk koperasi.",
};

export default function OfficerStoreProductSuccessPage() {
  return <OfficerStoreProductSuccessScreen />;
}
