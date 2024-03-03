import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

import db from '../../config/prismaDB';

@Injectable()
export class MediaService {
  async create(createMediaDto: CreateMediaDto) {
    try {
      await db.images.create({ data: createMediaDto });
      return { message: '壁纸上传成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll(pagesize?: number) {
    const query = {
      ...(pagesize && { take: pagesize }),
    };
    try {
      return await db.images.findMany({
        ...query,
        orderBy: { creationtime: 'desc' },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: number) {
    try {
      return await db.images.findUnique({ where: { id } });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    try {
      const data = await this.findOne(id);
      if (!data) {
        throw '壁纸不存在';
      }
      await db.images.update({ where: { id }, data: updateMediaDto });
      return { message: '壁纸修改成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async removeAll(idList: number[]) {
    try {
      const category = await db.images.findMany({
        where: { id: { in: idList } },
      });
      if (!category) {
        throw '壁纸不存在';
      }
      await db.images.deleteMany({ where: { id: { in: idList } } });
      return { message: '壁纸删除成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
