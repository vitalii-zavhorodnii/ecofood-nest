import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class DtoValidationPipe implements PipeTransform<any> {
  async transform(
    value: any,
    metadata: ArgumentMetadata,
  ): Promise<typeof value> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map(({ property, constraints }) => {
        return `${property} - ${Object.values(constraints).join(', ')}`;
      });

      throw new BadRequestException(messages);
    }

    return value;
  }
}
