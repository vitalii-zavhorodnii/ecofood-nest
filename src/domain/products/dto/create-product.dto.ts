import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

import { UpdateProductDto } from './update-product.dto';

import { isUnique } from 'domain/products/validations/unique.validation';

export class CreateProductDto extends UpdateProductDto {
  @ApiProperty({
    example: 'Cherry Bowl',
    description: 'Product title',
  })
  @IsString({ message: 'must be a string' })
  @Length(1, 100, {
    message: 'Field "title" reuired to be 1-100 symbols length',
  })
  readonly title: string;

  @ApiProperty({
    example: 'cherry-bowl',
    description: 'URL for product',
  })
  @Length(1, 100, {
    message: 'required to be 1-100 symbols length',
  })
  // @isUnique()
  readonly url: string;

  @ApiProperty({
    example: 4,
    description: 'ID of measure for product',
  })
  @IsNumber({ allowNaN: false }, { message: 'must be a number' })
  readonly measureId: number;
}
