const MEMBERS_PATH = "/members";
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
    full_name?: string;
    nik?: string;
    phone_number?: string;
    address?: string;
    joined_date?: string;
  };

  if (!payload.accessToken) {
    return createJsonResponse(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      400,
    );
  }

  const upstreamResponse = await fetch(
    `${getApiBaseUrl()}${MEMBERS_PATH}`,
    {
      method: "POST",
      headers: {
        Accept: UPSTREAM_ACCEPT,
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.accessToken}`,
      },
      body: JSON.stringify({
        full_name: payload.full_name,
        nik: payload.nik,
        phone_number: payload.phone_number,
        address: payload.address,
        joined_date: payload.joined_date,
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
        ? (responseBody as { message?: string }).message || "Gagal menambahkan anggota"
        : "Gagal menambahkan anggota";

    return createJsonResponse({ message }, upstreamResponse.status);
  }

  return createJsonResponse(responseBody, upstreamResponse.status);
}
