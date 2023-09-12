import { ServerError } from '@app/utils';

export class ProductNotFoundException extends ServerError {
  constructor(id: number) {
    super(`PRODUCT-NOT-FOUND-ERR`, `Product with id ${id} not found.`, 404);
  }
}
