import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context) as boolean;
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new BadRequestException('用户名和密码不能为空');
    }
    return user;
  }
}
