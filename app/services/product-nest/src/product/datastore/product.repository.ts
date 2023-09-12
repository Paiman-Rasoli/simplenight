import { Repository } from 'typeorm';
import { ProductEntity, ProductSchema } from './product.entity';
import { ProductDomain } from '../product.domain';
import { mapEntityToDomain } from './product.entity.mapper';
import { ProductCreateInput } from '../dtos/inputs.dto';
import { TypeOrmEntityRepository } from '@app/module-base';

@TypeOrmEntityRepository(ProductSchema)
export class ProductRepository extends Repository<ProductEntity> {
  protected createCompanyQueryBuilder() {
    return this.createQueryBuilder();
  }

  async createProduct(input: ProductCreateInput): Promise<ProductDomain> {
    try {
      const newProduct = await this.save(input);
      return mapEntityToDomain(newProduct);
    } catch (err) {
      console.error('Error while saving to db', err);
    }
  }
}
