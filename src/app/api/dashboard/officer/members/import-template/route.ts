const MEMBER_IMPORT_TEMPLATE_PATH = "/members/imports/template";
const TEMPLATE_ACCEPT_HEADER = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/octet-stream",
].join(", ");

const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return apiBaseUrl.replace(/\/+$/, "");
};

const createJsonResponse = (message: string, status: number) =>
  Response.json({ message }, { status });

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    accessToken?: string;
  };

  if (!payload.accessToken) {
    return createJsonResponse(
      "Token akses tidak ditemukan. Silakan masuk kembali.",
      400,
    );
  }

  const upstreamResponse = await fetch(
    `${getApiBaseUrl()}${MEMBER_IMPORT_TEMPLATE_PATH}`,
    {
      method: "GET",
      headers: {
        Accept: TEMPLATE_ACCEPT_HEADER,
        Authorization: `Bearer ${payload.accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (!upstreamResponse.ok) {
    const contentType = upstreamResponse.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const payload = (await upstreamResponse.json()) as { message?: string };
      return createJsonResponse(
        payload.message || "Gagal mengunduh template",
        upstreamResponse.status,
      );
    }

    const message =
      (await upstreamResponse.text()) ||
      upstreamResponse.statusText ||
      "Gagal mengunduh template";

    return createJsonResponse(message, upstreamResponse.status);
  }

  const responseHeaders = new Headers();
  const contentDisposition = upstreamResponse.headers.get("content-disposition");
  const contentType =
    upstreamResponse.headers.get("content-type") ?? "application/octet-stream";

  responseHeaders.set("Content-Type", contentType);
  responseHeaders.set("Cache-Control", "no-store");

  if (contentDisposition) {
    responseHeaders.set("Content-Disposition", contentDisposition);
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}
