import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { CategoriesModule } from 'domain/categories/categories.module';
import { ProductsModule } from 'domain/products/products.module';
import { MeasuresModule } from './domain/measures/measures.module';
import { VitaminsModule } from './domain/vitamins/vitamins.module';

import { Product } from 'domain/products/models/products.model';
import { Category } from 'domain/categories/models/categories.model';
import { ProductsCategories } from 'domain/products/models/products-categories.model';
import { Measure } from 'domain/measures/models/measures.models';
import { ProductsSuggested } from 'domain/products/models/products-suggested.model';
import { Vitamin } from 'domain/vitamins/models/vitamins.model';
import { ProductsVitamins } from 'domain/products/models/products-vitamins.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Product,
        Category,
        ProductsCategories,
        ProductsSuggested,
        ProductsVitamins,
        Measure,
        Vitamin,
      ],
      autoLoadModels: true,
    }),
    ProductsModule,
    CategoriesModule,
    MeasuresModule,
    VitaminsModule,
  ],
})
export class AppModule {}
