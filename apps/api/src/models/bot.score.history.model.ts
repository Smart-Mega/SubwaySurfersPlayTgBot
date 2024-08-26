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
  ForeignKey,
  BelongsTo
} from "sequelize-typescript"

import BotUser from "./bot.user.model"

export interface IBotScoreHistory {
  id?: number
  user_id: number
  score: number
  type: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}

@Table({
  timestamps: true,
  tableName: "bot_score_histories",
  underscored: true,
  paranoid: false
})
export default class BotScoreHistory extends Model implements IBotScoreHistory {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

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
  @Column(DataType.BIGINT)
  score!: number

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
