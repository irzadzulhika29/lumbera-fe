"use client";

import { getAuthSession } from "@/src/features/auth/utils/authSessionStorage";
import { ApiError } from "@/src/shared/api";

const MEMBER_DASHBOARD_API_ROUTE = "/api/dashboard/member/dashboard";

const getRequiredAccessToken = () => {
  const session = getAuthSession();

  if (!session?.accessToken) {
    throw new Error("Sesi login tidak ditemukan. Silakan masuk kembali.");
  }

  return session.accessToken;
};

export type MemberDashboardResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: {
    profile: {
      member_id: string;
      user_id: string;
      full_name: string;
      member_number: string;
      cooperative_id: string;
      cooperative_name: string;
    };
    savings: {
      total_balance: number;
      principal_balance: number;
      mandatory_balance: number;
      voluntary_balance: number;
      cash_withdrawal_total: number;
    };
    mcs: {
      score: number;
      grade: string;
      label: string;
      status: string;
      last_score_updated_at: string;
    };
    recent_transactions: Array<{
      transaction_id: string;
      transaction_type: string;
      transaction_type_label: string;
      direction: "IN" | "OUT";
      amount: number;
      signed_amount: number;
      description: string;
      recorded_at: string;
    }>;
  };
};

export async function getMemberDashboard(): Promise<MemberDashboardResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(MEMBER_DASHBOARD_API_ROUTE, {
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
        "Gagal mengambil dashboard anggota. Silakan coba lagi.",
      status: response.status,
    });
  }

  return (await response.json()) as MemberDashboardResponse;
}
