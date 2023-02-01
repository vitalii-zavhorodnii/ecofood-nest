import {
  Controller,
  Body,
  Param,
  Req,
  Get,
  Post,
  Put,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';

import { DtoValidationPipe } from 'pipes/dto-validation.pipe';

import { Product } from './models/products.model';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AddProductToCategoryDto } from './dto/add-product-to-category.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({ status: 200, type: Product })
  @ApiResponse({ status: 400, description: 'URL must be unique' })
  @UsePipes(DtoValidationPipe)
  @Post('')
  public async createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @ApiOperation({ summary: 'Update product data by ID' })
  @ApiResponse({ status: 200, type: Product })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UsePipes(DtoValidationPipe)
  @Put('/:id')
  public async updateProduct(
    @Param('id') id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get('')
  public async getAllProducts() {
    return this.productsService.getAll();
  }

  @ApiOperation({ summary: 'Get product details by ID' })
  @ApiResponse({ status: 200, type: Product })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/:id')
  public async getProductById(@Param('id') id: number) {
    return this.productsService.getById(id);
  }

  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete('/:id')
  public async deleteProduct(@Param('id') id: number) {
    return this.productsService.delete(id);
  }

  @ApiOperation({ summary: 'Get product details by ID' })
  @ApiResponse({ status: 200, type: Product })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/by-url/:url')
  public async getProductByUrl(@Req() req: Request) {
    const { url } = req.params;
    return this.productsService.getByUrl(url);
  }

  @ApiOperation({ summary: 'Add product to category' })
  @ApiResponse({ status: 204 }) // question
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Post('/add-category')
  public async putProductInCategory(@Body() body: AddProductToCategoryDto) {
    console.log({ body });
    return this.productsService.addProductToCategory(body);
  }
}
