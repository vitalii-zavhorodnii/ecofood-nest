import { Controller, Get, Post, Param, Body } from '@nestjs/common';

import { CategoriesService } from './categories.service';

import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Get('/:url')
  getByUrl(@Param('url') url: string) {
    return this.categoryService.getCategoryByUrl(url);
  }
}
