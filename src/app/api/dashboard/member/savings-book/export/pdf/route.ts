const MEMBER_SAVINGS_BOOK_EXPORT_PDF_PATH =
  "/cooperative-members/savings-book/export/pdf";

const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return apiBaseUrl.replace(/\/+$/, "");
};

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    accessToken?: string;
  };

  if (!payload.accessToken) {
    return Response.json(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      { status: 400 },
    );
  }

  const upstreamResponse = await fetch(
    `${getApiBaseUrl()}${MEMBER_SAVINGS_BOOK_EXPORT_PDF_PATH}`,
    {
      method: "GET",
      headers: {
        Accept: "application/pdf",
        Authorization: `Bearer ${payload.accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (!upstreamResponse.ok) {
    const contentType = upstreamResponse.headers.get("content-type") ?? "";
    const responseBody = contentType.includes("application/json")
      ? await upstreamResponse.json()
      : await upstreamResponse.text();
    const message =
      typeof responseBody === "object" && responseBody !== null
        ? (responseBody as { message?: string }).message ||
          "Gagal mengekspor PDF buku tabungan"
        : String(responseBody || "Gagal mengekspor PDF buku tabungan");

    return Response.json({ message }, { status: upstreamResponse.status });
  }

  const headers = new Headers();
  const contentType =
    upstreamResponse.headers.get("content-type") ?? "application/pdf";
  headers.set("content-type", contentType);
  const contentDisposition = upstreamResponse.headers.get("content-disposition");

  if (contentDisposition) {
    headers.set("content-disposition", contentDisposition);
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers,
  });
}
