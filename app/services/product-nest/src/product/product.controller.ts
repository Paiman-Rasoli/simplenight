import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';


@Controller('/api/v1')
export class ProductController {
  constructor(private readonly accountsService: ProductService) {}

  @Get("/products")
  async getProducts(): Promise<any[]> {
    //
      return [];
  }

}