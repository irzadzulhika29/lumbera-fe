import { proxyUpstreamRequest } from "@/src/app/api/_utils/upstreamProxy";

type SessionAuthRouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

export async function POST(request: Request, context: SessionAuthRouteContext) {
  const { path } = await context.params;

  return proxyUpstreamRequest({
    request,
    method: "POST",
    pathname: `/auth/${path.join("/")}`,
  });
}
