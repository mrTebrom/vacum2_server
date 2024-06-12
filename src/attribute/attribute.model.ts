import { Product } from 'src/product/product.model';
import { Category } from './../category/category.model';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { AttributeCreateDto } from './attribute.dto';
import { CategoryAttribute } from './category-attribute';
import { ProductAttribute } from './product-attribute';

@Table({ tableName: 'attribute' })
export class Attribute extends Model<Attribute, AttributeCreateDto> {
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

  @BelongsToMany(
    () => Category,
    () => CategoryAttribute,
    'attributeId',
    'categoryId',
  )
  categories: Category[];

  @BelongsToMany(() => Product, () => ProductAttribute)
  products: Product[];
}
