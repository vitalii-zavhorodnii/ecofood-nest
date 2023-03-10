import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { VitaminsService } from './vitamins.service';
import { Vitamin } from './models/vitamins.model';

import { CreateVitaminDto } from './dto/create-vitamin.dto';
import { UpdateVitaminDto } from './dto/update-vitamin.dto';

@ApiTags('Vitamins')
@Controller('vitamins')
export class VitaminsController {
  constructor(private vitaminsService: VitaminsService) {}

  @ApiOperation({ summary: 'Get all vitamins' })
  @ApiResponse({ status: 200, type: [Vitamin] })
  @Get('')
  public async getAllVitamins() {
    return await this.vitaminsService.getAll();
  }

  @ApiOperation({ summary: 'Create new vitamin' })
  @ApiResponse({ status: 200, type: Vitamin })
  @Post('')
  public async createVitamin(@Body() dto: CreateVitaminDto) {
    return await this.vitaminsService.create(dto);
  }

  @ApiOperation({ summary: 'Update vitamin' })
  @ApiResponse({ status: 200, type: Vitamin })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Put('/:id')
  public async updateVitamin(
    @Param('id') id: number,
    @Body() dto: UpdateVitaminDto,
  ) {
    return await this.vitaminsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete vitamin' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete('/:id')
  public async deleteVitamin(@Param('id') id: number) {
    await this.vitaminsService.delete(id);
  }
}
