"use client";

import { getAuthSession } from "@/src/features/auth/utils/authSessionStorage";
import { ApiError } from "@/src/shared/api";

const COOPERATIVE_HEALTH_SCORE_API_ROUTE =
  "/api/dashboard/officer/reports/cooperative-health-score";

const getRequiredAccessToken = () => {
  const session = getAuthSession();

  if (!session?.accessToken) {
    throw new Error("Sesi login tidak ditemukan. Silakan masuk kembali.");
  }

  return session.accessToken;
};

export type OfficerCooperativeHealthScoreDimension = {
  code: string;
  label: string;
  weight: number;
  score: number | null;
  status: string;
  indicators: Array<{
    code: string;
    label: string;
    message?: string;
    raw_value: number | null;
    score: number | null;
    status: string;
    weight: number;
    weighted_score: number;
  }>;
};

export type OfficerCooperativeHealthScoreData = {
  period: string;
  status: string;
  chs_score: number;
  display_score: number;
  grade: string;
  category: string;
  dimensions: OfficerCooperativeHealthScoreDimension[];
};

export type OfficerCooperativeHealthScoreResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: OfficerCooperativeHealthScoreData;
};

export async function getOfficerCooperativeHealthScore(): Promise<OfficerCooperativeHealthScoreResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(COOPERATIVE_HEALTH_SCORE_API_ROUTE, {
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
        "Gagal mengambil cooperative health score. Silakan coba lagi.",
      status: response.status,
    });
  }

  return (await response.json()) as OfficerCooperativeHealthScoreResponse;
}
