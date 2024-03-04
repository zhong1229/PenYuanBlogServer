import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ key: string }> {
    const key = `uploads/${Date.now()}_${file.originalname}`;
    console.log(file);

    const localFilePath = file.buffer;

    try {
      const uploadedKey = await this.uploadService.uploadFile(
        localFilePath,
        key,
      );
      return { key: uploadedKey };
    } catch (error) {
      throw new Error(`File upload failed: ${error}`);
    }
  }
}
