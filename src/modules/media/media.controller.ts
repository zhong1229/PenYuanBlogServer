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
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    try {
      return this.mediaService.create(createMediaDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  findAll() {
    try {
      return this.mediaService.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('home')
  findHomeImageAll() {
    try {
      return this.mediaService.findAll(10);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    try {
      return this.mediaService.update(+id, updateMediaDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  removeAll(@Body() idList: number[]) {
    try {
      return this.mediaService.removeAll(idList);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
