import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';
import { Category } from '../category/category.model';
import { CategoryModule } from 'src/category/category.module';
import { ProductAttribute } from 'src/attribute/product-attribute';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, Category, ProductAttribute]),
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [SequelizeModule],
})
export class ProductModule {}
