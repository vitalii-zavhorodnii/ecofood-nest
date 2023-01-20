import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Bowls', description: 'Category Title' })
  @IsString({ message: 'field must be a string' })
  @Length(1, 100, {
    message: 'field required to be 1-100 symbols length',
  })
  readonly title: string;

  @ApiProperty({
    example: 'Example description of category',
    description: 'Category description',
  })
  @IsString({ message: 'field must be a string' })
  readonly description: string;
}
