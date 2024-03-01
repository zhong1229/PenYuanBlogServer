import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    try {
      return this.commentService.create(createCommentDto);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @Get()
  findAdminAll(
    @Query('page') page: string = '1',
    @Query('pagesize') pagesize: string = '10',
    @Query('content') content?: string,
  ) {
    try {
      return this.commentService.findAdminAll(+page, +pagesize, content);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    try {
      return this.commentService.findAll(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeAll(@Body() delist: number[]) {
    try {
      return await this.commentService.removeAll(delist);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.commentService.remove(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
