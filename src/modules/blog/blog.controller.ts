import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    try {
      return await this.blogService.create(createBlogDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('pagesize') pagesize: string = '10',
    @Query('cat') cat?: string,
    @Query('tag') tag?: string,
    @Query('title') title?: string,
    @Query('sort') sort: string = '0',
  ) {
    try {
      return await this.blogService.findAll(
        +page,
        +pagesize,
        sort,
        cat,
        title,
        tag !== 'undefined' && tag,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('tags')
  async getTags() {
    try {
      return await this.blogService.getTags();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id/previous')
  async previousArticle(@Param('id') id: string) {
    try {
      return await this.blogService.previous(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id/next')
  async nextArticle(@Param('id') id: string) {
    try {
      return await this.blogService.next(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const post = await this.blogService.findOne(+id);
      if (!post) {
        throw '文章不存在';
      }
      return post;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('content/:id')
  async findContentOne(@Param('id') id: string) {
    try {
      const post = await this.blogService.findUpOne(+id);
      if (!post) {
        throw '文章不存在';
      }
      return post;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    try {
      return await this.blogService.update(+id, updateBlogDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeAll(@Body() delist: number[]) {
    try {
      return await this.blogService.removeAll(delist);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.blogService.remove(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
