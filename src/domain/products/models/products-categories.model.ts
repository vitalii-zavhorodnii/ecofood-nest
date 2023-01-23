import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Product } from 'domain/products/models/products.model';
import { Category } from 'domain/categories/models/categories.model';

interface CreationAttrs {
  productId: number;
  categoryId: number;
}

@Table({ tableName: 'products_categories', createdAt: false, updatedAt: false })
export class ProductsCategories extends Model<
  ProductsCategories,
  CreationAttrs
> {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  declare productId: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  declare categoryId: number;
}
