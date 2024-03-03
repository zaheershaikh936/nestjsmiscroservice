import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// !other import
import config from '../database';
import { UsersModule } from './users/users.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from '../utils/http.logger';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class UserSvcModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
