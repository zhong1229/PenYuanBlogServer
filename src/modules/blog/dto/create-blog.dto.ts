import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty({ message: 'title不能为空' })
  @IsString({ message: 'title参数类型错误' })
  title: string;

  @IsNotEmpty({ message: 'synopsis不能为空' })
  @IsString({ message: 'synopsis参数类型错误' })
  synopsis: string;

  @IsNotEmpty({ message: 'cover不能为空' })
  @IsString({ message: 'cover参数类型错误' })
  cover: string;

  @IsNotEmpty({ message: 'content不能为空' })
  @IsString({ message: 'content参数类型错误' })
  content: string;

  @IsNotEmpty({ message: 'cid参数不能为空' })
  @IsNumber({}, { message: 'cid参数类型错误' })
  cid: number;

  @IsNotEmpty({ message: 'status参数不能为空' })
  @IsString({ message: 'status参数类型错误' })
  status: string;

  @IsNotEmpty({ message: 'tags参数不能为空' })
  @IsString({ message: 'tags参数类型错误' })
  tags: string;

  @IsNotEmpty({ message: 'count参数不能为空' })
  @IsNumber({}, { message: 'count参数类型错误' })
  count: number;
}
