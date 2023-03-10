import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional } from 'class-validator';

export class CreateVitaminDto {
  @ApiProperty({
    example: 'Vitamin C',
    description: 'Title of vitamin',
  })
  @IsString({ message: 'must be a string' })
  @Length(1, 100, {
    message: 'required to be 1-100 symbols length',
  })
  readonly title: string;

  @ApiProperty({
    example: 'C',
    description: 'Shortcut for vitamin',
  })
  @Length(1, 10, {
    message: 'required to be 1-10 symbols length',
  })
  readonly shortcut: string;

  @ApiProperty({
    example: '20% 20% 20% 20% / 20% 20% 20% 20%',
    description: 'CSS shape of border-radius for vitamin shape icon',
  })
  @IsOptional()
  @Length(1, 50, {
    message: 'required to be 1-50 symbols length',
  })
  readonly shape?: string;

  @ApiProperty({
    example: '#8CC183',
    description: 'Color of vitamin picture',
  })
  @IsOptional()
  @Length(6, 7, {
    message: 'required to be 7 symbols length',
  })
  readonly color?: string;
}
