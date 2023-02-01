import { Module } from '@nestjs/common';
import { MeasuresController } from './measures.controller';
import { MeasuresService } from './measures.service';

@Module({
  controllers: [MeasuresController],
  providers: [MeasuresService]
})
export class MeasuresModule {}
