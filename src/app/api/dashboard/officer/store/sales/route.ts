const STORE_SALES_PATH = "/store/sales";
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
    client_sale_id?: string;
    cash_received?: number;
    items?: Array<{
      product_id: string;
      quantity: number;
    }>;
  };

  if (!payload.accessToken) {
    return createJsonResponse(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      400,
    );
  }

  const upstreamResponse = await fetch(`${getApiBaseUrl()}${STORE_SALES_PATH}`, {
    method: "POST",
    headers: {
      Accept: UPSTREAM_ACCEPT,
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`,
    },
    body: JSON.stringify({
      client_sale_id: payload.client_sale_id,
      cash_received: payload.cash_received,
      items: payload.items,
    }),
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
          "Gagal memproses penjualan"
        : String(responseBody || "Gagal memproses penjualan");

    return createJsonResponse({ message }, upstreamResponse.status);
  }

  return createJsonResponse(responseBody, upstreamResponse.status);
}
