import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AutoIncrement,
  ForeignKey
} from "sequelize-typescript"

import BotItem from "./bot.item.model"

export interface IBotItemAttribute {
  id?: number
  item_id: number
  attribute_name: string
  attribute_value: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}

@Table({
  timestamps: true,
  tableName: "bot_item_attributes",
  underscored: true,
  paranoid: false
})
export default class BotItemAttribute extends Model implements IBotItemAttribute {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @AllowNull(false)
  @ForeignKey(() => BotItem)
  @Column(DataType.INTEGER)
  item_id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  attribute_name!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  attribute_value!: string

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
