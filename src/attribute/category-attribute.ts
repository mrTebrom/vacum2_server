import {
  BelongsToMany,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '../category/category.model';
import { Attribute } from './attribute.model';
@Table({
  tableName: 'z-category_attribute',
})
export class CategoryAttribute extends Model<CategoryAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => Attribute)
  @Column
  attributeId: number;

  @BelongsTo(() => Attribute)
  attribute: Attribute;
}
