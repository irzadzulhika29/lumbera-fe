import { proxyUpstreamRequest } from "@/src/app/api/_utils/upstreamProxy";

type SyncRouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

export async function GET(request: Request, context: SyncRouteContext) {
  const { path } = await context.params;

  return proxyUpstreamRequest({
    request,
    method: "GET",
    pathname: `/sync/${path.join("/")}`,
  });
}

export async function POST(request: Request, context: SyncRouteContext) {
  const { path } = await context.params;

  return proxyUpstreamRequest({
    request,
    method: "POST",
    pathname: `/sync/${path.join("/")}`,
  });
}
