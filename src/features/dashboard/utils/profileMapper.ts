import type { UserProfileResponse } from "../api/profileApi";

type UserProfileData = UserProfileResponse["data"]["profile"];

function splitNameParts(fullName: string) {
  return fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function buildProfileInitials(profile: UserProfileData) {
  if (profile.initials?.trim()) {
    return profile.initials.trim().slice(0, 2).toUpperCase();
  }

  const parts = splitNameParts(profile.full_name).slice(0, 2);

  if (!parts.length) {
    return "NA";
  }

  return parts.map((part) => part.charAt(0).toUpperCase()).join("");
}

export function formatDashboardName(fullName: string) {
  return splitNameParts(fullName)[0] || fullName;
}

export function formatProfileDisplayName(fullName: string) {
  const parts = splitNameParts(fullName);

  if (parts.length <= 2) {
    return parts.join(" ") || fullName;
  }

  const head = parts.slice(0, 2);
  const tail = parts.slice(2).map((part) => `${part.charAt(0).toUpperCase()}.`);

  return [...head, ...tail].join(" ");
}

export function getProfileRoleLabel(data: UserProfileResponse["data"]) {
  return (
    data.profile.role_label?.trim() ||
    data.profile.position_label?.trim() ||
    data.profile.position?.trim() ||
    (data.role_code === "ANGGOTA" ? "Anggota" : "Pengurus")
  );
}

export function formatProfileJoinedDate(value?: string | null) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

export function formatProfilePhoneNumber(value?: string | null) {
  if (!value) {
    return "-";
  }

  const digitsOnly = value.replace(/\D/g, "");

  if (digitsOnly.length < 7) {
    return value;
  }

  const normalized =
    digitsOnly.startsWith("62") && digitsOnly.length > 10
      ? `0${digitsOnly.slice(2)}`
      : digitsOnly.startsWith("0")
        ? digitsOnly
        : value;

  if (!normalized.startsWith("0")) {
    return value;
  }

  return normalized.replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3");
}

export function getProfileSubtitle(data: UserProfileResponse["data"]) {
  const { profile } = data;

  if (data.role_code === "ANGGOTA") {
    const memberNumber = profile.member_number?.trim();
    const cooperativeName = profile.cooperative_name?.trim();

    return [memberNumber, cooperativeName].filter(Boolean).join(" · ") || "Anggota";
  }

  return (
    profile.position_label?.trim() ||
    profile.position?.trim() ||
    profile.cooperative_name?.trim() ||
    "Pengurus"
  );
}
