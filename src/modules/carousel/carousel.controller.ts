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
} from '@nestjs/common';
import { CarouselService } from './carousel.service';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { UpdateCarouselDto } from './dto/update-carousel.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('carousel')
export class CarouselController {
  constructor(private readonly carouselService: CarouselService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCarouselDto: CreateCarouselDto) {
    try {
      return this.carouselService.create(createCarouselDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  findAll() {
    try {
      return this.carouselService.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarouselDto: UpdateCarouselDto,
  ) {
    try {
      return this.carouselService.update(+id, updateCarouselDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.carouselService.remove(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
