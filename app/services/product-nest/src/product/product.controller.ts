import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { DeleteResponse, Product } from './dtos/types.dto';
import { ProductCreateInput, ProductUpdateInput } from './dtos/inputs.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/products')
  async getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Post('/product')
  async createProduct(@Body() body: ProductCreateInput): Promise<Product> {
    return this.productService.create(body);
  }

  @Get('/product/:id')
  async getProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.getOneProduct(id);
  }

  @Delete('/product/:id')
  async deleteProduct(@Param('id') id: number): Promise<DeleteResponse> {
    return this.productService.deleteProduct(id);
  }

  @Put('/product')
  async updateProduct(@Body() body: ProductUpdateInput): Promise<Product> {
    return this.productService.update(body);
  }
}
