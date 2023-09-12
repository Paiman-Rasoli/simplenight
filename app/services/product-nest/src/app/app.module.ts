import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../data-source';
import { ConfigModule } from '@app/module-base';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ProductModule,
  ],
})
export class AppModule {}
