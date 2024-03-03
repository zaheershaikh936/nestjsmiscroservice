import { NestFactory } from '@nestjs/core';
// import { Transport } from '@nestjs/microservices';
import { UserSvcModule } from './user-svc.module';
import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(UserSvcModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1/');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.verbose(`Server started on ${await app.getUrl()}`);
}
bootstrap();
