import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Product } from './models/products.model';

import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productsRepository: typeof Product,
  ) {}

  async createProduct(dto: CreateProductDto) {
    return await this.productsRepository.create(dto);
  }

  async getAllProducts() {
    return await this.productsRepository.findAll();
  }

  async getProductByID(id: number) {
    const product = await this.productsRepository.findByPk(id);
    return product ?? null;
  }
}
