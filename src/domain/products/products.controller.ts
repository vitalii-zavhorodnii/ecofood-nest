import { Controller, Body, Param, Get, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

import { Product } from './models/products.model';

import { ValidationPipe } from 'pipes/validation.pipe';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get('')
  public getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @ApiOperation({ summary: 'Create new product' })
  @UsePipes(ValidationPipe)
  @Post('')
  public create(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
  }

  @ApiOperation({ summary: 'Get product details by ID' })
  @Get('/:id')
  public getProductByID(@Param('id') id: number) {
    return this.productsService.getProductByID(id);
  }
}
