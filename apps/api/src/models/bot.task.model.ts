import { AllowNull, AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

export interface IBotTask {
  id: number
  type: string
  title?: string
  description?: string
  icon?: string
  link?: string
  reward?: number
  order?: number
}

@Table({
  timestamps: true,
  tableName: 'bot_tasks',
  underscored: true,
  paranoid: false  
})
export default class BotTask extends Model implements IBotTask {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  type!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string

  @AllowNull(true)
  @Column(DataType.STRING)
  description!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  icon!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  link!: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  reward!: number;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  order!: number;
}