"use client";

import { getAuthSession } from "@/src/features/auth/utils/authSessionStorage";
import { ApiError } from "@/src/shared/api";

const MEMBER_LOAN_APPLICATION_API_ROUTE =
  "/api/dashboard/member/loan-applications";

const getRequiredAccessToken = () => {
  const session = getAuthSession();

  if (!session?.accessToken) {
    throw new Error("Sesi login tidak ditemukan. Silakan masuk kembali.");
  }

  return session.accessToken;
};

export type MemberLoanApplicationResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: {
    application_id: string;
    status: string;
    status_label: string;
    requested_amount: number;
    purpose: string;
    term_months: number;
    monthly_installment: number;
    total_interest_amount: number;
    total_payable_amount: number;
    interest_rate_bps_per_month: number;
    mcs_score: number;
    mcs_grade: string;
    credit_limit_amount: number;
    partner_name: string;
    submitted_at: string;
    timeline: Array<{
      code: string;
      label: string;
      description: string;
      state: "done" | "pending";
      occurred_at?: string;
    }>;
  };
};

export async function submitMemberLoanApplication(input: {
  amount: number;
  purpose: string;
  termMonths: number;
}): Promise<MemberLoanApplicationResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(MEMBER_LOAN_APPLICATION_API_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken,
      amount: input.amount,
      purpose: input.purpose,
      term_months: input.termMonths,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new ApiError({
      message:
        errorPayload?.message || "Gagal mengajukan pinjaman. Silakan coba lagi.",
      status: response.status,
    });
  }

  return (await response.json()) as MemberLoanApplicationResponse;
}
