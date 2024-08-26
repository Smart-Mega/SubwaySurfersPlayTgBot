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
  HasOne,
  HasMany,
} from "sequelize-typescript"

import BotAllianceMember from "./bot.alliance.member.model"
import BotRobot from "./bot.robot.model"
import BotItem from "./bot.item.model"

export interface IBotUser {
  id: number
  tg_id: number
  tg_avatar: string
  tg_username: string
  tg_first_name: string
  tg_last_name: string
  wallet_private_key: string
  wallet_public_key: string
  exchangeable_point: number
  score: number
  referral_code: string
  status: number
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  hourly_rewarded_at: Date
  last_online_at?: Date
  is_online: number
  hourly_reward_point:number
}

@Table({
  timestamps: true,
  tableName: "bot_users",
  underscored: true,
  paranoid: false
})
export default class BotUser extends Model implements IBotUser {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @HasOne(() => BotAllianceMember, { foreignKey: "user_id", sourceKey: "id" })
  allianceMember!: BotAllianceMember

  @HasMany(() => BotRobot, { foreignKey: "user_id", sourceKey: "id" })
  robots!: BotRobot[]

  @HasMany(() => BotItem, { foreignKey: "user_id", sourceKey: "id" })
  items!: BotItem[]

  @AllowNull(false)
  @Column(DataType.BIGINT)
  tg_id!: number

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  tg_avatar!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  tg_username!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  tg_first_name!: string

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  tg_last_name!: string

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  wallet_private_key!: string

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  wallet_public_key!: string

  @AllowNull(false)
  @Default(0)
  @Column(DataType.BIGINT)
  exchangeable_point!: number

  @AllowNull(false)
  @Default(0)
  @Column(DataType.BIGINT)
  score!: number

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  referral_code!: string

  @AllowNull(false)
  @Default(-1)
  @Column(DataType.SMALLINT)
  status!: number

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

  @AllowNull(false)
  @Default(new Date())
  @Column(DataType.DATE)
  hourly_rewarded_at!: Date

  @AllowNull(false)
  @Default(new Date())
  @Column(DataType.DATE)
  last_online_at?: Date

  @AllowNull(false)
  @Default(0)
  @Column(DataType.SMALLINT)
  is_online!: number

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  hourly_reward_point!: number
}
