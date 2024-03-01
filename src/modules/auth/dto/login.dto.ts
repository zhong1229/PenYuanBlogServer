import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码不能为纯数字' })
  @MinLength(6, { message: '密码最小长度为6' })
  @MaxLength(20, { message: '密码最大长度为20' })
  password: string;
}
