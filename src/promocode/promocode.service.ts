/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Promocode } from './promocode.model';
import { PromocodeDto } from './promocode.dto';

@Injectable()
export class PromocodeService {
  constructor(
    @InjectModel(Promocode) private model: typeof Promocode
  ) { }

  async findAll() {
    return await this.model.findAll();
  }
  async findByName(title: string) {
    return await this.model.findOne({ where: { title } })
  }
  async create(dto: PromocodeDto) {
    const candidate = await this.model.findOne({ where: { title: dto.title } });
    if (candidate) {
      throw new HttpException('Название ' + dto.title + ' уже используется', HttpStatus.BAD_REQUEST);
    }
    return await this.model.create(dto)
  }
  async destroy(id: number) {
    return await this.model.destroy({ where: { id: id } });
  }
}
