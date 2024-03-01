import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import db from '../../config/prismaDB';

@Injectable()
export class CategoryService {
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.findOneByName(createCategoryDto.name);
      if (category) {
        throw '分类已存在';
      }
      await db.category.create({ data: createCategoryDto });
      return { message: '分类创建成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll(name?: string) {
    try {
      const where = name ? { name: { contains: name } } : {};
      const category = await db.category.findMany({
        where,
      });
      return await Promise.all(
        category.map(async (item) => {
          const count = await db.article.count({ where: { cid: item.id } });
          return { ...item, articleCount: count };
        }),
      );
    } catch (error) {}
  }

  async findOneByName(name: string) {
    try {
      return await db.category.findUnique({ where: { name } });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findById(id: number) {
    try {
      return await db.category.findUnique({ where: { id } });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.findById(id);
      if (!category) {
        throw '分类不存在';
      }
      await db.category.update({ where: { id }, data: updateCategoryDto });
      return { message: '分类修改成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async remove(id: number) {
    try {
      const category = await this.findById(id);
      if (!category) {
        throw '分类不存在';
      }
      await db.category.delete({ where: { id } });
      return { message: '分类删除成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async removeAll(idList: number[]) {
    try {
      const category = await db.category.findMany({
        where: { id: { in: idList } },
      });
      if (!category) {
        throw '分类不存在';
      }
      await db.category.deleteMany({ where: { id: { in: idList } } });
      return { message: '分类删除成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
