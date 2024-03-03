import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// !other import
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '../entities/product.entity';
import { pagination, paginationT } from '@app/common/middleware/pagination';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const { raw } = await this.productRepository
        .createQueryBuilder()
        .insert()
        .into('product')
        .values([createProductDto])
        .returning('*')
        .execute();

      return raw[0];
    } catch (error) {
      Logger.debug('<=========================================>');
      Logger.debug(error);
      throw new HttpException(
        `Failed to create product. ERROR: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllByUserId(userId: string, option: paginationT) {
    const { limit, page, skip } = pagination(option.page, option.limit);
    const query = this.productRepository.createQueryBuilder('product');
    query.where('product.userID = :userId', { userId });

    if (option.search)
      query.andWhere('product.productName LIKE :search', {
        search: `%${option.search}%`,
      });

    if (option.sort) query.orderBy('product.price', 'DESC');
    query.orderBy('product.price', 'DESC');
    query.take(limit);
    query.skip(skip);
    const data = await query.getMany();
    const total: number = await this.totalProduct();
    return { data, page: { page, limit, total } };
  }

  async findAll(option: paginationT) {
    const { limit, page, skip } = pagination(option.page, option.limit);
    const query = this.productRepository.createQueryBuilder('product');
    if (option.search) {
      query.where('product.productName LIKE :search', {
        search: `%${option.search}%`,
      });
    }

    if (option.sort) query.orderBy('product.price', 'DESC');
    query.take(limit);
    query.skip(skip);
    const data = await query.getMany();
    const total: number = await this.totalProduct();
    return { data, page: { page, limit, total } };
  }

  async totalProduct() {
    return await this.productRepository.count();
  }
}
