import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CategoriesService } from 'domain/categories/categories.service';

import { Product } from './models/products.model';
import { Category } from 'domain/categories/models/categories.model';
import { Measure } from 'domain/measures/models/measures.models';
import { ProductsCategories } from './models/products-categories.model';
import { ProductsSuggested } from './models/products-suggested.model';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AddProductToCategoryDto } from './dto/add-product-to-category.dto';
import { FindByQueryDto } from './dto/find-by-query.dto';
import { ProductSuggestionDto } from './dto/product-suggestion.dto';
import { Vitamin } from 'domain/vitamins/models/vitamins.model';
import { VitaminsProduct } from './dto/vitamins-product.dto';
import { ProductsVitamins } from './models/products-vitamins.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productsRepository: typeof Product,
    @InjectModel(ProductsCategories)
    private productsCategoriesRepository: typeof ProductsCategories,
    @InjectModel(ProductsSuggested)
    private productsSuggestedRepository: typeof ProductsSuggested,
    @InjectModel(ProductsVitamins)
    private productVitaminsRepository: typeof ProductsVitamins,
    private categoriesService: CategoriesService,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    return await this.productsRepository.create(dto);
  }

  async delete(id: number) {
    await this.productsRepository.destroy({ where: { id } });
    await this.productsSuggestedRepository.destroy({
      where: { suggestedId: id },
    });
    await this.productsSuggestedRepository.destroy({
      where: { productId: id },
    });
    await this.productsCategoriesRepository.destroy({
      where: {
        productId: id,
      },
    });
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productsRepository.update(dto, {
      where: { id },
      returning: true,
    });

    const result = product[1][0].dataValues;

    return result;
  }

  async getByQuery(dto: FindByQueryDto): Promise<Product> {
    return await this.productsRepository.findOne({ where: { ...dto } });
  }

  async getAll(): Promise<Product[]> {
    return await this.productsRepository.findAll({
      where: {
        inStock: true,
      },
      include: [
        {
          model: Category,
          attributes: ['id', 'title', 'url'],
          through: {
            attributes: [],
          },
        },
        {
          model: Measure,
          attributes: ['id', 'title', 'shortcut'],
        },
        {
          model: Product,
          attributes: ['id', 'title', 'url'],
          through: {
            attributes: [],
          },
        },
        {
          model: Vitamin,
          attributes: ['id', 'shortcut', 'shape', 'color'],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt', 'measureId'] },
    });
  }

  async getById(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      include: [
        {
          model: Category,
          attributes: ['id', 'title', 'url'],
          through: {
            attributes: [],
          },
        },
        {
          model: Measure,
          attributes: ['id', 'title', 'shortcut'],
        },
        {
          model: Product,
          attributes: ['id', 'title', 'url'],
          through: {
            attributes: [],
          },
        },
        {
          model: Vitamin,
          attributes: ['id', 'shortcut', 'shape', 'color'],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt', 'measureId'] },
    });

    if (!product)
      throw new NotFoundException(`There's no product with ID - ${id}`);

    return product;
  }

  async getByUrl(url: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { url, inStock: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!product)
      throw new NotFoundException(`There's no product with URL - ${url}`);

    return product;
  }

  async addProductToCategory(dto: AddProductToCategoryDto): Promise<void> {
    const product = await this.getById(dto.productId);

    if (!product)
      throw new NotFoundException(
        `There's no product with ID - ${dto.productId}`,
      );

    const category = await this.categoriesService.getCategoryById(
      dto.categoryId,
    );

    if (!category)
      throw new NotFoundException(
        `There's no category with ID - ${dto.categoryId}`,
      );

    await this.productsCategoriesRepository.create(dto);
  }

  async addProductToSuggested(dto: ProductSuggestionDto): Promise<Product> {
    await this.productsSuggestedRepository.create(dto);

    return await this.productsRepository.findByPk(dto.productId);
  }

  async removeProductFromSuggested(dto: ProductSuggestionDto) {
    await this.productsCategoriesRepository.destroy({
      where: {
        ...dto,
      },
    });

    return await this.productsRepository.findByPk(dto.productId);
  }

  async addVitaminToProduct(dto: VitaminsProduct) {
    await this.productVitaminsRepository.create(dto);
  }

  async removeVitaminFromProduct(dto: VitaminsProduct) {
    await this.productVitaminsRepository.destroy({
      where: { ...dto },
    });
  }
}
