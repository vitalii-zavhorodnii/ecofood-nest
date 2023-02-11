import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Req,
  UsePipes,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { CategoriesService } from './categories.service';

import { DtoValidationPipe } from 'pipes/dto-validation.pipe';

import { CreateCategoryDto } from './dto/create-category.dto';

import { Category } from './models/categories.model';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({ status: 200, type: Category })
  @Post('')
  @UsePipes(DtoValidationPipe)
  public async create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(dto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get('')
  public async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 204 })
  @Delete('/:id')
  public async delete(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }

  @ApiOperation({ summary: 'Get product details by ID' })
  @ApiResponse({ status: 200, type: Category })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/:id')
  public async getProductByID(@Param('id') id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @ApiOperation({ summary: 'Get category data by URL' })
  @ApiResponse({ status: 200, type: Category })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/by-url/:url')
  public async getByUrl(@Req() req: Request): Promise<Category> {
    const { url } = req.params;
    return this.categoryService.getCategoryByUrl(url);
  }
}
