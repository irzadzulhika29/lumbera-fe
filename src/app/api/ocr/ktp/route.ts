import { NextResponse } from "next/server";

type OcrKtpResponse = {
  nik?: string;
  nama?: string;
};

const parseUpstreamResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await response.json()) as OcrKtpResponse & { message?: string };
  }

  const text = await response.text();
  return { message: text };
};

export async function POST(request: Request) {
  const ocrUrl = process.env.NEXT_OCR?.trim();

  if (!ocrUrl) {
    return NextResponse.json(
      { message: "NEXT_OCR is not configured" },
      { status: 500 },
    );
  }

  const incomingFormData = await request.formData();
  const imageFile = incomingFormData.get("image");

  if (!(imageFile instanceof File)) {
    return NextResponse.json(
      { message: "File gambar KTP tidak ditemukan" },
      { status: 400 },
    );
  }

  const upstreamFormData = new FormData();
  upstreamFormData.append("image", imageFile);

  const upstreamResponse = await fetch(ocrUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: upstreamFormData,
    cache: "no-store",
  });

  const payload = await parseUpstreamResponse(upstreamResponse);

  if (!upstreamResponse.ok) {
    return NextResponse.json(
      {
        message: payload.message || "Gagal memproses OCR KTP",
      },
      { status: upstreamResponse.status },
    );
  }

  return NextResponse.json({
    fullName: payload.nama?.trim() ?? "",
    nik: payload.nik?.trim() ?? "",
  });
}
