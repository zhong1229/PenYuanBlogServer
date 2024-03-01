import { Injectable, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../dto/jwt-payload.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '3052288628@qq.com', // 替换成你的实际密钥
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUserById(payload.sub);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    return user;
  }
}
