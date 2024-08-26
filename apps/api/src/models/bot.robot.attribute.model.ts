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

export interface IBotRobotAttribute {
  id?: number
  robot_id: number
  attribute_name: string
  attribute_value: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}

@Table({
  timestamps: true,
  tableName: "bot_robot_attributes",
  underscored: true,
  paranoid: false
})
export default class BotRobotAttribute extends Model implements IBotRobotAttribute {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @AllowNull(false)
  @ForeignKey(() => BotRobot)
  @Column(DataType.INTEGER)
  robot_id!: number

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
