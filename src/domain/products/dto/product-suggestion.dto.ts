import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ProductSuggestionDto {
  @ApiProperty({
    example: 1,
    description: 'ID of product',
  })
  @IsNumber({ allowNaN: false }, { message: 'must be a number' })
  readonly productId: number;

  @ApiProperty({
    example: 2,
    description: 'ID of suggested product',
  })
  @IsNumber({ allowNaN: false }, { message: 'must be a number' })
  readonly suggestedId: number;
}
