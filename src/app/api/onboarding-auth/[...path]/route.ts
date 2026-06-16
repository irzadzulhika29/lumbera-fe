import { proxyUpstreamRequest } from "@/src/app/api/_utils/upstreamProxy";

type OnboardingAuthRouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

export async function POST(
  request: Request,
  context: OnboardingAuthRouteContext,
) {
  const { path } = await context.params;

  return proxyUpstreamRequest({
    request,
    method: "POST",
    pathname: `/onboarding/${path.join("/")}`,
  });
}
