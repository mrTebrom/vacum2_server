import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript'; 
import { SliderDto } from './slider.dto';

@Table({ tableName: 'slider' })
export class Slider extends Model<Slider, SliderDto> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataType.STRING })
  image: string;

}
