import type { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './Base.api';

export interface CartShortResponse {
  success: boolean;
  messages: string[];
  body: {
    materials: unknown[];
    itemsQuantity: number;
    [key: string]: unknown;
  };
}

export class MvideoAPI extends BaseAPI {
  constructor(request: APIRequestContext) {
    super(request);
  }

  /**
   * Fetches the current state of the shopping cart.
   * When this API class is instantiated with `page.request`, it will automatically
   * include the browser's cookies and session data in this request!
   */
  async getCartStatus(): Promise<CartShortResponse> {
    const response = await this.request.get('/bff/shopping-cart/short', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        Referer: 'https://www.mvideo.ru/',
      },
    });
    return response.json();
  }
}
