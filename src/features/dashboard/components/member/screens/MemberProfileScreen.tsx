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

export default function MemberProfileScreen() {
  const navigationItems = getDashboardNavigation("member", "Profil");
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
        { label: "No. Anggota", value: "-", wideLabel: true },
        { label: "Koperasi", value: "-", wideLabel: true },
        { label: "Peran", value: "Anggota", wideLabel: true },
      ];
    }

    return [
      {
        label: "No. Anggota",
        value: profileData.profile.member_number?.trim() || "-",
        wideLabel: true,
      },
      {
        label: "Koperasi",
        value: profileData.profile.cooperative?.name?.trim() || "-",
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
        label: "Bergabung",
        value: formatProfileJoinedDate(profileData.profile.joined_date),
        wideLabel: true,
      },
    ] as const;
  }, [profileData]);

  const initials = profileData ? buildProfileInitials(profileData.profile) : "NA";
  const name = profileData
    ? formatProfileDisplayName(profileData.profile.full_name)
    : "Pengguna";
  const subtitle = profileData ? getProfileSubtitle(profileData) : "Anggota";

  return (
    <MobileScreen className="bg-surface">
      <DashboardScreenShell
        background="bg-surface"
        navigationItems={navigationItems}
        contentClassName="[scrollbar-color:rgba(18,148,144,0.28)_transparent]"
      >
        <ProfileHeader
          backgroundClassName="bg-primary-deep"
          initials={initials}
          name={name}
          subtitle={subtitle}
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
