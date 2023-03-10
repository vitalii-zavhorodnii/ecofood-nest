import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Product } from 'domain/products/models/products.model';
import { ProductsVitamins } from 'domain/products/models/products-vitamins.model';

interface VitaminCreationsAttrs {
  title: string;
  shortcut: string;
  shape: string;
  color: string;
}

@Table({ tableName: 'vitamins' })
export class Vitamin extends Model<Vitamin, VitaminCreationsAttrs> {
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

  @ApiProperty({
    example: 'Vitamin C',
    description: 'Title of vitamin',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'C',
    description: 'Shortcut of vitamin',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  shortcut: string;

  @ApiProperty({
    example: '20% 20% 20% 20% / 20% 20% 20% 20%',
    description: 'Shape of vitamins picture',
  })
  @Column({
    type: DataType.STRING,
  })
  shape: string;

  @ApiProperty({
    example: '#8CC183',
    description: 'Color of vitamin picture',
  })
  @Column({
    type: DataType.STRING,
  })
  color: string;

  @BelongsToMany(() => Product, () => ProductsVitamins)
  products: Product[];
}
