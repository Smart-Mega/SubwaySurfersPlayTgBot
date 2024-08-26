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
import BotRobotAttribute from "./bot.robot.attribute.model"
import BotRobotItem from "./bot.robot.item.model"

export interface IBotRobot {
  id?: number
  owner_type: string
  user_id?: number
  image: string
  name: string
  score: number
  level: number
  price: number
  is_sale: boolean
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}

@Table({
  timestamps: true,
  tableName: "bot_robots",
  underscored: true,
  paranoid: false
})
export default class BotRobot extends Model implements IBotRobot {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @HasMany(() => BotRobotAttribute, { foreignKey: "robot_id", sourceKey: "id" })
  attributes!: BotRobotAttribute[]

  @HasMany(() => BotRobotItem, { foreignKey: "robot_id", sourceKey: "id" })
  items!: BotRobotItem[]

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
  score!: number

  @AllowNull(false)
  @Default(1)
  @Column(DataType.INTEGER)
  level!: number

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  price!: number

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  is_sale!: boolean

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  is_selected!: boolean

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
