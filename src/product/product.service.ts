import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { ProductCreateDto, ProductUpdateDto } from './product.dto';
import { CategoryService } from 'src/category/category.service';
import { ProductAttribute } from 'src/attribute/product-attribute';
import { Express } from 'express';
import { Op } from 'sequelize';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private model: typeof Product,

    @InjectModel(ProductAttribute)
    private produtAttirubteModel: typeof ProductAttribute,
    private categoryService: CategoryService,
  ) { }
  async create(dto: ProductCreateDto) {
    const candidate = await this.model.findOne({ where: { title: dto.title } })
    if (candidate) {
      throw new HttpException('Данное название уже используется', HttpStatus.BAD_REQUEST)
    }
    const { attributes } = dto;
    const category = await this.categoryService.findById(dto.categoryId);
    const product = await this.model.create({
      ...dto,
      categoryId: category.id,
      images: dto.images.map(item => '/uploads/' + item)
    });
    // Обновление значений атрибутов для конкретного товара
    for (const attribute of attributes) {
      const productAttribute = await this.produtAttirubteModel.findOne({
        where: { productId: product.id, attributeId: attribute.id },
      });

      if (productAttribute) {
        // Если запись существует, обновляем значение
        productAttribute.value = attribute.value;
        await productAttribute.save();
      } else {
        // Если запись не существует, создаем новую
        await ProductAttribute.create({
          productId: product.id,
          attributeId: attribute.id,
          value: attribute.value,
        });
      }
    }
    return product;
  }
  async findAll() {
    return await this.model.findAll({ include: { all: true } });
  }
  async findOne(id: number) {
    return await this.model.findByPk(id, { include: { all: true } });
  }
  async update(id: number, dto: ProductUpdateDto) {
    console.log(dto)
    const product = await this.model.findByPk(id);
    if (!product) {
      throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND);
    }

    // Обновляем свойства товара, если они указаны в DTO
    if (dto.title) {
      product.title = dto.title;
    }
    if (dto.price) {
      product.price = dto.price;
    }
    if (dto.categoryId) {
      const category = await this.categoryService.findById(dto.categoryId);
      product.categoryId = category.id;
    }
    if (dto.description) {
      product.description = dto.description;
    }
    // if (dto.images) {
    //   // Предполагается, что переданные изображения в DTO уже содержат путь к изображению
    //   product.images = dto.images;
    // }

    // Сохраняем обновленный товар
    await product.save();

    // Обновляем значения атрибутов для конкретного товара
    const { attributes } = dto;
    for (const attribute of attributes) {
      const productAttribute = await this.produtAttirubteModel.findOne({
        where: { productId: product.id, attributeId: attribute.id },
      });

      if (productAttribute) {
        // Если запись существует, обновляем значение
        productAttribute.value = attribute.value;
        await productAttribute.save();
      } else {
        // Если запись не существует, создаем новую
        await ProductAttribute.create({
          productId: product.id,
          attributeId: attribute.id,
          value: attribute.value,
        });
      }
    }

    return product;
  }
  async destroy(id: number) {
    await this.model.destroy({ where: { id: id } });
  }
  async uploadImages(images: Express.Multer.File[]) {
    // Обработка загруженных изображений, сохранение в базу данных, возврат URL-адресов и т.д.
    const imageUrls = images.map((image) => image.filename);
    return imageUrls;
  }


  async findNesTabs() {
    return await this.model.findAll({ order: [['id', 'DESC']] })
  }
}
