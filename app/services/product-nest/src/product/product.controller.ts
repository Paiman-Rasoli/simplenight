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

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Post('/')
  async createProduct(@Body() body: ProductCreateInput): Promise<Product> {
    return this.productService.create(body);
  }

  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.getOneProduct(id);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<DeleteResponse> {
    return this.productService.deleteProduct(id);
  }

  @Put('/')
  async updateProduct(@Body() body: ProductUpdateInput): Promise<Product> {
    return this.productService.update(body);
  }
}
