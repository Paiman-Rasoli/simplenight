import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { configuration } from 'libs/module-base';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({
    origin: "http://localhost:3000",
    maxAge: 86400,
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  const { port, NODE_ENV } = configuration();
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port} Environment: ${NODE_ENV}`,
  );
}

bootstrap();
