import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  AutoIncrement
} from "sequelize-typescript"

export interface IAdminToken {
  id?: number
  token: string
  admin_uuid: string
  type: string
  blacklisted: boolean
  expires: Date
  created_at?: Date
  updated_at?: Date
}

@Table({
  timestamps: true,
  tableName: "admin_tokens",
  underscored: true,
  paranoid: false
})
export default class AdminToken extends Model implements IAdminToken {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  token!: string

  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUID)
  admin_uuid!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  type!: string

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  blacklisted!: boolean

  @AllowNull(false)
  @Column(DataType.DATE)
  expires!: Date

  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATE)
  created_at!: Date

  @AllowNull(false)
  @UpdatedAt
  @Column(DataType.DATE)
  updated_at!: Date
}
