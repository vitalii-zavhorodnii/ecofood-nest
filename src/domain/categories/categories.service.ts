import { Injectable } from '@nestjs/common';
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
    return await this.categoryRepostitory.findAll();
  }

  async getCategoryById(id: number) {
    return await this.categoryRepostitory.findByPk(id);
  }

  async getCategoryByUrl(url: string) {
    console.log(url);
    return await this.categoryRepostitory.findOne({ where: { url } });
  }
}
