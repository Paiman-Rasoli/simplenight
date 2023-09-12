import { configuration } from '@app/module-base';
import { ProductSchema } from '../product/datastore/product.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateProductTable1694525045095 } from '../../migrations/1694525045095-create-product-table';

const dbGeneralConfig = (): DataSourceOptions => {
  const config = configuration();

  switch (config.DB_TYPE) {
    case 'mysql':
      return {
        type: config.DB_TYPE,
        database: config.DB_NAME,
        host: config.DB_HOST,
        port: +config.DB_PORT,
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        synchronize: false,
        logging: false,
        migrationsRun: false,
      };
    case 'sqlite':
      return {
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        synchronize: true,
        logging: false,
        migrationsRun: false,
      };
    default:
      throw new Error('Invalid database config type: ' + config.DB_TYPE);
  }
};

export const dataSourceOptions: DataSourceOptions = {
  ...dbGeneralConfig(),
  entities: [ProductSchema],
  migrations: [CreateProductTable1694525045095],
  migrationsTableName: 'migrations',
};

export const dataSource = new DataSource(dataSourceOptions);
