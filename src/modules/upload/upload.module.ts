import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express/multer';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(), // 将文件缓存在内存中
      limits: { fileSize: 10 * 1024 * 1024 }, // 文件大小限制，根据需要调整
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
