import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface ProductCreationAttrs {
  title: string;
  description: string;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID of product' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

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
    description: 'Product thumb',
  })
  @Column({
    type: DataType.STRING,
  })
  thumb: string;

  @ApiProperty({
    example: 400,
    description: 'Product price',
  })
  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @ApiProperty({
    example: 'delivery 1-2 days',
    description: 'Info about delivery terms',
  })
  @Column({
    type: DataType.STRING,
  })
  delivery_text: string;

  @ApiProperty({
    example: true,
    description: 'Is product in stock',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: true,
  })
  in_stock: boolean;

  @ApiProperty({
    example: [1, 5, 7],
    description: 'Array of categories IDs wich contain this product',
  })
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    defaultValue: null,
  })
  category_id: [number]; // relate array of categories with contain this product number[]

  @ApiProperty({
    example: [1, 5, 7],
    description: 'Array of IDs wich vitamins contain this product',
  })
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    defaultValue: null,
  })
  vitamins: [number]; // array of IDs of vitamins number[]

  @ApiProperty({
    example: [1, 5, 7],
    description: 'Array of suggested products IDs wich related to this product',
  })
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    defaultValue: null,
  })
  suggested: [number]; // array of IDs suggested products number[]

  @ApiProperty({
    example: 23,
    description: 'ID of measure',
  })
  @Column({
    type: DataType.INTEGER,
  })
  measure_id: number; // relate
}
