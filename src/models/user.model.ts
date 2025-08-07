import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
})
export class UserModel extends Model<UserModel> {
  @PrimaryKey
  @Default(DataType.INTEGER)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: 'user_email_unique',
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING(36),
    allowNull: false,
  })
  salt!: string;
}
