import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PromocodeService } from './promocode.service';
import { PromocodeDto } from './promocode.dto';

@Controller('promocode')
export class PromocodeController {
  constructor(private readonly promocodeService: PromocodeService) { }

  @Get()
  async findAll() {
    return await this.promocodeService.findAll();
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    return await this.promocodeService.findByName(name);
  }

  @Post()
  async create(@Body() dto: PromocodeDto) {
    return await this.promocodeService.create(dto);
  }

  @Delete(':id')
  async destroy(@Param('id') id: number) {
    await this.promocodeService.destroy(id);
    return;
  }
}
