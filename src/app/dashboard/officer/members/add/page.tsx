import type { Metadata } from "next";

import OfficerAddMemberScreen from "@/src/features/dashboard/components/officer/screens/OfficerAddMemberScreen";

export const metadata: Metadata = {
  title: "Tambah Anggota | Lumbera",
  description: "Daftarkan anggota baru ke dalam koperasi.",
};

export default function AddMemberPage() {
  return <OfficerAddMemberScreen />;
}
