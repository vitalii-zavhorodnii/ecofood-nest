import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MeasuresService } from '../measures.service';

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

@ValidatorConstraint({ name: 'unique-measure', async: true })
@Injectable()
export class UniqueValidation implements ValidatorConstraintInterface {
  constructor(private readonly service: MeasuresService) {}

  async validate(value: string, { property }): Promise<boolean> {
    if (value) {
      const measure = await this.service.getByQuery({
        [property]: value.toLowerCase(),
      });

      if (measure)
        throw new UnprocessableEntityException(`${property} must be unique`);
      else return true;
    } else return true;
  }
}
