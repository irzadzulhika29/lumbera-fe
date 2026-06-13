const MEMBER_IMPORTS_PATH = "/members/imports";

const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return apiBaseUrl.replace(/\/+$/, "");
};

const createJsonResponse = (data: unknown, status: number) =>
  Response.json(data, { status });

export async function POST(
  request: Request,
  context: { params: Promise<{ importBatchId: string }> },
) {
  const { importBatchId } = await context.params;
  const payload = (await request.json()) as {
    accessToken?: string;
    status?: string;
    page?: number;
    limit?: number;
  };

  if (!payload.accessToken) {
    return createJsonResponse(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      400,
    );
  }

  const upstreamUrl = new URL(
    `${getApiBaseUrl()}${MEMBER_IMPORTS_PATH}/${encodeURIComponent(importBatchId)}`,
  );
  upstreamUrl.searchParams.set("status", payload.status ?? "SEMUA");
  upstreamUrl.searchParams.set("page", String(payload.page ?? 1));
  upstreamUrl.searchParams.set("limit", String(payload.limit ?? 20));

  const upstreamResponse = await fetch(upstreamUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${payload.accessToken}`,
    },
    cache: "no-store",
  });

  const contentType = upstreamResponse.headers.get("content-type") ?? "";
  const responseBody = contentType.includes("application/json")
    ? await upstreamResponse.json()
    : await upstreamResponse.text();

  if (!upstreamResponse.ok) {
    const message =
      typeof responseBody === "object" && responseBody !== null
        ? (responseBody as { message?: string }).message ||
          "Gagal mengambil pratinjau data anggota"
        : String(responseBody || "Gagal mengambil pratinjau data anggota");

    return createJsonResponse({ message }, upstreamResponse.status);
  }

  return createJsonResponse(responseBody, upstreamResponse.status);
}
