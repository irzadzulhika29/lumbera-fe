import type { Metadata } from "next";

import AddMemberScreen from "@/src/features/dashboard/components/AddMemberScreen";

export const metadata: Metadata = {
  title: "Tambah Anggota | Lumbera",
  description: "Daftarkan anggota baru ke dalam koperasi.",
};

export default function AddMemberPage() {
  return <AddMemberScreen />;
}
