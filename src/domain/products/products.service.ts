import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Product } from './models/products.model';
import { ProductsCategories } from './models/products-categories.model';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AddProductToCategoryDto } from './dto/add-product-to-category.dto';
import { FindByQueryDto } from './dto/find-by-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productsRepository: typeof Product,
    @InjectModel(ProductsCategories)
    private productsCategoriesRepository: typeof ProductsCategories,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    return await this.productsRepository.create(dto);
  }

  async delete(id: number) {
    await this.productsRepository.destroy({ where: { id } });
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.productsRepository.update(dto, {
      where: { id },
    });

    return product;
  }

  async getByQuery(dto: FindByQueryDto): Promise<Product> {
    return await this.productsRepository.findOne({ where: { ...dto } });
  }

  async getAll(): Promise<Product[]> {
    return await this.productsRepository.findAll({
      where: {
        in_stock: true,
      },
      include: { all: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async getById(id: number): Promise<Product> {
    const product = await this.productsRepository.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!product)
      throw new NotFoundException(`There's no product with ID - ${id}`);

    return product;
  }

  async getByUrl(url: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { url, in_stock: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!product)
      throw new NotFoundException(`There's no product with URL - ${url}`);

    return product;
  }

  async addProductToCategory(dto: AddProductToCategoryDto): Promise<void> {
    const result = await this.productsCategoriesRepository.create(dto);

    console.log({ result });
  }
}
