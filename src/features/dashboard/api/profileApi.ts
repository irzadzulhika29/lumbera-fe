"use client";

import { getAuthSession } from "@/src/features/auth/utils/authSessionStorage";
import { ApiError } from "@/src/shared/api";

const PROFILE_API_ROUTE = "/api/dashboard/profile";

const getRequiredAccessToken = () => {
  const session = getAuthSession();

  if (!session?.accessToken) {
    throw new Error("Sesi login tidak ditemukan. Silakan masuk kembali.");
  }

  return session.accessToken;
};

export type UserProfileResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: {
    role_code: string;
    profile: {
      user_id: string;
      member_id?: string | null;
      officer_id?: string | null;
      cooperative?: {
        cooperative_id: string;
        name: string;
        cooperative_code?: string;
        registration_number?: string;
      } | null;
      member_number?: string | null;
      full_name: string;
      initials?: string | null;
      position?: string | null;
      position_label?: string | null;
      role_label?: string | null;
      phone_number?: string | null;
      joined_date?: string | null;
    };
  };
};

export async function getUserProfile(): Promise<UserProfileResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(PROFILE_API_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new ApiError({
      message: errorPayload?.message || "Gagal mengambil profil pengguna.",
      status: response.status,
    });
  }

  return (await response.json()) as UserProfileResponse;
}
