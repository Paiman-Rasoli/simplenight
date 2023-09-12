import { IsString, IsNumber, IsNotEmpty, MaxLength } from 'class-validator';

export class ProductCreateInput {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsNumber()
  price: number;
}

export class ProductUpdateInput extends ProductCreateInput {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
