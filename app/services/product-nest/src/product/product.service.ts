import { Injectable } from '@nestjs/common';
import { DeleteResponse, Product } from './dtos/types.dto';
import { ProductCreateInput, ProductUpdateInput } from './dtos/inputs.dto';
import { ProductRepository } from './datastore/product.repository';
import { ProductNotFoundException } from './errors';
import { mapEntityToDomain } from './datastore/product.entity.mapper';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(): Promise<Product[]> {
    return this.productRepository.find({});
  }

  async getOneProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return mapEntityToDomain(product);
  }

  async create(input: ProductCreateInput): Promise<Product> {
    return this.productRepository.createProduct(input);
  }

  async deleteProduct(id: number): Promise<DeleteResponse> {
    const deleteProduct = await this.productRepository.delete({ id });

    return { deleted: deleteProduct.affected > 0 };
  }

  async update(input: ProductUpdateInput): Promise<Product> {
    const previous = await this.getOneProduct(input.id);
    const updated = {
      ...previous,
      ...input,
    };
    await this.productRepository.update({ id: input.id }, updated);
    return updated;
  }
}
