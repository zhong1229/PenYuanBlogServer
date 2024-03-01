import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';

import db from '../../config/prismaDB';

@Injectable()
export class CommentService {
  async create(createCommentDto: CreateCommentDto) {
    try {
      await db.comment.create({
        data: {
          username: createCommentDto.username,
          email: createCommentDto.email,
          website: createCommentDto.website,
          content: createCommentDto.content,
          postId: createCommentDto.postId,
          type: createCommentDto.type,
          parentCommentId: createCommentDto.parentCommentId || null,
          replyname: createCommentDto.replyname || null,
          replynameEmail: createCommentDto.replynameEmail || null,
        },
      });
      return { message: '评论成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAdminAll(page: number, pagesize: number, content: string) {
    try {
      const query = {
        take: pagesize,
        skip: pagesize * (page - 1),
        where: {
          ...(content && { content: { contains: content } }),
        },
      };
      const [comments, count] = await prisma.$transaction([
        db.comment.findMany({
          ...query,
          orderBy: { createdAt: 'desc' },
          include: { article: true },
        }),
        db.comment.count({ where: query.where }),
      ]);
      const data = comments.map((item) => {
        return { ...item, article: item.article.title };
      });
      return {
        count,
        comments: data,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll(id: number) {
    try {
      const [comments, count] = await prisma.$transaction([
        db.comment.findMany({
          where: { postId: id, parentCommentId: null },
          include: {
            childComments: {
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
        db.comment.count({ where: { postId: id } }),
      ]);
      return {
        comments,
        count,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async remove(id: number) {
    try {
      const comment = await db.comment.findUnique({ where: { id } });
      if (!comment) {
        throw '评论不存在';
      }
      await db.comment.delete({ where: { id } });
      return { message: '删除成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async removeAll(idList: number[]) {
    try {
      const comments = await db.comment.findMany({
        where: { id: { in: idList } },
      });
      if (!comments) {
        throw '评论不存在';
      }
      await db.comment.deleteMany({ where: { id: { in: idList } } });
      return { message: '删除成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
