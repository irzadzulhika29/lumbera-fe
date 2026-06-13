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
    search?: string;
    grade?: string;
    page?: number;
    limit?: number;
    status?: string;
  };

  if (!payload.accessToken) {
    return createJsonResponse(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      400,
    );
  }

  const upstreamUrl = new URL(`${getApiBaseUrl()}${MEMBERS_PATH}`);
  const params = upstreamUrl.searchParams;

  if (payload.search) params.set("search", payload.search);
  if (payload.grade) params.set("grade", payload.grade);
  if (payload.page) params.set("page", String(payload.page));
  if (payload.limit) params.set("limit", String(payload.limit));
  if (payload.status) params.set("status", payload.status);

  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    method: "GET",
    headers: {
      Accept: UPSTREAM_ACCEPT,
      Authorization: `Bearer ${payload.accessToken}`,
    },
    cache: "no-store",
  });

  const contentType = upstreamResponse.headers.get("content-type") ?? "";

  if (!upstreamResponse.ok) {
    if (contentType.includes("application/json")) {
      const errorPayload = (await upstreamResponse.json()) as {
        message?: string;
      };
      return createJsonResponse(
        { message: errorPayload.message || "Gagal mengambil data anggota" },
        upstreamResponse.status,
      );
    }

    const text = await upstreamResponse.text();
    return createJsonResponse(
      { message: text || "Gagal mengambil data anggota" },
      upstreamResponse.status,
    );
  }

  const responseBody = await upstreamResponse.json();
  return createJsonResponse(responseBody, upstreamResponse.status);
}
