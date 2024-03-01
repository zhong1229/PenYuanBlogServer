import { PartialType } from '@nestjs/mapped-types';
import { CreateCarouselDto } from './create-carousel.dto';

export class UpdateCarouselDto extends PartialType(CreateCarouselDto) {}
