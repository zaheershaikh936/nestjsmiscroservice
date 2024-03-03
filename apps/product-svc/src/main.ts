import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ProductSvcModule } from './product-svc.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductSvcModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    },
  );
  await app.listen();
  Logger.verbose(`Microservice started....`);
}
bootstrap();
