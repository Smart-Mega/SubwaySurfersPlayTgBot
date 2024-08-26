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

import BotRobot from "./bot.robot.model"
import BotItem from "./bot.item.model"

export interface IBotRobotItem {
  id?: number
  robot_id: number
  item_id: number
  position: string
  type: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}

@Table({
  timestamps: true,
  tableName: "bot_robot_items",
  underscored: true,
  paranoid: false
})
export default class BotRobotItem extends Model implements IBotRobotItem {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @AllowNull(true)
  @ForeignKey(() => BotRobot)
  @Column(DataType.INTEGER)
  robot_id!: number

  @AllowNull(true)
  @ForeignKey(() => BotItem)
  @Column(DataType.INTEGER)
  item_id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  position!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  type!: string

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
