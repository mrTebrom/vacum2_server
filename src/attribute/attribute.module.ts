import { Module } from '@nestjs/common';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attribute } from './attribute.model';
import { Category } from 'src/category/category.model';
import { CategoryAttribute } from './category-attribute';
import { ProductAttribute } from './product-attribute';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Attribute,
      Category,
      CategoryAttribute,
      ProductAttribute,
    ]),
  ],
  controllers: [AttributeController],
  providers: [AttributeService],
  exports: [SequelizeModule, AttributeService],
})
export class AttributeModule {}
