import type { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './Base.api';
import { ProductSchema, ProductsSchema, type Product, type Products } from './schemas/FakeStore.schema';

export class FakeStoreAPI extends BaseAPI {
  constructor(request: APIRequestContext) {
    super(request);
  }

  // GET /products
  async getProducts(expectedStatus = 200, params?: { sort?: 'asc' | 'desc'; limit?: number }): Promise<{ status: number; body: Products }> {
    const response = await this.get<Products>('/products', expectedStatus, { params });
    ProductsSchema.parse(response.body);
    return response;
  }

  // GET /products/{id}
  async getProductById(id: string, expectedStatus = 200): Promise<{ status: number; body: Product }> {
    const response = await this.get<Product>(`/products/${id}`, expectedStatus);
    ProductSchema.parse(response.body);
    return response;
  }

  // POST /products
  async postProduct(payload: Product, expectedStatus = 201): Promise<{ status: number; body: Product }> {
    const response = await this.post<Product>('/products', expectedStatus, { data: payload });
    ProductSchema.parse(response.body);
    return response;
  }
}
