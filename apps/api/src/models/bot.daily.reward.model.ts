import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import BotUser from "./bot.user.model";

export interface IBotDailyReward {
  id: number
  user_id: number
  day: number
  reward: number
  created_at: Date
  updated_at: Date
}

@Table({
  timestamps: true,
  tableName: 'bot_daily_rewards',
  underscored: true,
  paranoid: false  
})
export default class BotDailyReward extends Model implements IBotDailyReward {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @AllowNull(false)
  @ForeignKey(() => BotUser)
  @Column(DataType.INTEGER)
  user_id!: number;

  @AllowNull(true)
  @Default(0)
  @Column(DataType.INTEGER)
  reward!: number;

  @AllowNull(true)
  @Default(0)
  @Column(DataType.INTEGER)
  day!: number;

  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATE)
  created_at!: Date

  @AllowNull(false)
  @UpdatedAt
  @Column(DataType.DATE)
  updated_at!: Date
}