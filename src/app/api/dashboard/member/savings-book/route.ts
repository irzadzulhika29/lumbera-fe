const MEMBER_SAVINGS_BOOK_PATH = "/cooperative-members/savings-book";
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
    period?: string;
    type?: string;
  };

  if (!payload.accessToken) {
    return createJsonResponse(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      400,
    );
  }

  const upstreamUrl = new URL(`${getApiBaseUrl()}${MEMBER_SAVINGS_BOOK_PATH}`);

  if (payload.period) upstreamUrl.searchParams.set("period", payload.period);
  if (payload.type) upstreamUrl.searchParams.set("type", payload.type);
  if (payload.page) upstreamUrl.searchParams.set("page", String(payload.page));
  if (payload.limit) upstreamUrl.searchParams.set("limit", String(payload.limit));

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
          "Gagal mengambil buku tabungan"
        : String(responseBody || "Gagal mengambil buku tabungan");

    return createJsonResponse({ message }, upstreamResponse.status);
  }

  return createJsonResponse(responseBody, upstreamResponse.status);
}
