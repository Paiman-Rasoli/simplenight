import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';

const config = configuration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.port);
  console.log('App is running on PORT => ', config.port);
}
bootstrap();
