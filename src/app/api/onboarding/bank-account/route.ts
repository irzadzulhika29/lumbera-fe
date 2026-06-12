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
  const payload = (await request.json()) as {
    onboarding_draft_id?: string;
    onboarding_token?: string;
    bank_name?: string;
    bank_account_number?: string;
    bank_account_holder_name?: string;
  };

  if (
    !payload.onboarding_draft_id ||
    !payload.onboarding_token ||
    !payload.bank_name ||
    !payload.bank_account_number ||
    !payload.bank_account_holder_name
  ) {
    return NextResponse.json(
      { message: "Payload bank account tidak lengkap" },
      { status: 400 },
    );
  }

  const upstreamResponse = await fetch(
    `${getApiBaseUrl()}/onboarding/drafts/${payload.onboarding_draft_id}/bank-account`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Onboarding-Token": payload.onboarding_token,
      },
      body: JSON.stringify({
        bank_name: payload.bank_name,
        bank_account_number: payload.bank_account_number,
        bank_account_holder_name: payload.bank_account_holder_name,
      }),
      cache: "no-store",
    },
  );

  const upstreamPayload = await parseUpstreamBody(upstreamResponse);

  return NextResponse.json(upstreamPayload, {
    status: upstreamResponse.status,
  });
}
