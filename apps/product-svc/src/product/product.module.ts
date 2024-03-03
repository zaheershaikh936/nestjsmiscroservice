import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// !other import
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from '../entities/product.entity';
import { User } from 'apps/user-svc/src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
