const LOANS_TRANSACTIONS_PATH = "/transactions/loans";

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
    amount?: number;
    client_transaction_id?: string;
    description?: string;
    is_offline_created?: boolean;
    member_id?: string;
    recorded_at?: string;
  };

  if (!payload.accessToken) {
    return createJsonResponse(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      400,
    );
  }

  const upstreamResponse = await fetch(
    `${getApiBaseUrl()}${LOANS_TRANSACTIONS_PATH}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.accessToken}`,
      },
      body: JSON.stringify({
        member_id: payload.member_id,
        amount: payload.amount,
        description: payload.description,
        recorded_at: payload.recorded_at,
        is_offline_created: payload.is_offline_created,
        client_transaction_id: payload.client_transaction_id,
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
          "Gagal menyimpan transaksi pinjaman"
        : String(responseBody || "Gagal menyimpan transaksi pinjaman");

    return createJsonResponse({ message }, upstreamResponse.status);
  }

  return createJsonResponse(responseBody, upstreamResponse.status);
}
