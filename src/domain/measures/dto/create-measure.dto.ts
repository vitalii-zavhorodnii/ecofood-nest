import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

import { isUnique } from '../validations/unique.validation';

export class CreateMeasureDto {
  @ApiProperty({
    example: 'Liter',
    description: 'Measure title',
  })
  @IsString({ message: 'must be a string' })
  @Length(1, 100, {
    message: 'required to be 1-100 symbols length',
  })
  readonly title: string;

  @ApiProperty({
    example: 'l.',
    description: 'Shortcut name for measure',
  })
  @IsString({ message: 'must be a string' })
  @Length(1, 100, {
    message: 'required to be 1-100 symbols length',
  })
  readonly shortcut: string;

  @ApiProperty({
    example: 'liter',
    description: 'Unique code for measure',
  })
  @IsString({ message: 'must be a string' })
  @Length(1, 100, {
    message: 'required to be 1-100 symbols length',
  })
  @isUnique()
  readonly code: string;
}
