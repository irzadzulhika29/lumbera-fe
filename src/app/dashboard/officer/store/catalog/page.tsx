import type { Metadata } from "next";

import OfficerStoreCatalogScreen from "@/src/features/dashboard/components/officer/store/screens/OfficerStoreCatalogScreen";

export const metadata: Metadata = {
  title: "Katalog Produk Officer | Lumbera",
  description: "Lihat dan kelola katalog produk koperasi.",
};

export default function OfficerStoreCatalogPage() {
  return <OfficerStoreCatalogScreen />;
}
