import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { VitaminsService } from './vitamins.service';
import { VitaminsController } from './vitamins.controller';

import { Vitamin } from './models/vitamins.model';

@Module({
  providers: [VitaminsService],
  controllers: [VitaminsController],
  imports: [SequelizeModule.forFeature([Vitamin])],
})
export class VitaminsModule {}
