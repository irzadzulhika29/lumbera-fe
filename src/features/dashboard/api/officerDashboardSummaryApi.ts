"use client";

import { getAuthSession } from "@/src/features/auth/utils/authSessionStorage";
import { ApiError } from "@/src/shared/api";

const DASHBOARD_SUMMARY_API_ROUTE =
  "/api/dashboard/officer/reports/dashboard-summary";

const getRequiredAccessToken = () => {
  const session = getAuthSession();

  if (!session?.accessToken) {
    throw new Error("Sesi login tidak ditemukan. Silakan masuk kembali.");
  }

  return session.accessToken;
};

export type OfficerDashboardSummaryResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: {
    period: string;
    period_label: string;
    chs: {
      score: number;
      display_score: number;
      grade: string;
      category: string;
      status: string;
    };
    members: {
      active: number;
      registered: number;
    };
  };
};

export async function getOfficerDashboardSummary(): Promise<OfficerDashboardSummaryResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(DASHBOARD_SUMMARY_API_ROUTE, {
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
      message:
        errorPayload?.message ||
        "Gagal mengambil ringkasan dashboard. Silakan coba lagi.",
      status: response.status,
    });
  }

  return (await response.json()) as OfficerDashboardSummaryResponse;
}
