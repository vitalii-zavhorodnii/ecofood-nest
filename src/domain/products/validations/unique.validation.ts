import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { ProductsService } from 'domain/products/products.service';

export function isUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueValidation,
    });
  };
}

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class UniqueValidation implements ValidatorConstraintInterface {
  constructor(private productsService: ProductsService) {}

  async validate(value: string, { property }): Promise<boolean> {
    console.error(this.productsService);
    const product = await this.productsService.getByQuery({
      [property]: value.toLowerCase(),
    });

    if (product)
      throw new UnprocessableEntityException(`${property} must be unique`);
    else return true;
  }
}
