import type { Metadata } from "next";

import InstallExperience from "@/src/features/pwa/components/InstallExperience";

export const metadata: Metadata = {
  title: "Pasang Lumbera di HP kamu | Lumbera",
  description: "Panduan ringan untuk memasang Lumbera di layar utama HP.",
};

export default function InstallPage() {
  return <InstallExperience />;
}
