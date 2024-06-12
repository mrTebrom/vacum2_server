import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeCreateDto } from './attribute.dto';

@Controller('attribute')
export class AttributeController {
  constructor(private service: AttributeService) {}
  @Post('/')
  create(@Body() dto: AttributeCreateDto) {
    console.log('---');
    console.log(dto);
    return this.service.create(dto);
  }
  @Put('/:id')
  update(@Param('id') id: number, @Body() dto: AttributeCreateDto) {
    return this.service.update(id, dto);
  }
  @Get()
  findAll() {
    return this.service.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.service.findById(id);
  }
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
