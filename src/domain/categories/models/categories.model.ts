import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Product } from 'domain/products/models/products.model';
import { ProductsCategories } from 'domain/products/models/products-categories.model';

interface CategoryCreationAttrs {
  title: string;
  url: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID of product' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: true, description: 'Is category active' })
  isActive: boolean = false;

  @ApiProperty({ example: 'banana', description: 'Unique url of product' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  url: string;

  @ApiProperty({ example: 'Banana', description: 'Product title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Tasty for monkeys',
    description: 'Product description',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty({
    example: 'image.jpg',
    description: 'Product picture',
  })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({
    example: 'image.jpg',
    description: 'Product picture',
  })
  @Column({
    type: DataType.STRING,
  })
  icon: string;

  @BelongsToMany(() => Product, () => ProductsCategories)
  products: Product[];
}
