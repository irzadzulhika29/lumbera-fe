"use client";

import { useEffect, useMemo, useState } from "react";

import { getUserProfile, type UserProfileResponse } from "@/src/features/dashboard/api";
import { useLogout } from "@/src/features/auth/hooks/useLogout";
import MobileScreen from "@/src/shared/components/layout/MobileScreen";
import { getDashboardNavigation } from "@/src/features/dashboard/data";
import {
  buildProfileInitials,
  formatProfileDisplayName,
  formatProfileJoinedDate,
  formatProfilePhoneNumber,
  getProfileRoleLabel,
  getProfileSubtitle,
} from "@/src/features/dashboard/utils/profileMapper";
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

export default function OfficerProfileScreen() {
  const navigationItems = getDashboardNavigation("officer", "Profil");
  const { isSubmitting, handleLogout } = useLogout();
  const [profileData, setProfileData] = useState<UserProfileResponse["data"] | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    getUserProfile()
      .then((response) => {
        if (cancelled) return;
        setProfileData(response.data);
      })
      .catch(() => {
        if (cancelled) return;
        setProfileData(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const profileSummary = useMemo(() => {
    if (!profileData) {
      return [
        { label: "Koperasi", value: "-", wideLabel: true },
        { label: "Peran", value: "Pengurus", wideLabel: true },
        { label: "Nomor HP", value: "-", wideLabel: true },
      ];
    }

    return [
      {
        label: "Koperasi",
        value: profileData.profile.cooperative?.name?.trim() || "-",
        wideLabel: true,
      },
      {
        label: "Kode Koperasi",
        value: profileData.profile.cooperative?.cooperative_code?.trim() || "-",
        wideLabel: true,
      },
      {
        label: "Peran",
        value: getProfileRoleLabel(profileData),
        wideLabel: true,
      },
      {
        label: "Nomor HP",
        value: formatProfilePhoneNumber(profileData.profile.phone_number),
        wideLabel: true,
      },
      {
        label: "Tanggal Bergabung",
        value: formatProfileJoinedDate(profileData.profile.joined_date),
        tone: "primary",
        wideLabel: true,
      },
    ] as const;
  }, [profileData]);

  const initials = profileData ? buildProfileInitials(profileData.profile) : "NA";
  const name = profileData
    ? formatProfileDisplayName(profileData.profile.full_name)
    : "Pengguna";
  const subtitle = profileData ? getProfileSubtitle(profileData) : "Pengurus";

  return (
    <MobileScreen className="bg-surface">
      <DashboardScreenShell
        background="bg-surface"
        navigationItems={navigationItems}
        contentClassName="[scrollbar-color:rgba(18,148,144,0.28)_transparent]"
      >
        <ProfileHeader initials={initials} name={name} subtitle={subtitle} />

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
