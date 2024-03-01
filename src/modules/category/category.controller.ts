import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryService.create(createCategoryDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll(@Query('name') name?: string) {
    try {
      return await this.categoryService.findAll(name);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.categoryService.findOneByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return await this.categoryService.update(+id, updateCategoryDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.categoryService.remove(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeAll(@Body() delist: number[]) {
    try {
      return await this.categoryService.removeAll(delist);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
