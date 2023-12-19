import { BadRequestException, PipeTransform } from '@nestjs/common';
export class PositiveNumberPipe implements PipeTransform<number, number> {
  transform(value: number): number {
    if (value <= 0) {
      throw new BadRequestException(
        'Id is invalid',
        'Should be equal or greater than 1',
      );
    }
    return value;
  }
}
