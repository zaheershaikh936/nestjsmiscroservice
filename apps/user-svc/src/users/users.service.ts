import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// !other import
import { User } from '../entities/user.entity';
import { AuthService } from '../auth/auth.service';
import {
  CreateUserDto,
  CreateProductDto,
  UpdateUserDto,
} from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authServiceInject: AuthService,
    @Inject('PRODUCT_PROXY') private client: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { raw } = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into('user')
        .values([
          {
            email: createUserDto.email,
            password: createUserDto.password,
            name: createUserDto.name,
          },
        ])
        .returning('*')
        .execute();
      const payload = { sub: raw[0].UserID, role: raw[0].role };
      const token = await this.authServiceInject.tokenGenerate(payload);
      return {
        description: 'User create successfully!',
        data: {
          token,
          user: raw[0],
        },
      };
    } catch (error) {
      throw new HttpException(
        `Failed to create user. ERROR: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async isExistEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email, status: true },
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async createProduct(createProductDto: CreateProductDto) {
    return this.client.send('productCreate', createProductDto);
  }

  async productByUserId(option: any) {
    return this.client.send('userIdProducts', option);
  }

  async getAllProduct(option: any) {
    return this.client.send('allProducts', option);
  }

  async updateOne(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set(updateUserDto)
        .where('UserID = :id', { id: id })
        .execute();
      return { message: 'User Update successfully.' };
    } catch (error) {
      return error;
    }
  }
}
