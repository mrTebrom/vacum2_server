import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserCreateDto } from './user.dto';
import { Role } from '../role/role.model';
import { UserRole } from '../role/user-role.model';

@Table({ tableName: 'user' })
export class User extends Model<UserCreateDto, User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  password: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
