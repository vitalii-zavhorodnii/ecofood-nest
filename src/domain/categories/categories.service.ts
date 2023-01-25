import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Category } from './models/categories.model';

import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepostitory: typeof Category,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    return await this.categoryRepostitory.create(dto);
  }

  async getAllCategories() {
    return await this.categoryRepostitory.findAll({
      where: {
        is_active: true,
      },
      include: { all: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async getCategoryById(id: number) {
    return await this.categoryRepostitory.findByPk(id);
  }

  async getCategoryByUrl(url: string) {
    const category = await this.categoryRepostitory.findOne({ where: { url } });

    if (!category)
      throw new NotFoundException(`There's no category with URL - ${url}`);

    return category;
  }

  async deleteCategory(id: number) {
    await this.categoryRepostitory.destroy({ where: { id } });
  }
}
