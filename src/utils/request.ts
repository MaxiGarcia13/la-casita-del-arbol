/**
 * Builds a URL with query string from a base path and params object.
 * Undefined, null and empty string values are omitted.
 */
export function buildUrlWithParams(
  basePath: string,
  params: Record<string, string | number | undefined | null>,
): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  }

  const query = searchParams.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export interface RequestConfig extends Omit<RequestInit, 'body'> {
  /** Query string params (appended to URL). Undefined, null and empty string values are omitted. */
  params?: Record<string, string | number | undefined | null>;
  /** Request body. Objects are JSON-stringified. */
  body?: unknown;
}

/**
 * Wraps fetch with parsed params (object → query string) and body (object → JSON).
 * Returns the response body as parsed JSON.
 */
export async function request<T>(
  url: string,
  config: RequestConfig = {},
): Promise<T> {
  const { params, body, headers = {}, ...rest } = config;
  const fullUrl = params ? buildUrlWithParams(url, params) : url;

  const init: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  };

  if (body !== undefined) {
    init.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  const response = await fetch(fullUrl, init);

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      typeof data === 'object' && data !== null && 'message' in data
        ? String((data as { message: unknown }).message)
        : response.statusText || `Request failed with status ${response.status}`,
    ) as Error & { status: number };
    error.status = response.status;
    throw error;
  }

  return data;
}
