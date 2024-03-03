import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    const token = this.extractTokenFromHeader(headers);
    try {
      const payload: any = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_JWT,
      });
      const role = payload.role;
      if (role === 'admin') {
        return true;
      }
      return false;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(headers: any): string | undefined {
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
