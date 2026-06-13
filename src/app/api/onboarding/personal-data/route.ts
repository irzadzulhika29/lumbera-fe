import { NextResponse } from "next/server";

type ApiStatus = {
  code?: number;
  isSuccess?: boolean;
};

type ApiEnvelope<TData = unknown> = {
  status?: ApiStatus;
  message?: string;
  data?: TData;
};

const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return apiBaseUrl.replace(/\/+$/, "");
};

const parseUpstreamBody = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await response.json()) as ApiEnvelope;
  }

  const text = await response.text();
  return { message: text } as ApiEnvelope;
};

export async function POST(request: Request) {
  const incomingFormData = await request.formData();
  const onboardingDraftId = incomingFormData.get("onboarding_draft_id");
  const onboardingToken = incomingFormData.get("onboarding_token");
  const ktpFile = incomingFormData.get("ktp_file");
  const fullName = incomingFormData.get("full_name");
  const nikEncrypted = incomingFormData.get("nik_encrypted");
  const nikHash = incomingFormData.get("nik_hash");
  const positionCode = incomingFormData.get("position_code");
  const existingCooperativeCode =
    incomingFormData.get("existing_cooperative_code") ?? "";

  if (
    typeof onboardingDraftId !== "string" ||
    typeof onboardingToken !== "string" ||
    !(ktpFile instanceof File) ||
    typeof fullName !== "string" ||
    typeof nikEncrypted !== "string" ||
    typeof nikHash !== "string" ||
    typeof positionCode !== "string"
  ) {
    return NextResponse.json(
      { message: "Payload personal data tidak lengkap" },
      { status: 400 },
    );
  }

  const upstreamFormData = new FormData();
  upstreamFormData.append("ktp_file", ktpFile);
  upstreamFormData.append("full_name", fullName);
  upstreamFormData.append("nik_encrypted", nikEncrypted);
  upstreamFormData.append("nik_hash", nikHash);
  upstreamFormData.append("position_code", positionCode);

  if (
    typeof existingCooperativeCode === "string" &&
    existingCooperativeCode.trim()
  ) {
    upstreamFormData.append(
      "existing_cooperative_code",
      existingCooperativeCode.trim(),
    );
  }

  const upstreamResponse = await fetch(
    `${getApiBaseUrl()}/onboarding/drafts/${onboardingDraftId}/personal-data`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "X-Onboarding-Token": onboardingToken,
      },
      body: upstreamFormData,
      cache: "no-store",
    },
  );

  const payload = await parseUpstreamBody(upstreamResponse);

  return NextResponse.json(payload, {
    status: upstreamResponse.status,
  });
}
