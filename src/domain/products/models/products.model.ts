import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Category } from 'domain/categories/models/categories.model';
import { Measure } from 'domain/measures/models/measures.models';
import { ProductsCategories } from './products-categories.model';
import { ProductsSuggested } from './products-suggested.model';

interface ProductCreationAttrs {
  title: string;
  url: string;
  measure_id: number;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({
    example: 1,
    description: 'Unique ID of product',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'banana', description: 'Unique url of product' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    set(value: string) {
      const transformedText = value.toLowerCase();
      this.setDataValue('url', transformedText);
    },
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
    defaultValue: null,
  })
  price: number;

  // @ApiProperty({
  //   example: 400,
  //   description: 'Product price',
  // })
  // @Column({
  //   type: DataType.INTEGER,
  //   defaultValue: null,
  // })
  // old_price: number;

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
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  in_stock: boolean;

  // @ApiProperty({
  //   example: true,
  //   description: 'Size of one portion',
  // })
  // @Column({
  //   type: DataType.INTEGER,
  //   defaultValue: 0,
  // })
  // size: number;

  // composition
  // rating
  // package
  // country
  // brand
  // product status
  // vitamins
  // minerals
  // customerReviews
  // collection

  @ApiProperty({
    example: 1,
    description: 'ID of measure',
  })
  @ForeignKey(() => Measure)
  @Column({
    type: DataType.INTEGER,
  })
  measure_id: number;

  @BelongsTo(() => Measure)
  measure: Category;

  @BelongsToMany(() => Category, () => ProductsCategories)
  categories: Category[];

  @BelongsToMany(() => Product, {
    through: () => ProductsSuggested,
    foreignKey: 'productId',
  })
  suggested: Product[];

  

  // @ApiProperty({
  //   example: [1, 5, 7],
  //   description: 'Array of IDs wich vitamins contain this product',
  // })
  // @Column({
  //   type: DataType.ARRAY(DataType.INTEGER),
  //   defaultValue: null,
  // })
  // vitamins: [number]; // array of IDs of vitamins number[]
}
