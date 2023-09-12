import { Product } from '../dtos/types.dto';

export const mockProductResponse = {
  id: 1,
  name: 'PC',
  description: 'The new pc that exist',
  price: 415.65,
  createdAt: new Date(),
} as Product;

export const mockProductsResponse = new Array(3).fill(
  mockProductResponse,
) as Product[];
