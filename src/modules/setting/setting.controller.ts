import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createSettingDto: CreateSettingDto) {
    try {
      return await this.settingService.create(createSettingDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @Get()
  async findFirst() {
    try {
      return await this.settingService.findFirst();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('userInfo')
  async getBlogUserInfo() {
    try {
      return await this.settingService.findAdminUserInfo();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
