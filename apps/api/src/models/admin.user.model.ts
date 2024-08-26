import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AllowNull,
  Default,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AutoIncrement,
  Unique
} from "sequelize-typescript"

export interface IAdminUser {
  id?: number
  uuid: string
  role: string
  first_name: string
  last_name: string
  email: string
  email_verified: boolean
  mobile_number: string
  password: string
  status: number
  image?: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}

@Table({
  timestamps: true,
  tableName: "admin_users",
  underscored: true,
  paranoid: false
})
export default class AdminUser extends Model implements IAdminUser {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @AllowNull(false)
  @Unique(true)
  @Column(DataType.UUID)
  uuid!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  role!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  first_name!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  last_name!: string

  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  email!: string

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  email_verified!: boolean

  @AllowNull(false)
  @Column(DataType.STRING)
  mobile_number!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string

  @AllowNull(false)
  @Default(-1)
  @Column(DataType.SMALLINT)
  status!: number

  @AllowNull(true)
  @Column(DataType.STRING)
  image?: string

  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATE)
  created_at!: Date

  @AllowNull(false)
  @UpdatedAt
  @Column(DataType.DATE)
  updated_at!: Date

  @AllowNull(true)
  @DeletedAt
  @Column(DataType.DATE)
  deleted_at?: Date
}
