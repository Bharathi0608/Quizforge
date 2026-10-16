// API Base URL - defaults to Render hosted backend
const env = (import.meta as any).env;
export const API_BASE_URL: string =
  (env && env.VITE_API_URL) || "https://quizforge-7c83.onrender.com";

export interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  data: T;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs = 25000
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const text = await response.text();
    let data: any = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { msg: text || `Server error (${response.status})` };
    }

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error(
        "Request timed out. The server may still be spinning up from idle state or database is unreachable. Please try again in a few moments."
      );
    }
    throw new Error(
      err.message || "Could not reach the server. Please check your internet connection."
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
