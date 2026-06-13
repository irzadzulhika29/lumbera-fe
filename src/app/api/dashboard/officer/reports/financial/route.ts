const FINANCIAL_REPORT_PATH = "/reports/financial";
const UPSTREAM_ACCEPT = "application/json";

const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return apiBaseUrl.replace(/\/+$/, "");
};

const createJsonResponse = (data: unknown, status: number) =>
  Response.json(data, { status });

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    accessToken?: string;
    period?: string;
  };

  if (!payload.accessToken) {
    return createJsonResponse(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      400,
    );
  }

  const upstreamUrl = new URL(`${getApiBaseUrl()}${FINANCIAL_REPORT_PATH}`);
  if (payload.period) upstreamUrl.searchParams.set("period", payload.period);

  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    method: "GET",
    headers: {
      Accept: UPSTREAM_ACCEPT,
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
          "Gagal mengambil laporan keuangan"
        : String(responseBody || "Gagal mengambil laporan keuangan");

    return createJsonResponse({ message }, upstreamResponse.status);
  }

  return createJsonResponse(responseBody, upstreamResponse.status);
}
