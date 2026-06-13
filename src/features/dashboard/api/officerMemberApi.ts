"use client";

import { getAuthSession } from "@/src/features/auth/utils/authSessionStorage";
import { ApiError } from "@/src/shared/api";

const MEMBER_LIST_API_ROUTE = "/api/dashboard/officer/members";
const MEMBER_IMPORT_TEMPLATE_API_ROUTE =
  "/api/dashboard/officer/members/import-template";
const MEMBER_IMPORTS_API_ROUTE =
  "/api/dashboard/officer/members/imports";
const FALLBACK_TEMPLATE_FILENAME = "template-import-anggota.xlsx";

const parseErrorMessage = async (
  response: Response,
  fallbackMessage: string,
) => {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const payload = (await response.json()) as { message?: string };
    return payload.message || response.statusText || fallbackMessage;
  }

  const text = await response.text();
  return text || response.statusText || fallbackMessage;
};

const extractFilename = (response: Response) => {
  const contentDisposition = response.headers.get("content-disposition");

  if (!contentDisposition) {
    return FALLBACK_TEMPLATE_FILENAME;
  }

  const encodedMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);

  if (encodedMatch?.[1]) {
    return decodeURIComponent(encodedMatch[1]);
  }

  const plainMatch = contentDisposition.match(/filename="?([^"]+)"?/i);
  return plainMatch?.[1] ?? FALLBACK_TEMPLATE_FILENAME;
};

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

const getRequiredAccessToken = () => {
  const session = getAuthSession();

  if (!session?.accessToken) {
    throw new Error("Sesi login tidak ditemukan. Silakan masuk kembali.");
  }

  return session.accessToken;
};

export type OfficerMemberItem = {
  member_id: string;
  user_id: string;
  cooperative_id: string;
  full_name: string;
  initials: string;
  member_number: string;
  joined_date: string;
  membership_years: number;
  member_status: string;
  current_mcs_score: number;
  mcs_grade: string;
};

export type OfficerMemberListResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: {
    items: OfficerMemberItem[];
    page: number;
    limit: number;
    total: number;
  };
};

export type OfficerMemberListParams = {
  search?: string;
  grade?: string;
  page?: number;
  limit?: number;
  status?: string;
};

export type CreateOfficerMemberParams = {
  full_name: string;
  nik: string;
  phone_number: string;
  address: string;
  joined_date: string;
};

export type CreateOfficerMemberResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: {
    user_id: string;
    member_id: string;
    cooperative_id: string;
    full_name: string;
    phone_number: string;
    member_number: string;
    joined_date: string;
    member_status: string;
    account_status: string;
  };
};

type OfficerMemberImportResponseStatus = {
  code: number;
  isSuccess: boolean;
};

export type OfficerMemberImportRowStatus = "VALID" | "ERROR";

export type OfficerMemberImportSummary = {
  import_batch_id: string;
  file_name: string;
  status: string;
  total_rows: number;
  success_rows: number;
  error_rows: number;
};

export type OfficerMemberImportRow = {
  import_row_id: string;
  row_number: number;
  full_name: string;
  nik_masked: string;
  phone_number: string;
  address: string;
  joined_date: string;
  status: OfficerMemberImportRowStatus;
  error_message: string;
};

export type OfficerMemberImportData = {
  summary: OfficerMemberImportSummary;
  rows: OfficerMemberImportRow[];
};

export type OfficerMemberImportUploadResponse = {
  status: OfficerMemberImportResponseStatus;
  message: string;
  data: OfficerMemberImportData;
};

export type OfficerMemberImportPreviewStatus =
  | "SEMUA"
  | OfficerMemberImportRowStatus;

export type OfficerMemberImportPreviewResponse = {
  status: OfficerMemberImportResponseStatus;
  message: string;
  data: OfficerMemberImportData & {
    page: number;
    limit: number;
    total: number;
  };
};

export type OfficerMemberImportSubmitResponse = {
  status: OfficerMemberImportResponseStatus;
  message: string;
  data: {
    import_batch_id: string;
    imported_rows: number;
    skipped_rows: number;
  };
};

export async function createOfficerMember(
  params: CreateOfficerMemberParams,
): Promise<CreateOfficerMemberResponse> {
  const accessToken = getRequiredAccessToken();

  const response = await fetch(`${MEMBER_LIST_API_ROUTE}/create`, {
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
        "Gagal menambahkan anggota. Silakan coba lagi.",
      status: response.status,
    });
  }

  return (await response.json()) as CreateOfficerMemberResponse;
}

export async function getOfficerMembers(
  params: OfficerMemberListParams = {},
): Promise<OfficerMemberListResponse> {
  const accessToken = getRequiredAccessToken();

  const response = await fetch(MEMBER_LIST_API_ROUTE, {
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
        "Gagal mengambil data anggota. Silakan coba lagi.",
      status: response.status,
    });
  }

  return (await response.json()) as OfficerMemberListResponse;
}

export async function downloadOfficerMemberImportTemplate() {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(MEMBER_IMPORT_TEMPLATE_API_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/octet-stream",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new ApiError({
      message: await parseErrorMessage(
        response,
        "Gagal mengunduh template",
      ),
      status: response.status,
    });
  }

  const templateBlob = await response.blob();
  const fileName = extractFilename(response);

  triggerFileDownload(templateBlob, fileName);

  return { fileName };
}

export async function uploadOfficerMemberImport(
  file: File,
): Promise<OfficerMemberImportUploadResponse> {
  const accessToken = getRequiredAccessToken();
  const formData = new FormData();

  formData.append("file", file);
  formData.append("accessToken", accessToken);

  const response = await fetch(`${MEMBER_IMPORTS_API_ROUTE}/upload`, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new ApiError({
      message: await parseErrorMessage(
        response,
        "Gagal mengunggah file anggota",
      ),
      status: response.status,
    });
  }

  return (await response.json()) as OfficerMemberImportUploadResponse;
}

export async function getOfficerMemberImportPreview(
  importBatchId: string,
  {
    status = "SEMUA",
    page = 1,
    limit = 20,
  }: {
    status?: OfficerMemberImportPreviewStatus;
    page?: number;
    limit?: number;
  } = {},
): Promise<OfficerMemberImportPreviewResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(
    `${MEMBER_IMPORTS_API_ROUTE}/${encodeURIComponent(importBatchId)}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken, status, page, limit }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new ApiError({
      message: await parseErrorMessage(
        response,
        "Gagal mengambil pratinjau data anggota",
      ),
      status: response.status,
    });
  }

  return (await response.json()) as OfficerMemberImportPreviewResponse;
}

export async function submitOfficerMemberImport(
  importBatchId: string,
): Promise<OfficerMemberImportSubmitResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(
    `${MEMBER_IMPORTS_API_ROUTE}/${encodeURIComponent(importBatchId)}/submit`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new ApiError({
      message: await parseErrorMessage(
        response,
        "Gagal menyimpan data anggota",
      ),
      status: response.status,
    });
  }

  return (await response.json()) as OfficerMemberImportSubmitResponse;
}
