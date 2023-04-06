import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const roles = this.reflector.get<number[]>('role', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_KEY
    });
    const checkRole = roles.some((item) => item === payload.role);
    if(!checkRole) throw new ForbiddenException("Forbidden");
    return checkRole;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const headers: any = request.headers;
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
