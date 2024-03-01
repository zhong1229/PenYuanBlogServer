// import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatisticDto {
  // @IsNotEmpty({ message: 'ipAddress不能为空' })
  // @IsString({ message: 'ipAddress参数类型错误' })
  ipAddress: string;

  // @IsNotEmpty({ message: 'userAgent不能为空' })
  // @IsString({ message: 'userAgent参数类型错误' })
  userAgent: string;

  // @IsNotEmpty({ message: 'pageurl不能为空' })
  // @IsString({ message: 'pageurl参数类型错误' })
  pageurl: string;

  // @IsNotEmpty({ message: 'pagetitle不能为空' })
  // @IsString({ message: 'pagetitle参数类型错误' })
  pagetitle: string;
}
