import { EntitySchema, EntitySchemaOptions } from 'typeorm';
import { ProductDomain } from '../product.domain';

export type ProductEntity = ProductDomain;

export const productSchema: EntitySchemaOptions<ProductEntity> = {
  name: 'products',
  tableName: 'products',
  columns: {
    id: {
      type: 'int',
      unsigned: true,
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    price: {
      type: 'float',
    },
    description: {
      type: 'varchar',
    },
    createdAt: {
      type: 'datetime',
      createDate: true,
    },
  },
};
export const ProductSchema = new EntitySchema<ProductEntity>(productSchema);
