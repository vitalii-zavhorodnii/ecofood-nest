import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';

import { ProductsService } from 'domain/products/products.service';

@Injectable()
export class IndexValidationPipe implements PipeTransform<number> {
  constructor(private readonly productsService: ProductsService) {}

  async transform(value: number): Promise<number> {
    const product = await this.productsService.getById(value);

    if (!product) throw new NotFoundException(`${value} is not exists`);

    return value;
  }
}
