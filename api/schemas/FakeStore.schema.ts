import { z } from 'zod';

/**
 * GET /products/{id}
 * Schema for a single product.
 * This is the source of truth for all product-related data.
 */
export const ProductSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string().url(),
  rating: z
    .object({
      rate: z.number(),
      count: z.number().int(),
    })
    .optional(),
});

/**
 * GET /products
 * Schema for a list of products.
 * Reuses the single ProductSchema to ensure consistency.
 */
export const ProductsSchema = z.array(ProductSchema);

// Inferred types for compile-time safety
export type Product = z.infer<typeof ProductSchema>;
export type Products = z.infer<typeof ProductsSchema>;
