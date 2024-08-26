import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
import { BotUser } from "@/models/index.ts"

export interface IBotReferral {
  id: number
  referral_code: string
  referred_user_id: number
}

@Table({
  timestamps: true,
  tableName: 'bot_referrals',
  underscored: true,
  paranoid: false,
})
export default class BotReferralModel extends Model implements IBotReferral {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  referral_code!: string

  @AllowNull(false)
  @ForeignKey(() => BotUser)
  @Column(DataType.INTEGER)
  referred_user_id!: number

  @BelongsTo(() => BotUser, {
    foreignKey: "referred_user_id",
    targetKey: "id"
  })
  user!: BotUser

}