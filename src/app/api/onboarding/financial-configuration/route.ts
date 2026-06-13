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
    max_loan_amount_per_member?: number;
    loan_interest_rate_bps_per_month?: number;
    late_fee_rate_bps_per_day?: number;
    max_loan_term_months?: number;
    mandatory_savings_per_month?: number;
  };

  if (
    !payload.onboarding_draft_id ||
    !payload.onboarding_token ||
    typeof payload.max_loan_amount_per_member !== "number" ||
    typeof payload.loan_interest_rate_bps_per_month !== "number" ||
    typeof payload.late_fee_rate_bps_per_day !== "number" ||
    typeof payload.max_loan_term_months !== "number" ||
    typeof payload.mandatory_savings_per_month !== "number"
  ) {
    return NextResponse.json(
      { message: "Payload financial configuration tidak lengkap" },
      { status: 400 },
    );
  }

  const upstreamResponse = await fetch(
    `${getApiBaseUrl()}/onboarding/drafts/${payload.onboarding_draft_id}/financial-configuration`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Onboarding-Token": payload.onboarding_token,
      },
      body: JSON.stringify({
        max_loan_amount_per_member: payload.max_loan_amount_per_member,
        loan_interest_rate_bps_per_month: payload.loan_interest_rate_bps_per_month,
        late_fee_rate_bps_per_day: payload.late_fee_rate_bps_per_day,
        max_loan_term_months: payload.max_loan_term_months,
        mandatory_savings_per_month: payload.mandatory_savings_per_month,
      }),
      cache: "no-store",
    },
  );

  const upstreamPayload = await parseUpstreamBody(upstreamResponse);

  return NextResponse.json(upstreamPayload, {
    status: upstreamResponse.status,
  });
}
