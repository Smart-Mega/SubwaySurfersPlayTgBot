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
  BelongsTo
} from "sequelize-typescript"

import BotAlliance from "./bot.alliance.model"
import BotUser from "./bot.user.model"

export interface IBotAllianceMember {
  id?: number
  alliance_id: number
  user_id: number
  is_leader: boolean
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}

@Table({
  timestamps: true,
  tableName: "bot_alliance_members",
  underscored: true,
  paranoid: false
})
export default class BotAllianceMember extends Model implements IBotAllianceMember {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @AllowNull(false)
  @ForeignKey(() => BotAlliance)
  @Column(DataType.INTEGER)
  alliance_id!: number

  @BelongsTo(() => BotAlliance, {
    foreignKey: "alliance_id",
    targetKey: "id"
  })
  alliance!: BotAlliance

  @AllowNull(false)
  @ForeignKey(() => BotUser)
  @Column(DataType.INTEGER)
  user_id!: number

  @BelongsTo(() => BotUser, {
    foreignKey: "user_id",
    targetKey: "id"
  })
  user!: BotUser

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  is_leader!: boolean

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
