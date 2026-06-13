import type { Metadata } from "next";

import OfficerStoreProductConfirmScreen from "@/src/features/dashboard/components/officer/store/screens/OfficerStoreProductConfirmScreen";

export const metadata: Metadata = {
  title: "Konfirmasi Produk Officer | Lumbera",
  description: "Konfirmasi data produk koperasi baru.",
};

export default function OfficerStoreProductConfirmPage() {
  return <OfficerStoreProductConfirmScreen />;
}
