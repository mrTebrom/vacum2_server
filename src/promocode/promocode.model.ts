import { Column, Model, Table, DataType, PrimaryKey } from 'sequelize-typescript';
import { PromocodeDto } from './promocode.dto';

enum DiscountType {
  RETAIL = 'retail',  // Розничная скидка
  PERCENTAGE = 'percentage'  // Процентная скидка
}

@Table({
  tableName: 'promotions'
})
export class Promocode extends Model<Promocode, PromocodeDto> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  title: string;  // Название промокода

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  discount: number;  // Размер скидки

  @Column({
    type: DataType.ENUM(...Object.values(DiscountType)),
    allowNull: false
  })
  discountType: DiscountType;  // Тип скидки (розничная или процентная)
}
