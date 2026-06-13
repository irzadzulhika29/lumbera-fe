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
    label: "Ganti Nomor HP",
    icon: "solar:phone-bold",
  },
  {
    label: "Keamanan & PIN",
    icon: "solar:lock-password-bold",
  },
] as const;

const cooperativeMenus = [
  {
    label: "Informasi Koperasi",
    icon: "solar:home-angle-bold",
  },
  {
    label: "Undang Pengurus Baru",
    icon: "solar:user-plus-bold",
  },
] as const;

const profileSummary = [
  { label: "Koperasi", value: "Koperasi Padiwangi", wideLabel: true },
  { label: "Kode Koperasi", value: "Z4Q56T", wideLabel: true },
  { label: "CHS", value: "78 · A" },
  { label: "Tanggal Bergabung", value: "12 Juni 2021", tone: "primary", wideLabel: true },
] as const;

export default function OfficerProfileScreen() {
  const navigationItems = getDashboardNavigation("officer", "Profil");
  const { isSubmitting, handleLogout } = useLogout();

  return (
    <MobileScreen className="bg-surface">
      <DashboardScreenShell
        background="bg-surface"
        navigationItems={navigationItems}
        contentClassName="[scrollbar-color:rgba(18,148,144,0.28)_transparent]"
      >
        <ProfileHeader
          initials="BS"
          name="Udin Semleyot"
          subtitle="Bendahara"
        />

        <div className="-mt-7 px-4 pb-10">
          <ProfileSummaryCard items={profileSummary} />

          <ProfileMenuSection title="Akun" items={accountMenus} />
          <ProfileMenuSection title="Koperasi" items={cooperativeMenus} />

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
