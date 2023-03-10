import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Product } from 'domain/products/models/products.model';

interface MeasureCreationAttrs {
  title: string;
  shortcut: string;
  code: string;
}

@Table({ tableName: 'measures' })
export class Measure extends Model<Measure, MeasureCreationAttrs> {
  @ApiProperty({
    example: 1,
    description: 'Unique ID of measure',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Kilogram', description: 'Measure title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'kg', description: 'Measure shortcut name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  shortcut: string;

  @ApiProperty({
    example: 'kilo',
    description: 'Measure code for unique values',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  code: string;

  // @ForeignKey(() => Product)
  // @HasMany(() => Product)
  // products: Product[];
}
