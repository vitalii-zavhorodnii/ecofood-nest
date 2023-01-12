import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './models/products.model';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [SequelizeModule.forFeature([Product])],
  exports: [ProductsService],
})
export class ProductsModule {}
