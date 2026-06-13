const STORE_PRODUCTS_PATH = "/store/products";
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
    page?: number;
    limit?: number;
    search?: string;
  };

  if (!payload.accessToken) {
    return createJsonResponse(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      400,
    );
  }

  const params = new URLSearchParams();
  params.set("page", String(payload.page ?? 1));
  params.set("limit", String(payload.limit ?? 10));

  if (payload.search?.trim()) {
    params.set("search", payload.search.trim());
  }

  const upstreamResponse = await fetch(
    `${getApiBaseUrl()}${STORE_PRODUCTS_PATH}?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: UPSTREAM_ACCEPT,
        Authorization: `Bearer ${payload.accessToken}`,
      },
      cache: "no-store",
    },
  );

  const contentType = upstreamResponse.headers.get("content-type") ?? "";
  const responseBody = contentType.includes("application/json")
    ? await upstreamResponse.json()
    : await upstreamResponse.text();

  if (!upstreamResponse.ok) {
    const message =
      typeof responseBody === "object" && responseBody !== null
        ? (responseBody as { message?: string }).message ||
          "Gagal mengambil katalog produk"
        : String(responseBody || "Gagal mengambil katalog produk");

    return createJsonResponse({ message }, upstreamResponse.status);
  }

  return createJsonResponse(responseBody, upstreamResponse.status);
}
