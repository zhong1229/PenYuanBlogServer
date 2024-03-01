import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名只能是字符串' })
  name: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码不能为纯数字' })
  @MinLength(6, { message: '密码最小长度为6' })
  @MaxLength(20, { message: '密码最大长度为20' })
  password: string;
}
