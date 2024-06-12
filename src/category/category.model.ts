import { Attribute } from './../attribute/attribute.model';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { CategoryCreateDto } from './category.dto';
import { Product } from 'src/product/product.model';
import { CategoryAttribute } from 'src/attribute/category-attribute';

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryCreateDto> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  value: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;
  // Category Model
  @HasMany(() => Product, {
    foreignKey: 'categoryId',
  })
  products: Product[];

  @BelongsToMany(
    () => Attribute,
    () => CategoryAttribute,
    'categoryId',
    'attributeId',
  )
  attributes: Attribute[];
}
