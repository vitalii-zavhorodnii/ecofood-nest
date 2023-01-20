import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

import { Product } from 'products/models/products.model';
import { ProductsCategories } from 'products/models/products-categories.model';
import { Category } from 'categories/models/categories.model';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports: [CategoriesService],
  imports: [
    SequelizeModule.forFeature([Product, Category, ProductsCategories]),
  ],
})
export class CategoriesModule {}
