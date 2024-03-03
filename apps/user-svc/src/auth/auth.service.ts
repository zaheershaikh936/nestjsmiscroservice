import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { compare } from 'bcrypt';

// !other import
import { payloadT } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private UserServiceInject: UsersService,
    private JwtServiceService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const isUserExist = await this.UserServiceInject.isExistEmail(email);
    if (!isUserExist)
      throw new UnauthorizedException({
        message: `email is in correct. Please check the email Id ${email} is not valid!`,
      });

    const isValid = await compare(password, isUserExist.password);
    if (!isValid)
      throw new UnauthorizedException({ message: 'password is in correct' });

    return await this.signIn(isUserExist);
  }

  async signIn(user: User) {
    const token = await this.tokenGenerate({
      sub: user.UserID,
      role: user.role,
    });
    return {
      description: 'Login successfully!',
      data: {
        token,
        data: { UserID: user.UserID, email: user.email },
      },
    };
  }

  async tokenGenerate(payload: payloadT) {
    return {
      refresh_token: await this.JwtServiceService.signAsync(payload, {
        expiresIn: '1D',
      }),
      access_token: await this.JwtServiceService.signAsync(payload, {
        expiresIn: '12h',
      }),
    };
  }
}
