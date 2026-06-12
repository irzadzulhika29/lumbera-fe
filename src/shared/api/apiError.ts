export class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor({
    message,
    status,
    code,
    details,
  }: {
    message: string;
    status: number;
    code?: string;
    details?: unknown;
  }) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const isApiError = (value: unknown): value is ApiError =>
  value instanceof ApiError;
