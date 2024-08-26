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
  ForeignKey,
  HasMany
} from "sequelize-typescript"

import BotUser from "./bot.user.model"
import BotItemAttribute from "./bot.item.attribute.model"

export interface IBotItem {
  id?: number
  owner_type: string
  user_id?: number
  image: string
  name: string
  price: number
  quantity: number
  equipped_quantity: number
  sale_quantity: number
  type: string
  is_sale: boolean
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}

@Table({
  timestamps: true,
  tableName: "bot_items",
  underscored: true,
  paranoid: false
})
export default class BotItem extends Model implements IBotItem {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @HasMany(() => BotItemAttribute, { foreignKey: "item_id", sourceKey: "id" })
  attributes!: BotItemAttribute[]

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  owner_type!: string

  @AllowNull(true)
  @ForeignKey(() => BotUser)
  @Column(DataType.INTEGER)
  user_id?: number

  @AllowNull(false)
  @Column(DataType.STRING)
  image!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  price!: number

  @AllowNull(false)
  @Default(1)
  @Column(DataType.INTEGER)
  quantity!: number

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  equipped_quantity!: number

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  sale_quantity!: number

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  type!: string

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  is_sale!: boolean

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
