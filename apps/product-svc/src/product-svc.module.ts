import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// !other import
import { ProductModule } from './product/product.module';
import config from '../database';
import { LoggerMiddleware } from './utils/http.logger';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
    ProductModule,
  ],
})
export class ProductSvcModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
