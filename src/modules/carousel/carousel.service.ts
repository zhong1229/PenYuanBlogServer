import { Injectable } from '@nestjs/common';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { UpdateCarouselDto } from './dto/update-carousel.dto';

import db from '../../config/prismaDB';

@Injectable()
export class CarouselService {
  async create(createCarouselDto: CreateCarouselDto) {
    try {
      await db.carousel.create({ data: createCarouselDto });
      return { message: '添加成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll() {
    try {
      return await db.carousel.findMany();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: number, updateCarouselDto: UpdateCarouselDto) {
    try {
      await db.carousel.update({ where: { id }, data: updateCarouselDto });
      return { message: '更新成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async remove(id: number) {
    try {
      const carousel = await db.carousel.findUnique({ where: { id } });
      if (!carousel) {
        throw '列表项不存在';
      }
      await db.carousel.delete({ where: { id } });
      return { message: '删除成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
