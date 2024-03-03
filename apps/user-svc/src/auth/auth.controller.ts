import { Body, Controller, Post } from '@nestjs/common';

// !other import
import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() authDto: AuthDto) {
    return this.authService.validateUser(authDto.email, authDto.password);
  }
}
