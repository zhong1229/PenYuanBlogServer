import { Injectable } from '@nestjs/common';
import db from '../../config/prismaDB';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { BlogService } from '../blog/blog.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly blogService: BlogService) {}

  async findBlogAll() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
      const [draft, oneweek, onemonth, totalPosts, totalCategories] =
        await prisma.$transaction([
          db.article.count({ where: { status: '0' } }),
          db.article.count({ where: { creationtime: { gte: sevenDaysAgo } } }),
          db.article.count({ where: { creationtime: { gte: thirtyDaysAgo } } }),
          db.article.count(),
          db.category.count(),
        ]);
      return {
        draft,
        oneweek,
        onemonth,
        totalPosts,
        totalCategories,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMessageAll() {
    const todayAgo = new Date();

    const yesterdayAgo = new Date();
    yesterdayAgo.setDate(yesterdayAgo.getDate() - 1);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
      const [today, yesterday, oneweek, onemonth, total] =
        await prisma.$transaction([
          db.comment.count({
            where: {
              createdAt: {
                gte: new Date(
                  todayAgo.toISOString().split('T')[0] + 'T00:00:00Z',
                ),
                lt: new Date(
                  todayAgo.toISOString().split('T')[0] + 'T23:59:59Z',
                ),
              },
            },
          }),
          db.comment.count({
            where: {
              createdAt: {
                gte: new Date(
                  yesterdayAgo.toISOString().split('T')[0] + 'T00:00:00Z',
                ),
                lt: new Date(
                  yesterdayAgo.toISOString().split('T')[0] + 'T23:59:59Z',
                ),
              },
            },
          }),
          db.comment.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
          db.comment.count({
            where: { createdAt: { gte: thirtyDaysAgo } },
          }),
          db.comment.count(),
        ]);
      return {
        today,
        yesterday,
        oneweek,
        onemonth,
        total,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findCatALLEchart() {
    try {
      // 获取所有分类
      const allCategories = await db.category.findMany();
      const categoryCounts = await Promise.all(
        allCategories.map(async (category) => {
          const count = await db.article.count({
            where: {
              cid: category.id,
            },
          });
          return { name: category.name, value: count };
        }),
      );
      return categoryCounts;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getWeeklyCommentsStatistics() {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    try {
      // 初始化一个数组来存储每天的评论统计
      const weeklyCommentsStatistics = [];

      // 循环查询七天的评论数量
      for (
        let date = new Date(sevenDaysAgo);
        date < today;
        date.setDate(date.getDate() + 1)
      ) {
        const dayStart = new Date(
          date.toISOString().split('T')[0] + 'T00:00:00Z',
        );
        const dayEnd = new Date(
          date.toISOString().split('T')[0] + 'T23:59:59Z',
        );

        const commentsCount = await prisma.comment.count({
          where: {
            createdAt: {
              gte: dayStart,
              lt: dayEnd,
            },
          },
        });

        // 将每天的评论统计添加到数组中
        weeklyCommentsStatistics.push({
          date: date.toISOString().split('T')[0],
          count: commentsCount,
        });
      }
      return weeklyCommentsStatistics;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createTraffic(createStatisticDto: CreateStatisticDto) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      const existingData = await db.visits.findFirst({
        where: {
          timestamp: {
            gte: today,
            lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          },
          ipAddress: createStatisticDto.ipAddress,
        },
      });
      const visits = existingData
        ? existingData
        : await db.visits.create({
            data: {
              ipAddress: createStatisticDto.ipAddress,
              userAgent: createStatisticDto.userAgent,
            },
          });
      const res = await db.pageViews.create({
        data: {
          pageurl: createStatisticDto.pageurl,
          pagetitle: createStatisticDto.pagetitle,
          visitsId: visits.id,
        },
      });
      console.log(res);

      return { message: '提交成功' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getStatistics() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [post, category, images, oneweek, onImages] =
      await prisma.$transaction([
        db.article.count({ where: { status: '1' } }),
        db.category.count(),
        db.images.count(),
        db.article.count({ where: { creationtime: { gte: sevenDaysAgo } } }),
        db.images.count({ where: { creationtime: { gte: sevenDaysAgo } } }),
      ]);

    const currentDate = new Date();
    const targetDate = new Date(2023, 12, 29);
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return {
      post,
      category,
      tags: (await this.blogService.getTags()).length,
      images,
      websiteTime: -daysDifference,
      oneweek,
      onImages,
    };
  }
}
