import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { RoleCreateDto } from './role.dto';
import { User } from '../user/user.model';
import { UserRole } from './user-role.model';

@Table({ tableName: 'role' })
export class Role extends Model<Role, RoleCreateDto> {
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

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
