import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Vitamin } from './models/vitamins.model';

import { CreateVitaminDto } from './dto/create-vitamin.dto';
import { UpdateVitaminDto } from './dto/update-vitamin.dto';

@Injectable()
export class VitaminsService {
  constructor(
    @InjectModel(Vitamin) private vitaminsRepository: typeof Vitamin,
  ) {}

  async getAll(): Promise<Vitamin[]> {
    return await this.vitaminsRepository.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async create(dto: CreateVitaminDto): Promise<Vitamin> {
    return await this.vitaminsRepository.create(dto);
  }

  async update(id: number, dto: UpdateVitaminDto): Promise<Vitamin> {
    const vitamin = await this.vitaminsRepository.update(dto, {
      where: { id },
      returning: true,
    });

    const result = vitamin[1][0].dataValues;

    return result;
  }

  async delete(id: number): Promise<void> {
    await this.vitaminsRepository.destroy({ where: { id } });
  }
}
