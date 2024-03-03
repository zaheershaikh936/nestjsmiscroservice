import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

// !other import
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('productCreate')
  create(createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @MessagePattern('userIdProducts')
  findAll(product: any) {
    const option = {
      page: product.page,
      limit: product.limit,
      sort: product.sort,
      search: product.search,
    };
    return this.productService.findAllByUserId(product.userId, option);
  }

  @MessagePattern('allProducts')
  findOne(product: any) {
    const option = {
      page: product.page,
      limit: product.limit,
      sort: product.sort,
      search: product.search,
    };
    return this.productService.findAll(option);
  }
}
