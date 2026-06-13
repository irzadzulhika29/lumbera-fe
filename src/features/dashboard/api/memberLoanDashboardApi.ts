"use client";

import { getAuthSession } from "@/src/features/auth/utils/authSessionStorage";
import { ApiError } from "@/src/shared/api";

const MEMBER_LOAN_DASHBOARD_API_ROUTE = "/api/dashboard/member/loan-dashboard";

const getRequiredAccessToken = () => {
  const session = getAuthSession();

  if (!session?.accessToken) {
    throw new Error("Sesi login tidak ditemukan. Silakan masuk kembali.");
  }

  return session.accessToken;
};

export type MemberLoanDashboardResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: {
    mcs: {
      score: number;
      max_score: number;
      grade: string;
      label: string;
      profile_text: string;
      last_score_updated_at: string;
      components: Array<{
        code: string;
        label: string;
        score: number | null;
        weight: number;
      }>;
      explanation: string;
    } | null;
    active_loan: {
      loan_id: string;
      loan_number: string;
      principal_amount: number;
      total_payable_amount: number;
      remaining_payable_amount: number;
      monthly_installment_amount: number;
      term_months: number;
      paid_installment_count: number;
      paid_percentage: number;
      next_due_date: string;
      payment_status_text: string;
    } | null;
    installments: Array<{
      installment_no: number;
      due_date: string;
      due_amount: number;
      paid_amount: number;
      status: string;
      status_label: string;
    }>;
    installment_meta: {
      total_count: number;
      displayed_count: number;
      remaining_count: number;
      has_more: boolean;
    };
    loan_history: Array<{
      loan_id: string;
      loan_number: string;
      principal_amount: number;
      term_months: number;
      status: string;
      status_label: string;
      disbursed_at: string;
      paid_at: string | null;
      description: string;
    }>;
    actions: {
      history_enabled: boolean;
      loan_application_enabled: boolean;
      credit_access_enabled: boolean;
    };
  };
};

export async function getMemberLoanDashboard(): Promise<MemberLoanDashboardResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(MEMBER_LOAN_DASHBOARD_API_ROUTE, {
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
        "Gagal mengambil dashboard pinjaman anggota. Silakan coba lagi.",
      status: response.status,
    });
  }

  return (await response.json()) as MemberLoanDashboardResponse;
}
