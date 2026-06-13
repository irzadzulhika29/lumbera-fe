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

export async function POST(
  request: Request,
  context: { params: Promise<{ productId: string }> },
) {
  const { productId } = await context.params;
  const payload = (await request.json()) as {
    accessToken?: string;
    quantity_delta?: number;
    description?: string;
    is_offline_created?: boolean;
    client_reference_id?: string;
  };

  if (!payload.accessToken) {
    return createJsonResponse(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      400,
    );
  }

  const upstreamResponse = await fetch(
    `${getApiBaseUrl()}${STORE_PRODUCTS_PATH}/${productId}/adjustments`,
    {
      method: "POST",
      headers: {
        Accept: UPSTREAM_ACCEPT,
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.accessToken}`,
      },
      body: JSON.stringify({
        quantity_delta: payload.quantity_delta,
        description: payload.description,
        is_offline_created: payload.is_offline_created ?? false,
        client_reference_id: payload.client_reference_id,
      }),
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
          "Gagal menyesuaikan stok produk"
        : String(responseBody || "Gagal menyesuaikan stok produk");

    return createJsonResponse({ message }, upstreamResponse.status);
  }

  return createJsonResponse(responseBody, upstreamResponse.status);
}
