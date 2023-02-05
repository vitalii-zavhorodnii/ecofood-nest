import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UsePipes,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MeasuresService } from './measures.service';
import { Measure } from './models/measures.models';

import { DtoValidationPipe } from 'pipes/dto-validation.pipe';
import { IndexValidationPipe } from './pipes/index-validation.pipe';

import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';

@ApiTags('Measures')
@Controller('measures')
export class MeasuresController {
  constructor(private measureService: MeasuresService) {}

  @ApiOperation({ summary: 'Create new measure' })
  @ApiResponse({ status: 200, type: Measure })
  @UsePipes(DtoValidationPipe)
  @Post('')
  public async create(@Body() dto: CreateMeasureDto): Promise<Measure> {
    return this.measureService.createMeasure(dto);
  }

  @ApiOperation({ summary: 'Delete measure' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete('/:id')
  public async delete(@Param('id', IndexValidationPipe) id: number) {
    return this.measureService.deleteMeasure(id);
  }

  @ApiOperation({ summary: 'Update measure' })
  @ApiResponse({ status: 200, type: Measure })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UsePipes(DtoValidationPipe)
  @Put('/:id')
  public async update(
    @Param('id', IndexValidationPipe) id: number,
    @Body() dto: UpdateMeasureDto,
  ): Promise<Measure> {
    return this.measureService.updateMeasure(id, dto);
  }

  @ApiOperation({ summary: 'Get all measures' })
  @ApiResponse({ status: 200, type: [Measure] })
  @Get('')
  public async getAllMeasures(): Promise<Measure[]> {
    return this.measureService.getAllMeasures();
  }
}
