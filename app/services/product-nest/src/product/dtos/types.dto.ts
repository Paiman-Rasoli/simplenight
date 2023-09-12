export class Product {
  id: number;

  name: string;

  description: string;

  price: number;

  createdAt?: Date;
}

export class DeleteResponse {
  deleted: boolean;
}
