const MEMBER_IMPORT_UPLOAD_PATH = "/members/imports/upload";

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
  const requestFormData = await request.formData();
  const file = requestFormData.get("file");
  const accessToken = requestFormData.get("accessToken");

  if (!(file instanceof File)) {
    return createJsonResponse(
      { message: "File Excel tidak ditemukan." },
      400,
    );
  }

  if (typeof accessToken !== "string" || !accessToken) {
    return createJsonResponse(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      400,
    );
  }

  const upstreamFormData = new FormData();
  upstreamFormData.append("file", file, file.name);

  const upstreamResponse = await fetch(
    `${getApiBaseUrl()}${MEMBER_IMPORT_UPLOAD_PATH}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: upstreamFormData,
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
          "Gagal mengunggah file anggota"
        : String(responseBody || "Gagal mengunggah file anggota");

    return createJsonResponse({ message }, upstreamResponse.status);
  }

  return createJsonResponse(responseBody, upstreamResponse.status);
}
