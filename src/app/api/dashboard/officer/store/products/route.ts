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
    name?: string;
    unit?: string;
    category?: string;
    cost_price?: number;
    sale_price?: number;
    min_stock_quantity?: number;
    initial_stock_quantity?: number;
    is_offline_created?: boolean;
    client_reference_id?: string;
  };

  if (!payload.accessToken) {
    return createJsonResponse(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      400,
    );
  }

  const upstreamResponse = await fetch(`${getApiBaseUrl()}${STORE_PRODUCTS_PATH}`, {
    method: "POST",
    headers: {
      Accept: UPSTREAM_ACCEPT,
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`,
    },
    body: JSON.stringify({
      name: payload.name,
      unit: payload.unit,
      category: payload.category,
      cost_price: payload.cost_price,
      sale_price: payload.sale_price,
      min_stock_quantity: payload.min_stock_quantity,
      initial_stock_quantity: payload.initial_stock_quantity,
      is_offline_created: payload.is_offline_created,
      client_reference_id: payload.client_reference_id,
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
          "Gagal menambahkan produk"
        : String(responseBody || "Gagal menambahkan produk");

    return createJsonResponse({ message }, upstreamResponse.status);
  }

  return createJsonResponse(responseBody, upstreamResponse.status);
}
