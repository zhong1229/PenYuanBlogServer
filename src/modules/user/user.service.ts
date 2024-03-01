import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import db from '../../config/prismaDB';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await db.user.create({
      data: createUserDto,
    });
    return result;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    try {
      return await db.user.findUnique({
        where: { id },
      });
    } catch (error) {
      return null;
    }
  }

  async findByUserEmail(email: string) {
    try {
      return await db.user.findUnique({
        where: { email },
      });
    } catch (error) {
      return null;
    }
  }

  async update(id: number, updateUserDto: any) {
    try {
      return await db.user.update({ where: { id }, data: updateUserDto });
    } catch (error) {
      console.log(error);

      return Promise.reject(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
