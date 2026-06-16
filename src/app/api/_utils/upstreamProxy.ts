const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return trimTrailingSlash(apiBaseUrl);
};

export const createUpstreamUrl = (pathname: string, requestUrl?: string) => {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const upstreamUrl = new URL(`${getApiBaseUrl()}${normalizedPath}`);

  if (requestUrl) {
    const incomingUrl = new URL(requestUrl);

    incomingUrl.searchParams.forEach((value, key) => {
      upstreamUrl.searchParams.append(key, value);
    });
  }

  return upstreamUrl;
};

export const createForwardHeaders = (request: Request) => {
  const headers = new Headers();
  const accept = request.headers.get("accept");
  const authorization = request.headers.get("authorization");
  const contentType = request.headers.get("content-type");

  if (accept) {
    headers.set("Accept", accept);
  } else {
    headers.set("Accept", "application/json");
  }

  if (authorization) {
    headers.set("Authorization", authorization);
  }

  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  return headers;
};

export async function proxyUpstreamRequest({
  request,
  pathname,
  method,
}: {
  request: Request;
  pathname: string;
  method: string;
}) {
  const upstreamUrl = createUpstreamUrl(pathname, request.url);
  const bodyText =
    method === "GET" || method === "HEAD" ? undefined : await request.text();

  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    method,
    headers: createForwardHeaders(request),
    body: bodyText ? bodyText : undefined,
    cache: "no-store",
  });

  const responseHeaders = new Headers();
  const contentType = upstreamResponse.headers.get("content-type");

  if (contentType) {
    responseHeaders.set("content-type", contentType);
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}
