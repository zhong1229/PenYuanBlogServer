import { Module } from '@nestjs/common';
import { CarouselService } from './carousel.service';
import { CarouselController } from './carousel.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CarouselController],
  providers: [CarouselService],
})
export class CarouselModule {}
