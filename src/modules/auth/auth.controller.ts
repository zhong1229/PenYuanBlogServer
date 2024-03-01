import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<any> {
    const { name, password, email } = body;
    try {
      return await this.authService.register(name, password, email);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = req.user;
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async password(@Request() req: any, @Body() updateCategoryDto: any) {
    const { id, password } = req;
    try {
      return await this.authService.changePassword(
        id,
        password,
        updateCategoryDto.new_password,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Patch('user')
  async changeUserInfo(@Request() req: any, @Body() UpdateUserDto: any) {
    const { id } = req.user;
    try {
      return await this.authService.changeUserInfo(id, UpdateUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
