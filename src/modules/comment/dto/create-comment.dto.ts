import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'username不能为空' })
  @IsString({ message: 'username类型错误' })
  username: string;

  @IsNotEmpty({ message: 'email不能为空' })
  @IsString({ message: 'email类型错误' })
  email: string;

  @IsString({ message: 'website类型错误' })
  website?: string;

  @IsNotEmpty({ message: 'content不能为空' })
  @IsString({ message: 'content类型错误' })
  content: string;

  @IsNotEmpty({ message: 'postId不能为空' })
  @IsNumber({}, { message: 'postId类型错误' })
  postId: number;

  @IsNotEmpty({ message: 'type不能为空' })
  @IsString({ message: 'type类型错误' })
  type: string;

  parentCommentId?: number;

  replyname?: string;

  replynameEmail?: string;
}
