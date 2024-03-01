import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  statistics() {
    try {
      return this.statisticsService.getStatistics();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('blog')
  findBlogAll() {
    try {
      return this.statisticsService.findBlogAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @Get('message')
  findMessageAll() {
    try {
      return this.statisticsService.findMessageAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('blogCat')
  findCatALLEchart() {
    try {
      return this.statisticsService.findCatALLEchart();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('commentStatistics')
  async findWeeklyCommentsStatistics() {
    try {
      return await this.statisticsService.getWeeklyCommentsStatistics();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Patch('traffic')
  async createdIp(@Body() createStatisticDto: CreateStatisticDto) {
    try {
      return await this.statisticsService.createTraffic(createStatisticDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
