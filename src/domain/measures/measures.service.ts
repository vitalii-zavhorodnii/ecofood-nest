import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateMeasureDto } from './dto/create-measure.dto';
import { FindByQueryDto } from './dto/find-by-query.dto';

import { Measure } from './models/measures.models';

@Injectable()
export class MeasuresService {
  constructor(
    @InjectModel(Measure) private measureRepository: typeof Measure,
  ) {}

  async createMeasure(dto: CreateMeasureDto): Promise<Measure> {
    return await this.measureRepository.create(dto);
  }

  async deleteMeasure(id: number) {
    await this.measureRepository.destroy({ where: { id } });
  }

  async updateMeasure(id: number, dto: any): Promise<Measure> {
    const measure = await this.measureRepository.update(dto, {
      where: { id },
      returning: true,
    });

    return measure[1][0].dataValues;
  }

  async getAllMeasures(): Promise<Measure[]> {
    return await this.measureRepository.findAll();
  }

  async getById(id: number): Promise<Measure> {
    return await this.measureRepository.findByPk(id);
  }

  async getByQuery(dto: FindByQueryDto): Promise<Measure> {
    return await this.measureRepository.findOne({ where: { ...dto } });
  }
}
