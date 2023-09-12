import { ProductDomain } from '../product.domain';
import { ProductEntity } from './product.entity';
/**
 *
 * @param entity ProductEntity
 * @returns ProductDomain
 * @description we may not need to send all entity data to response, so in here we will adjust the entity according to domain (dto) we specified.
 */
export const mapEntityToDomain = (entity: ProductEntity): ProductDomain => {
  if (!entity) return null;

  return {
    id: entity.id,
    name: entity.name,
    description: entity.description,
    price: entity.price,
    createdAt: entity.createdAt,
  };
};
