import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import BotUser from "./bot.user.model";
import BotTask from "./bot.task.model";

export interface IBotTasksComplete {
  id?: number
  user_id?: number
  task_type?: string
  task_id?: number
}

@Table({
  timestamps: true,
  tableName: 'bot_tasks_completes',
  underscored: true,
  paranoid: false
})
export default class BotTasksComplete extends Model implements IBotTasksComplete {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @AllowNull(false)
  @ForeignKey(() => BotUser)
  @Column(DataType.INTEGER)
  user_id!: number;
  
  @AllowNull(false)
  @Column(DataType.STRING)
  task_type!: string;

  @AllowNull(false)
  @ForeignKey(() => BotTask)
  @Column(DataType.INTEGER)
  task_id!: number;
}