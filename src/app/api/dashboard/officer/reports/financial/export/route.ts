const FINANCIAL_REPORT_EXPORT_PATH = "/reports/financial/export";

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
    period?: string;
  };

  if (!payload.accessToken) {
    return Response.json(
      { message: "Token akses tidak ditemukan. Silakan masuk kembali." },
      { status: 400 },
    );
  }

  const upstreamUrl = new URL(
    `${getApiBaseUrl()}${FINANCIAL_REPORT_EXPORT_PATH}`,
  );
  if (payload.period) {
    upstreamUrl.searchParams.set("period", payload.period);
  }

  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
    },
    cache: "no-store",
  });

  const contentType =
    upstreamResponse.headers.get("content-type") ?? "application/octet-stream";
  const contentDisposition =
    upstreamResponse.headers.get("content-disposition") ?? "";
  const responseBody = await upstreamResponse.arrayBuffer();

  if (!upstreamResponse.ok) {
    const decoder = new TextDecoder();
    const text = decoder.decode(responseBody);

    try {
      const json = JSON.parse(text);
      const message =
        (json as { message?: string }).message ||
        "Gagal mengekspor laporan keuangan";

      return Response.json({ message }, { status: upstreamResponse.status });
    } catch {
      return Response.json(
        { message: text || "Gagal mengekspor laporan keuangan" },
        { status: upstreamResponse.status },
      );
    }
  }

  return new Response(responseBody, {
    status: upstreamResponse.status,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": contentDisposition,
    },
  });
}
