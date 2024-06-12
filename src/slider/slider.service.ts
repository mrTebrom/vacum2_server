import { Injectable } from '@nestjs/common';
import { Slider } from './slider.model';
import { InjectModel } from '@nestjs/sequelize';
import * as fs from 'fs';
import { promisify } from 'util';  // добавим этот импорт

@Injectable()
export class SliderService {
  constructor(
    @InjectModel(Slider) private model: typeof Slider
  ) { }
  async create(url: string) {
    return await this.model.create({ image: url })
  }
  async findAll() {
    return await this.model.findAll();
  }
  async destroy(id: number) {
    const slider = await this.model.findByPk(id);
    if (!slider) {
      throw new Error('Slider not found');
    }

    // Удаляем файл
    await this.deleteFile(slider.image);

    // Удаляем запись из базы данных
    return await slider.destroy();
  }

  private async deleteFile(filename: string): Promise<void> {
    const unlinkAsync = promisify(fs.unlink);  // преобразуем функцию unlink в асинхронный вариант
    const filePath = `../ssr-client/public/uploads/slider/${filename}`;
    try {
      await unlinkAsync(filePath);
    } catch (error) {
      console.error(`Error deleting file ${filename}: ${error.message}`);
    }
  }
}
