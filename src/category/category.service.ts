import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';
import { CategoryCreateDto, CategoryUpdateDto } from './category.dto';
import { Op } from 'sequelize';
@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private model: typeof Category) {}

  async create(dto: CategoryCreateDto) {
    const existingCategory = await this.model.findOne({
      where: { value: dto.value },
    });

    if (existingCategory) {
      throw new HttpException(
        `${dto.value} уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const category = await this.model.create({
      value: dto.value,
      description: dto.description,
      attributes: dto.attributes,
    });

    await category.$set(
      'attributes',

      dto.attributes,
    );

    return category;
  }
  async findAll() {
    return await this.model.findAll({ include: { all: true } });
  }
  async delete(id: number) {
    return await this.model.destroy({ where: { id } });
  }
  async update(id: number, dto: CategoryUpdateDto) {
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
}
