import { ApiError } from "./apiError";
import { buildApiUrl } from "./apiConfig";

type ApiPrimitive = string | number | boolean | null | undefined;

type ApiQuery = Record<string, ApiPrimitive>;

type ApiRequestOptions<TBody = unknown> = Omit<RequestInit, "body" | "method"> & {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
  query?: ApiQuery;
};

type ApiErrorPayload = {
  message?: string;
  code?: string;
  errors?: unknown;
};

const isJsonContentType = (contentType: string | null) =>
  contentType?.includes("application/json") ?? false;

const parseResponseBody = async <T>(response: Response): Promise<T | undefined> => {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get("content-type");

  if (isJsonContentType(contentType)) {
    return (await response.json()) as T;
  }

  const text = await response.text();
  return (text ? (text as T) : undefined);
};

const createApiError = async (response: Response) => {
  const payload = (await parseResponseBody<ApiErrorPayload>(response)) ?? {};
  const fallbackMessage = response.statusText || "API request failed";

  return new ApiError({
    message: payload.message || fallbackMessage,
    status: response.status,
    code: payload.code,
    details: payload.errors,
  });
};

export async function apiRequest<TResponse, TBody = unknown>(
  path: string,
  options: ApiRequestOptions<TBody> = {},
) {
  const { method = "GET", body, query, headers, ...restOptions } = options;
  const requestHeaders = new Headers(headers);
  const hasBody = body !== undefined && body !== null;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }

  if (hasBody && !isFormData && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(buildApiUrl(path, query), {
    method,
    headers: requestHeaders,
    body: hasBody ? (isFormData ? (body as BodyInit) : JSON.stringify(body)) : undefined,
    ...restOptions,
  });

  if (!response.ok) {
    throw await createApiError(response);
  }

  return (await parseResponseBody<TResponse>(response)) as TResponse;
}

export const apiClient = {
  get: <TResponse>(path: string, options?: Omit<ApiRequestOptions, "method" | "body">) =>
    apiRequest<TResponse>(path, { ...options, method: "GET" }),
  post: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<ApiRequestOptions<TBody>, "method" | "body">,
  ) => apiRequest<TResponse, TBody>(path, { ...options, method: "POST", body }),
  put: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<ApiRequestOptions<TBody>, "method" | "body">,
  ) => apiRequest<TResponse, TBody>(path, { ...options, method: "PUT", body }),
  patch: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<ApiRequestOptions<TBody>, "method" | "body">,
  ) => apiRequest<TResponse, TBody>(path, { ...options, method: "PATCH", body }),
  delete: <TResponse>(path: string, options?: Omit<ApiRequestOptions, "method" | "body">) =>
    apiRequest<TResponse>(path, { ...options, method: "DELETE" }),
};
