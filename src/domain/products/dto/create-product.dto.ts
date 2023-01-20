import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Cherry Bowl', description: 'Product title' })
  @IsString({ message: 'Field "title" must be a string' })
  @Length(1, 100, {
    message: 'Field "title" reuired to be 1-100 symbols length',
  })
  readonly title: string;

  @ApiProperty({ example: 'Tasty dish', description: 'Product description' })
  @IsString({ message: 'Field "description" must be a string' })
  readonly description: string;

  @ApiProperty({ example: 4, description: 'ID of measure for product' })
  @IsNumber({ allowNaN: false }, { message: 'Field "measure_id" is required' })
  readonly measure_id: number;
}
