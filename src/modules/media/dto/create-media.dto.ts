import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsNotEmpty({ message: 'src不能为空' })
  @IsString({ message: 'src参数类型错误' })
  src: string;

  @IsNotEmpty({ message: 'synopsis不能为空' })
  @IsString({ message: 'synopsis参数类型错误' })
  synopsis: string;
}
