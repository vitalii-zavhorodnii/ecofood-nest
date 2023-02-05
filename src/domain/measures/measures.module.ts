import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { MeasuresController } from './measures.controller';
import { MeasuresService } from './measures.service';

import { Product } from 'domain/products/models/products.model';
import { ProductsCategories } from 'domain/products/models/products-categories.model';
import { Category } from 'domain/categories/models/categories.model';
import { Measure } from 'domain/measures/models/measures.models';

import { UniqueValidation } from './validations/unique.validation';

@Module({
  controllers: [MeasuresController],
  providers: [MeasuresService, UniqueValidation],
  imports: [
    SequelizeModule.forFeature([
      Product,
      Category,
      ProductsCategories,
      Measure,
    ]),
  ],
})
export class MeasuresModule {}
