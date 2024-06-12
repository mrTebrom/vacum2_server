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
    @InjectModel(ProductAttribute) private produtAttirubteModel: typeof ProductAttribute,
    private categoryService: CategoryService,
  ) { }

  async create(dto: ProductCreateDto): Promise<Product> {
    const candidate = await this.model.findOne({ where: { title: dto.title } });
    if (candidate) {
      throw new HttpException('Данное название уже используется', HttpStatus.BAD_REQUEST);
    }

    const { attributes } = dto;
    console.log(attributes);

    const category = await this.categoryService.findById(dto.categoryId);
    if (!category) {
      throw new HttpException('Категория не найдена', HttpStatus.BAD_REQUEST);
    }

    const product = await this.model.create({
      ...dto,
      categoryId: category.id,
      images: dto.images.map(item => '/uploads/' + item),
    });

    if (attributes && attributes.length > 0) {
      for (const attribute of attributes) {
        const productAttribute = await this.produtAttirubteModel.findOne({
          where: { productId: product.id, attributeId: attribute.id },
        });

        if (productAttribute) {
          productAttribute.value = attribute.value;
          await productAttribute.save();
        } else {
          await this.produtAttirubteModel.create({
            productId: product.id,
            attributeId: attribute.id,
            value: attribute.value,
          });
        }
      }
    }

    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.model.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Product> {
    return await this.model.findByPk(id, { include: { all: true } });
  }

  async update(id: number, dto: ProductUpdateDto): Promise<Product> {
    console.log(dto);
    const product = await this.model.findByPk(id);
    if (!product) {
      throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND);
    }

    if (dto.title) {
      product.title = dto.title;
    }
    if (dto.price) {
      product.price = dto.price;
    }
    if (dto.categoryId) {
      const category = await this.categoryService.findById(dto.categoryId);
      if (!category) {
        throw new HttpException('Категория не найдена', HttpStatus.BAD_REQUEST);
      }
      product.categoryId = category.id;
    }
    if (dto.description) {
      product.description = dto.description;
    }
    if (dto.images) {
      product.images = dto.images.map(item => '/uploads/' + item);
    }

    await product.save();

    const { attributes } = dto;
    if (attributes && attributes.length > 0) {
      for (const attribute of attributes) {
        const productAttribute = await this.produtAttirubteModel.findOne({
          where: { productId: product.id, attributeId: attribute.id },
        });

        if (productAttribute) {
          productAttribute.value = attribute.value;
          await productAttribute.save();
        } else {
          await this.produtAttirubteModel.create({
            productId: product.id,
            attributeId: attribute.id,
            value: attribute.value,
          });
        }
      }
    }

    return product;
  }

  async destroy(id: number): Promise<void> {
    await this.model.destroy({ where: { id: id } });
  }

  async uploadImages(images: Express.Multer.File[]): Promise<string[]> {
    const imageUrls = images.map(image => '/uploads/' + image.filename);
    return imageUrls;
  }

  async findNesTabs(): Promise<Product[]> {
    return await this.model.findAll({ order: [['id', 'DESC']] });
  }
}
