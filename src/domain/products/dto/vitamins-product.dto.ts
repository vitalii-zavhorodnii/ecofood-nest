import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class VitaminsProduct {
  @ApiProperty({
    example: 1,
    description: 'ID of product',
  })
  @IsNumber({ allowNaN: false }, { message: 'must be a number' })
  readonly productId: number;

  @ApiProperty({
    example: 2,
    description: 'Vitamin ID',
  })
  @IsNumber({ allowNaN: false }, { message: 'must be a number' })
  readonly vitaminId: number;
}
