import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

import db from '../../config/prismaDB';
import { CategoryService } from '../category/category.service';

@Injectable()
export class BlogService {
  constructor(private readonly categoryService: CategoryService) {}

  async create(createBlogDto: CreateBlogDto) {
    try {
      const category = await this.categoryService.findById(createBlogDto.cid);
      if (!category) {
        throw '分类不存在';
      }
      await db.article.create({ data: createBlogDto });
      return { message: '文章创建成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll(
    page: number,
    pagesize: number,
    sort: string,
    cname?: string,
    title?: string,
    tag?: string,
  ) {
    try {
      const category = cname
        ? await this.categoryService.findOneByName(cname)
        : null;
      const query = {
        take: pagesize,
        skip: pagesize * (page - 1),
        include: { cat: true },
        where: {
          ...(category && { cid: category.id }),
          ...(tag && { tags: { contains: tag } }),
          ...(title && { title: { contains: title } }),
        },
      };
      const [posts, count] = await prisma.$transaction([
        db.article.findMany({
          ...query,
          orderBy:
            sort !== '0' ? { pageview: 'desc' } : { creationtime: 'desc' },
        }),
        db.article.count({ where: query.where }),
      ]);
      return {
        count,
        posts: posts.map((item: any) => {
          item.catName = item.cat.name;
          return item;
        }),
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: number) {
    try {
      return await db.article.findUnique({
        where: { id },
        include: { cat: true },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findUpOne(id: number) {
    try {
      return await db.article.update({
        where: { id },
        data: { pageview: { increment: 1 } },
        include: { cat: true },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    try {
      await this.findOne(id);
      await db.article.update({ where: { id }, data: updateBlogDto });
      return { message: '文章修改成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async remove(id: number) {
    try {
      const post = await this.findOne(id);
      if (!post) {
        throw '文章不存在';
      }
      await db.article.delete({ where: { id } });
      return { message: '文章删除成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async removeAll(idList: number[]) {
    try {
      const article = await db.article.findMany({
        where: { id: { in: idList } },
      });
      if (!article) {
        throw '文章不存在';
      }
      await db.article.deleteMany({ where: { id: { in: idList } } });
      return { message: '文章删除成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getTags() {
    try {
      const post = await db.article.findMany();
      const tagsString = post.map((item) => item.tags);
      let tags: string[] = [];
      for (let index = 0; index < tagsString.length; index++) {
        const paramsItem = tagsString[index].split(',');
        tags = [...tags, ...paramsItem];
      }
      return [...new Set(tags)];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async next(id: number) {
    try {
      const article = await prisma.article.findFirst({
        where: { id: { gt: id } },
        orderBy: { id: 'asc' },
      });
      return article ? article : { message: '这是最后一篇文章' };
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async previous(id: number) {
    try {
      const article = await db.article.findFirst({
        where: { id: { lt: id } },
        orderBy: { id: 'desc' },
      });
      return article ? article : { message: '这是第一篇文章' };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
