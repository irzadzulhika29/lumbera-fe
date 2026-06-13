import type { Metadata } from "next";

import MemberProfileScreen from "@/src/features/dashboard/components/member/screens/MemberProfileScreen";

export const metadata: Metadata = {
  title: "Profil Anggota | Lumbera",
  description: "Lihat dan kelola profil anggota koperasi Anda.",
};

export default function MemberProfilePage() {
  return <MemberProfileScreen />;
}
