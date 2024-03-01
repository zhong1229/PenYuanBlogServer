import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSettingDto {
  @IsNotEmpty({ message: 'blogname不能为空' })
  @IsString({ message: 'blogname类型错误' })
  blogname: string;

  @IsNotEmpty({ message: 'bloglogo不能为空' })
  @IsString({ message: 'bloglogo类型错误' })
  bloglogo: string;

  @IsNotEmpty({ message: 'github参数不能为空' })
  @IsString({ message: 'github参数类型错误' })
  github: string;

  @IsNotEmpty({ message: 'blibli不能为空' })
  @IsString({ message: 'blibli错误' })
  blibli: string;
  @IsNotEmpty({ message: 'email不能为空' })
  @IsString({ message: 'email类型错误' })
  email: string;

  @IsNotEmpty({ message: 'douyin不能为空' })
  @IsString({ message: 'douyin类型错误' })
  douyin: string;

  @IsNotEmpty({ message: 'archival不能为空' })
  @IsString({ message: 'archival类型错误' })
  archival: string;

  @IsNotEmpty({ message: 'describe不能为空' })
  @IsString({ message: 'describe类型错误' })
  describe: string;

  @IsNotEmpty({ message: 'slogan不能为空' })
  @IsString({ message: 'slogan类型错误' })
  slogan: string;
}
