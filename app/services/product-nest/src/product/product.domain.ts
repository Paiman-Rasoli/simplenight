import { Product } from './dtos/types.dto';

export interface ProductDomain extends Product {
  id: number;

  name: string;

  description: string;

  price: number;

  createdAt: Date;
}
