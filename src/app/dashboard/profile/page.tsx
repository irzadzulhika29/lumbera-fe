import type { Metadata } from "next";

import OfficerProfileScreen from "@/src/features/dashboard/components/screens/OfficerProfileScreen";

export const metadata: Metadata = {
  title: "Profil Pengurus | Lumbera",
  description: "Lihat dan kelola profil pengurus koperasi Anda.",
};

export default function ProfilePage() {
  return <OfficerProfileScreen />;
}
