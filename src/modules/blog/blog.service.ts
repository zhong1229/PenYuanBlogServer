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
      const params = createBlogDto.tags.split(',').map((item) => {
        return {
          where: { name: item },
          create: { name: item },
        };
      });
      await db.article.create({
        data: {
          ...createBlogDto,
          new_tags: {
            connectOrCreate: params,
          },
        },
      });
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
        include: { cat: true, new_tags: true },
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

      const deleteTagsPromise = post.new_tags.map(async (tag: { id: any }) => {
        const associatedArticlesCount = await db.tgas.count({
          where: { id: tag.id, article: { some: { id: { not: id } } } },
        });
        if (associatedArticlesCount === 0) {
          await db.tgas.delete({ where: { id: tag.id } });
        }
      });

      // 等待所有标签删除操作完成
      await Promise.all(deleteTagsPromise);

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

      for (const articleId of idList) {
        const articleTags = await db.article.findUnique({
          where: { id: articleId },
          include: { new_tags: true },
        });

        const deleteTagsPromise = articleTags?.new_tags.map(async (tag) => {
          const associatedArticlesCount = await db.article.count({
            where: {
              new_tags: { some: { id: tag.id, NOT: { id: articleId } } },
            },
          });
          if (associatedArticlesCount === 0) {
            await prisma.tgas.delete({ where: { id: tag.id } });
          }
        });

        // 等待所有标签删除操作完成
        await Promise.all(deleteTagsPromise || []);
      }
      return { message: '文章删除成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getTags() {
    try {
      return await db.tgas.findMany();
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
