const TRANSACTIONS_PATH = "/transactions";
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
    limit?: number;
    page?: number;
    search?: string;
    type?: string;
  };

  if (!payload.accessToken) {
    return createJsonResponse(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      400,
    );
  }

  const upstreamUrl = new URL(`${getApiBaseUrl()}${TRANSACTIONS_PATH}`);
  const params = upstreamUrl.searchParams;

  if (payload.search) params.set("search", payload.search);
  if (payload.type) params.set("type", payload.type);
  if (payload.limit) params.set("limit", String(payload.limit));
  if (payload.page) params.set("page", String(payload.page));

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
          "Gagal mengambil data transaksi"
        : "Gagal mengambil data transaksi";

    return createJsonResponse({ message }, upstreamResponse.status);
  }

  return createJsonResponse(responseBody, upstreamResponse.status);
}
