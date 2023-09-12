import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@app/module-base';
import { ProductRepository } from './datastore/product.repository';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forRepository([ProductRepository])],
  providers: [ProductService, ProductController],
  controllers: [ProductController],
})
export class ProductModule {}
