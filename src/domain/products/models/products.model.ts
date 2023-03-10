import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Category } from 'domain/categories/models/categories.model';
import { Measure } from 'domain/measures/models/measures.models';
import { ProductsCategories } from './products-categories.model';
import { ProductsSuggested } from './products-suggested.model';
import { Vitamin } from 'domain/vitamins/models/vitamins.model';
import { ProductsVitamins } from './products-vitamins.model';

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
    example: 400,
    description: 'Product price',
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  price: number;

  @ApiProperty({
    example: 500,
    description: 'Old price',
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  oldPrice: number;

  @ApiProperty({
    example: 500,
    description: 'Size of package',
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  size: number;

  @ApiProperty({
    example: 'delivery 1-2 days',
    description: 'Info about delivery terms',
  })
  @Column({
    type: DataType.STRING,
  })
  deliveryText: string;

  @ApiProperty({
    example: true,
    description: 'Is product in stock',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  inStock: boolean;

  // composition
  // rating
  // package
  // country
  // brand
  // product status

  // minerals
  // customerReviews
  // collection

  @ApiProperty({
    example: 1,
    description: 'ID of measure',
  })
  @BelongsTo(() => Measure, 'measureId')
  measure: Measure;

  @BelongsToMany(() => Vitamin, () => ProductsVitamins)
  vitamins: Vitamin[];

  @BelongsToMany(() => Category, {
    through: () => ProductsCategories,
    foreignKey: 'productId',
  })
  categories: Category[];

  @BelongsToMany(() => Product, {
    through: () => ProductsSuggested,
    foreignKey: 'productId',
  })
  suggested: Product[];
}
