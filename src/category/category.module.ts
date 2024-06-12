import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './category.model';
import { Product } from '../product/product.model';
import { CategoryAttribute } from 'src/attribute/category-attribute';
import { AttributeModule } from 'src/attribute/attribute.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Category, Product, CategoryAttribute]),
    AttributeModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [SequelizeModule, CategoryService],
})
export class CategoryModule {}
