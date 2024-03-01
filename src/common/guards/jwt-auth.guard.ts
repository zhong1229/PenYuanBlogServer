import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context) as boolean;
  }
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('token 已过期');
    }
    return user;
  }
}
