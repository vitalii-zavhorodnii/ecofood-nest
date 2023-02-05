import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Product } from 'domain/products/models/products.model';

interface CreationAttrs {
  productId: number;
  suggestedId: number;
}

@Table({ tableName: 'products_suggested', createdAt: false, updatedAt: false })
export class ProductsSuggested extends Model<ProductsSuggested, CreationAttrs> {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  declare productId: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  declare suggestedId: number;
}
