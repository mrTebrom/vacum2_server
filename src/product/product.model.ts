import {
  BelongsTo,
  Column,
  DataType,
  BelongsToMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductCreateDto } from './product.dto';
import { Category } from '../category/category.model';
import { ProductAttribute } from 'src/attribute/product-attribute';
import { Attribute } from 'src/attribute/attribute.model';

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductCreateDto> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  images: string[]
  @Column({ type: DataType.STRING, unique: true })
  title: string;
  @Column({ type: DataType.INTEGER })
  price: number;
  @Column({ type: DataType.TEXT })
  description: string;
  // Foreign key referencing the Category model

  @BelongsTo(() => Category, {
    foreignKey: 'categoryId',
    onDelete: 'CASCADE',
  })
  category: Category;

  @Column({ type: DataType.INTEGER })
  categoryId: number;

  @BelongsToMany(() => Attribute, () => ProductAttribute)
  attributes: Attribute[];

  @Column({ type: DataType.INTEGER })
  discont: number;

  @Column({ type: DataType.BOOLEAN })
  typeDiscont: boolean; // true розничная | false процент 

  @Column({ type: DataType.INTEGER })
  star: number; // Оценка

}
