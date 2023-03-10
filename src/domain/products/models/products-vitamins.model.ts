import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Product } from 'domain/products/models/products.model';
import { Vitamin } from 'domain/vitamins/models/vitamins.model';

interface CreationAttrs {
  productId: number;
  vitaminId: number;
}

@Table({ tableName: 'products_vitamins', createdAt: false, updatedAt: false })
export class ProductsVitamins extends Model<ProductsVitamins, CreationAttrs> {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  declare productId: number;

  @ForeignKey(() => Vitamin)
  @Column({
    type: DataType.INTEGER,
  })
  declare vitaminId: number;
}
