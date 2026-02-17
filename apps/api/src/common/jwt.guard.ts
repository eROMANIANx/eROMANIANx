import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const header: string | undefined = request.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }

    const token = header.replace('Bearer ', '');
    try {
      request.user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'dev-secret-change-me'
      });
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
