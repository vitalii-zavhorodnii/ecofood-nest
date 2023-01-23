import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Product } from './models/products.model';
import { Category } from 'domain/categories/models/categories.model';
import { ProductsCategories } from './models/products-categories.model';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AddCategoryToProductDto } from './dto/add-product-to-category.dto';

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

  // async update(id: number, dto: UpdateProductDto) {
  async update(id: number, dto: any) {
    // refactor
    const product = await this.productsRepository.update(dto, {
      where: { id },
    });

    if (dto.categories?.length) {
      await this.productsCategoriesRepository.destroy({
        where: { productId: id },
      });
      const bulkDto = dto.categories.map((categoryId: number) => ({
        productId: id,
        categoryId,
      }));

      await this.productsCategoriesRepository.bulkCreate(bulkDto);
    }

    return product;
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
}
