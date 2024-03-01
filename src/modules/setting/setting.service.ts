import { Injectable } from '@nestjs/common';

import db from '../../config/prismaDB';
import { CreateSettingDto } from './dto/create-setting.dto';

@Injectable()
export class SettingService {
  async findFirst() {
    try {
      return await db.websiteSetting.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: number) {
    try {
      return await db.websiteSetting.findUnique({ where: { id } });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(createSettingDto: CreateSettingDto) {
    try {
      await db.websiteSetting.create({ data: createSettingDto });
      return { message: '更新成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAdminUserInfo() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, id, ...result } = await db.user.findFirst({
        where: { role: 'admin' },
      });
      return result;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}
