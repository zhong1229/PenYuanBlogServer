import { Module } from '@nestjs/common';
import { BlogModule } from './modules/blog/blog.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { MediaModule } from './modules/media/media.module';
import { UploadModule } from './modules/upload/upload.module';
import { SettingModule } from './modules/setting/setting.module';
import { CarouselModule } from './modules/carousel/carousel.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    BlogModule,
    MediaModule,
    UploadModule,
    SettingModule,
    CarouselModule,
    StatisticsModule,
    CommentModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
