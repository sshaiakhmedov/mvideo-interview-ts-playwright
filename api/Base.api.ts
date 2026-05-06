import type { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseAPI {
  readonly request: APIRequestContext;
  readonly token?: string;

  constructor(request: APIRequestContext, token?: string) {
    this.request = request;
    this.token = token;
  }

  async get<T = unknown>(endpoint: string, expectedStatus = 200, options: Record<string, unknown> = {}): Promise<{ status: number; body: T }> {
    const mergedOptions = {
      ...options,
      headers: {
        ...(options.headers as Record<string, string> ?? {}),
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    };
    const response = await this.request.get(endpoint, mergedOptions);
    return await this.validateAndParse<T>(response, expectedStatus);
  }

  async post<T = unknown>(endpoint: string, expectedStatus = 200, options: Record<string, unknown> = {}): Promise<{ status: number; body: T }> {
    const response = await this.request.post(endpoint, options);
    return await this.validateAndParse<T>(response, expectedStatus);
  }

  /**
   * Validates the response status code and parses the body as JSON or text.
   */
  async validateAndParse<T = unknown>(response: APIResponse, expectedStatus = 200): Promise<{ status: number; body: T }> {
    // 1. Check the status code first
    if (response.status() !== expectedStatus) {
      const errorBody = await response.text();
      throw new Error(`Status Mismatch! Expected ${expectedStatus} but got ${response.status()}.\nResponse: ${errorBody}`);
    }

    // 2. Attempt to parse as JSON, fallback to text if it fails
    let body: T;
    try {
      body = await response.json() as T;
    } catch {
      body = await response.text() as unknown as T;
    }

    return {
      status: response.status(),
      body: body,
    };
  }
}
