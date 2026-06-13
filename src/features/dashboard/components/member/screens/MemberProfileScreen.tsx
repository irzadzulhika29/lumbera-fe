"use client";

import { useLogout } from "@/src/features/auth/hooks/useLogout";
import MobileScreen from "@/src/shared/components/layout/MobileScreen";
import { getDashboardNavigation } from "@/src/features/dashboard/data";
import DashboardScreenShell from "../../layout/DashboardScreenShell";
import ProfileHeader from "../../common/profile/ProfileHeader";
import ProfileLogoutButton from "../../common/profile/ProfileLogoutButton";
import ProfileMenuSection from "../../common/profile/ProfileMenuSection";
import ProfileSummaryCard from "../../common/profile/ProfileSummaryCard";

const accountMenus = [
  {
    label: "Edit Profil",
    icon: "solar:user-rounded-bold",
  },
  {
    label: "Ganti PIN",
    icon: "solar:lock-password-bold",
  },
] as const;

const creditDataMenus = [
  {
    label: "Lihat Skor CMS",
    icon: "solar:home-angle-bold",
  },
  {
    label: "Data Passport",
    icon: "solar:user-plus-bold",
  },
  {
    label: "Kelola Consent Mitra",
    icon: "solar:users-group-rounded-bold",
  },
] as const;

const profileSummary = [
  { label: "Bergabung", value: "2018", wideLabel: true },
  { label: "MCS Grade", value: "AA · 780", wideLabel: true },
  { label: "Pinjaman", value: "3 selesai", wideLabel: true },
] as const;

export default function MemberProfileScreen() {
  const navigationItems = getDashboardNavigation("member", "Profil");
  const { isSubmitting, handleLogout } = useLogout();

  return (
    <MobileScreen className="bg-surface">
      <DashboardScreenShell
        background="bg-surface"
        navigationItems={navigationItems}
        contentClassName="[scrollbar-color:rgba(18,148,144,0.28)_transparent]"
      >
        <ProfileHeader
          backgroundClassName="bg-primary-deep"
          initials="BS"
          name="Broto Aselole"
          subtitle="0012 · Koperasi Padiwangi"
        />

        <div className="-mt-7 px-4 pb-10">
          <ProfileSummaryCard items={profileSummary} />

          <ProfileMenuSection title="Akun" items={accountMenus} />
          <ProfileMenuSection title="Kredit dan Data" items={creditDataMenus} />

          <ProfileLogoutButton
            disabled={isSubmitting}
            label={isSubmitting ? "Keluar..." : "Keluar dari Akun"}
            onClick={handleLogout}
          />
        </div>
      </DashboardScreenShell>
    </MobileScreen>
  );
}
