"use client";

import { getAuthSession } from "@/src/features/auth/utils/authSessionStorage";
import { ApiError } from "@/src/shared/api";

const MEMBER_SAVINGS_BOOK_API_ROUTE = "/api/dashboard/member/savings-book";
const MEMBER_SAVINGS_BOOK_EXPORT_API_ROUTE =
  "/api/dashboard/member/savings-book/export";
const MEMBER_SAVINGS_BOOK_EXPORT_PDF_API_ROUTE =
  "/api/dashboard/member/savings-book/export/pdf";

const getRequiredAccessToken = () => {
  const session = getAuthSession();

  if (!session?.accessToken) {
    throw new Error("Sesi login tidak ditemukan. Silakan masuk kembali.");
  }

  return session.accessToken;
};

export type MemberSavingsBookResponse = {
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
    period: string;
    summary: {
      total_balance: number;
      total_income: number;
      total_expense: number;
    };
    items: Array<{
      transaction_id: string;
      transaction_type: string;
      transaction_type_label: string;
      direction: "IN" | "OUT";
      amount: number;
      income_amount: number;
      expense_amount: number;
      description: string;
      recorded_at: string;
    }>;
    page: number;
    limit: number;
    total: number;
  };
};

export async function getMemberSavingsBook(params?: {
  limit?: number;
  page?: number;
  period?: string;
  type?: string;
}): Promise<MemberSavingsBookResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(MEMBER_SAVINGS_BOOK_API_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken, ...params }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new ApiError({
      message:
        errorPayload?.message ||
        "Gagal mengambil buku tabungan. Silakan coba lagi.",
      status: response.status,
    });
  }

  return (await response.json()) as MemberSavingsBookResponse;
}

const triggerFileDownload = (blob: Blob, fileName: string) => {
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
};

function extractFileName(
  contentDisposition: string | null,
  fallbackFileName: string,
) {
  const encodedMatch = contentDisposition?.match(/filename\*=UTF-8''([^;]+)/i);
  const plainMatch = contentDisposition?.match(/filename="?([^"]+)"?/i);

  if (encodedMatch?.[1]) {
    return decodeURIComponent(encodedMatch[1]);
  }

  return plainMatch?.[1] ?? fallbackFileName;
}

export async function downloadMemberSavingsBookExport() {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(MEMBER_SAVINGS_BOOK_EXPORT_API_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/octet-stream",
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
        "Gagal mengekspor buku tabungan. Silakan coba lagi.",
      status: response.status,
    });
  }

  const fileName = extractFileName(
    response.headers.get("content-disposition"),
    "buku-tabungan.xlsx",
  );
  const blob = await response.blob();
  triggerFileDownload(blob, fileName);

  return { fileName };
}

export async function downloadMemberSavingsBookPdfExport() {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(MEMBER_SAVINGS_BOOK_EXPORT_PDF_API_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/pdf",
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
        "Gagal mengekspor PDF buku tabungan. Silakan coba lagi.",
      status: response.status,
    });
  }

  const fileName = extractFileName(
    response.headers.get("content-disposition"),
    "buku-tabungan.pdf",
  );
  const blob = await response.blob();
  triggerFileDownload(blob, fileName);

  return { fileName };
}
