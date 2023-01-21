import {
  Controller,
  Body,
  Param,
  Req,
  Get,
  Post,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';

import { ValidationPipe } from 'pipes/validation.pipe';

import { Product } from './models/products.model';

import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get('')
  public async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({ status: 200, type: Product })
  @UsePipes(ValidationPipe)
  @Post('')
  public async create(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
  }

  @ApiOperation({ summary: 'Get product details by ID' })
  @ApiResponse({ status: 200, type: Product })
  @Get('/:id')
  public async getProductByID(@Param('id') id: number) {
    return this.productsService.getProductByID(id);
  }

  @ApiOperation({ summary: 'Get product details by ID' })
  @ApiResponse({ status: 200, type: Product })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/with-url/:url')
  public async getProductByUrl(@Req() req: Request) {
    const { url } = req.params;
    return this.productsService.getProductByUrl(url);
  }
}
