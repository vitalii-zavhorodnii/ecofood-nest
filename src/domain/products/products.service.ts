import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.productsRepository.findAll({
      where: {
        in_stock: true,
      },
      include: { all: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async getProductByID(id: number) {
    return await this.productsRepository.findByPk(id, {});
  }

  async getProductByUrl(url: string) {
    const product = await this.productsRepository.findOne({
      where: { url, in_stock: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!product)
      throw new NotFoundException(`There's no product with URL - ${url}`);

    return product;
  }
}
