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
  HasMany
} from "sequelize-typescript"
import BotAllianceMember from "./bot.alliance.member.model"

export interface IBotAlliance {
  id?: number
  name: string
  symbol: string
  description: string
  alliance_type: string
  member_count: number
  score: number
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}

@Table({
  timestamps: true,
  tableName: "bot_alliances",
  underscored: true,
  paranoid: false
})
export default class BotAlliance extends Model implements IBotAlliance {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  symbol!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  alliance_type!: string

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  member_count!: number

  @HasMany(() => BotAllianceMember, { foreignKey: "alliance_id", sourceKey: "id" })
  members!: BotAllianceMember[]

  @AllowNull(false)
  @Default(0)
  @Column(DataType.BIGINT)
  score!: number

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
