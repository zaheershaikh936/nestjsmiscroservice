import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Patch,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

// !other import
import { UsersService } from './users.service';
import {
  CreateUserDto,
  CreateProductDto,
  UpdateUserDto,
} from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'apps/user-svc/utils/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const salt = await genSalt(10);
    createUserDto.password = await hash(createUserDto.password, salt);
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/product/')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.usersService.createProduct(createProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/product/:userId')
  async getProductByUserId(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('sort') sort: string,
    @Query('search') search: string,
    @Param('userId') userId: string,
  ) {
    const option = {
      page: page || 1,
      limit: limit || 10,
      sort: sort,
      search,
      userId,
    };
    return this.usersService.productByUserId(option);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/product/')
  async getAllProduct(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('sort') sort: string,
    @Query('search') search: string,
  ) {
    const option = {
      page: page || 1,
      limit: limit || 10,
      sort: sort,
      search,
    };
    return this.usersService.getAllProduct(option);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateOne(userId, updateUserDto);
  }
}
