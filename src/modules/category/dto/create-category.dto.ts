import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: '分类名不能为空' })
  @IsString({ message: '分类名错误' })
  name: string;

  @IsNotEmpty({ message: '分类介绍不能为空' })
  @IsString({ message: '分类介绍错误' })
  synopsis: string;
}
