import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString({ message: 'must be a string' })
  @Length(1, 100, {
    message: 'Field "title" reuired to be 1-100 symbols length',
  })
  @IsOptional()
  readonly title?: string;

  @Length(1, 100, {
    message: 'required to be 1-100 symbols length',
  })
  @IsOptional()
  readonly url?: string;

  @IsNumber({ allowNaN: false }, { message: 'must be a number' })
  @IsOptional()
  readonly measureId: number;

  @ApiProperty({
    example: 'Tasty dish for you',
    description: 'Product description',
    required: false,
  })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ example: 14, description: 'Product price', required: false })
  @IsNumber({ allowNaN: false }, { message: 'must be a number' })
  @IsOptional()
  readonly price?: number;

  @ApiProperty({
    example: 'delivery in 1-2 working days',
    description: 'Text about delivery',
    required: false,
  })
  @IsOptional()
  readonly deliveryText?: string;

  @ApiProperty({
    example: false,
    description: 'Product In Stock status. Default: true',
    required: false,
  })
  @IsOptional()
  readonly inStock?: boolean = false;

  @ApiProperty({
    example: 'img.jpg',
    description: 'ACCEPT ONLY STRING - INDEV',
    required: false,
  })
  @IsOptional()
  readonly image?: string;
}
