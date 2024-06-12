// product-attribute.model.ts
import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Product } from '../product/product.model';
import { Attribute } from './attribute.model';

@Table({ tableName: 'z-product-attribute' })
export class ProductAttribute extends Model<ProductAttribute> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Attribute)
  @Column
  attributeId: number;

  @BelongsTo(() => Attribute)
  attribute: Attribute;

  @Column
  value: string; // Значение атрибута для конкретного товара
}
