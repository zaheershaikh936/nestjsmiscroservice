import { User } from 'apps/user-svc/src/entities/user.entity';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

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
