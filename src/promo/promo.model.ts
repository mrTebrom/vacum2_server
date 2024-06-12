import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ICreatePromo } from './promo.interface';

@Table({ tableName: 'promo' })
export class Promo extends Model<Promo, ICreatePromo> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataType.STRING })
  title: string;
  @Column({ type: DataType.TEXT })
  description: string;
  @Column({ type: DataType.STRING })
  href: string;
  @Column({ type: DataType.INTEGER })
  discont: number;
  @Column({ type: DataType.TEXT })
  image: string;
  @Column({ type: DataType.STRING })
  buttonTitle: string;

}
