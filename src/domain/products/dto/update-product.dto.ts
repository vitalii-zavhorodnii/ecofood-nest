import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'must be a string' })
  @Length(1, 100, {
    message: 'Field "title" reuired to be 1-100 symbols length',
  })
  readonly title?: string;

  @IsOptional()
  @Length(1, 100, {
    message: 'required to be 1-100 symbols length',
  })
  readonly url?: string;

  @IsOptional()
  @IsNumber({ allowNaN: false }, { message: 'must be a number' })
  readonly measure_id?: number;

  @ApiProperty({
    example: 'Tasty dish for you',
    description: 'Product description',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'must be a string' })
  readonly description?: string;

  @ApiProperty({ example: 14, description: 'Product price', required: false })
  @IsOptional()
  @IsNumber({ allowNaN: false }, { message: 'must be a number' })
  readonly price?: number;

  @ApiProperty({
    example: 'delivery in 1-2 working days',
    description: 'Text about delivery',
    required: false,
  })
  @IsOptional()
  readonly delivery_text?: string;

  @ApiProperty({
    example: false,
    description: 'Product In Stock status. Default: true',
    required: false,
  })
  @IsOptional()
  readonly in_stock?: boolean = false;

  @ApiProperty({
    example: 'img.jpg',
    description: 'ACCEPT ONLY STRING - INDEV',
    required: false,
  })
  @IsOptional()
  readonly image?: string;

  @ApiProperty({
    example: 'img.jpg',
    description: 'ACCEPT ONLY STRING - INDEV',
    required: false,
  })
  @IsOptional()
  readonly thumb?: string;
}
