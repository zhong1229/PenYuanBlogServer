import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarouselDto {
  @IsNotEmpty({ message: 'url不能为空' })
  @IsString({ message: 'url参数类型错误' })
  url: string;

  @IsNotEmpty({ message: 'describe不能为空' })
  @IsString({ message: 'describe参数类型错误' })
  describe: string;

  @IsNotEmpty({ message: 'link不能为空' })
  @IsString({ message: 'link参数类型错误' })
  link: string;
}
