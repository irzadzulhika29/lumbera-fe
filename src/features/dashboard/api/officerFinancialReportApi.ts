"use client";

import { getAuthSession } from "@/src/features/auth/utils/authSessionStorage";
import { ApiError } from "@/src/shared/api";

const FINANCIAL_REPORT_API_ROUTE =
  "/api/dashboard/officer/reports/financial";

const getRequiredAccessToken = () => {
  const session = getAuthSession();

  if (!session?.accessToken) {
    throw new Error("Sesi login tidak ditemukan. Silakan masuk kembali.");
  }

  return session.accessToken;
};

export type OfficerFinancialReportPeriodColumn = {
  key: string;
  label: string;
};

export type OfficerFinancialReportLine = {
  section: string;
  label: string;
  values: Record<string, number>;
  is_total: boolean;
};

export type OfficerFinancialReportData = {
  period_columns: OfficerFinancialReportPeriodColumn[];
  balance_sheet: OfficerFinancialReportLine[];
  income_statement: OfficerFinancialReportLine[];
  cash_flow: OfficerFinancialReportLine[];
};

export type OfficerFinancialReportResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: OfficerFinancialReportData;
};

export async function getOfficerFinancialReport(
  period: string,
): Promise<OfficerFinancialReportResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(FINANCIAL_REPORT_API_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken, period }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new ApiError({
      message:
        errorPayload?.message ||
        "Gagal mengambil laporan keuangan. Silakan coba lagi.",
      status: response.status,
    });
  }

  return (await response.json()) as OfficerFinancialReportResponse;
}
