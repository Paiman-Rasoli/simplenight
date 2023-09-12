import { EntitySchema, EntitySchemaOptions } from 'typeorm';
import { ProductDomain } from '../product.domain';
import { INT_ID_COLUMN_OPTIONS } from '@app/module-base';

export type ProductEntity = ProductDomain;

export const productSchema: EntitySchemaOptions<ProductEntity> = {
  name: 'products',
  tableName: 'products',
  columns: {
    id: {
      ...INT_ID_COLUMN_OPTIONS,
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
