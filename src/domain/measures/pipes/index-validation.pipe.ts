import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';

import { MeasuresService } from 'domain/measures/measures.service';

@Injectable()
export class IndexValidationPipe implements PipeTransform<number> {
  constructor(private readonly service: MeasuresService) {}

  async transform(id: number): Promise<number> {
    const measure = await this.service.getById(id);

    if (!measure) throw new NotFoundException(`${id} is not exists`);

    return id;
  }
}
