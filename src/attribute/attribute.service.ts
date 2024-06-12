import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attribute } from './attribute.model';
import { AttributeCreateDto, AttributeUpdateDto } from './attribute.dto';
import { Op } from 'sequelize';
@Injectable()
export class AttributeService {
  constructor(@InjectModel(Attribute) private model: typeof Attribute) {}
  async create(dto: AttributeCreateDto) {
    const candidate = await this.model.findOne({ where: { value: dto.value } });
    if (candidate) {
      throw new HttpException(
        `${dto.value} уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.model.create(dto);
  }
  async findAll() {
    return await this.model.findAll();
  }
  async delete(id: number) {
    return await this.model.destroy({ where: { id } });
  }
  async update(id: number, dto: AttributeUpdateDto) {
    const existingCategory = await this.model.findOne({
      where: { value: dto.value, id: { [Op.not]: id } },
    });

    if (existingCategory) {
      throw new HttpException(
        `${dto.value} уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const [updatedRowsCount] = await this.model.update(dto, { where: { id } });

    if (updatedRowsCount === 0) {
      throw new HttpException(
        `Категория с id ${id} не найдена`,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.model.findByPk(id);
  }
  async findById(id: number) {
    return await this.model.findByPk(id);
  }
  async findByIds(ids: number[]) {
    let i = await this.model.findAll({
      where: {
        id: ids,
      },
    });

    console.log(i);
    return i;
  }
}
