import {
  Controller,
  Post,
  Delete,
  Get,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateDto, CategoryUpdateDto } from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) {}
  @Post('/')
  create(@Body() dto: CategoryCreateDto) {
    return this.service.create(dto);
  }
  @Put('/:id')
  update(@Param('id') id: number, @Body() dto: CategoryUpdateDto) {
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
