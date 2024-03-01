import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [AuthModule, CategoryModule],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}
