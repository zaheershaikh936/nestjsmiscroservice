import {
  IsOptional,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { User } from '../../entities/user.entity';

export class CreateUserDto {
  @IsOptional()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  userID: string;

  user: User;
}

export class UpdateUserDto {
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  role: string;
}
