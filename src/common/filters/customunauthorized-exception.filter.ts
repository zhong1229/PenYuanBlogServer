import { UnauthorizedException } from '@nestjs/common';

export class CustomUnauthorizedException extends UnauthorizedException {
  constructor(message?: string | object | any, error?: string) {
    super({ message, error }, error);
  }
}
