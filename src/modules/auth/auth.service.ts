import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByUserEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
  async validateUserById(id: string) {
    return await this.usersService.findOne(parseInt(id));
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(name: string, password: string, email: string): Promise<any> {
    try {
      const user = await this.usersService.findByUserEmail(email);
      if (user) {
        throw '用户名已存在';
      }
      const HashPassword = bcrypt.hashSync(password, 10);
      await this.usersService.create({
        name,
        password: HashPassword,
        email,
      });

      return { message: '注册成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async changePassword(id: number, old_password: string, new_password: string) {
    try {
      const HashPassword = bcrypt.hashSync(new_password, 10);
      if (HashPassword !== old_password) {
        throw '密码不正确';
      }
      await this.usersService.update(id, { password: new_password });
      return { message: '修改成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async changeUserInfo(id: number, data: any) {
    try {
      await this.usersService.update(id, data);
      return { message: '修改成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
