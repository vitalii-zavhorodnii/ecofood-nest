import { Injectable, NotFoundException } from '@nestjs/common';

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { ProductsService } from 'domain/products/products.service';

export function isExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IndexExistsValidation,
    });
  };
}

@ValidatorConstraint({ name: 'exists', async: true })
@Injectable()
export class IndexExistsValidation implements ValidatorConstraintInterface {
  constructor(private readonly productsService: ProductsService) {}

  async validate(value: number): Promise<boolean> {
    const product = await this.productsService.getById(value);

    if (!product) throw new NotFoundException(`${value} is not exists`);
    else return true;
  }
}
