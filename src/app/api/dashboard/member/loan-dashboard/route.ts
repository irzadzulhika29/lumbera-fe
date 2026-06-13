const MEMBER_LOAN_DASHBOARD_PATH = "/cooperative-members/loan-dashboard";
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
  };

  if (!payload.accessToken) {
    return createJsonResponse(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      400,
    );
  }

  const upstreamResponse = await fetch(
    `${getApiBaseUrl()}${MEMBER_LOAN_DASHBOARD_PATH}`,
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
          "Gagal mengambil dashboard pinjaman anggota"
        : String(responseBody || "Gagal mengambil dashboard pinjaman anggota");

    return createJsonResponse({ message }, upstreamResponse.status);
  }

  return createJsonResponse(responseBody, upstreamResponse.status);
}
