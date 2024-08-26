import { type Dialect } from "sequelize"
import { Sequelize } from "sequelize-typescript"

import { DatabaseConfig } from "@/configs"
import {
  AdminUser,
  AdminToken,
  BotUser,
  BotScoreHistory,
  BotAlliance,
  BotAllianceMember,
  BotRobot,
  BotItem,
  BotRobotAttribute,
  BotItemAttribute,
  BotRobotItem,
  BotReferral,
  BotDailyReward,
  BotTask,
  BotTasksComplete
} from "@/models"

const DatabaseUtil = new Sequelize({
  dialect: DatabaseConfig.dialect as Dialect,
  host: DatabaseConfig.host,
  port: DatabaseConfig.port,
  database: DatabaseConfig.database,
  username: DatabaseConfig.username,
  password: DatabaseConfig.password,
  logging: false
})

DatabaseUtil.addModels([
  AdminUser,
  AdminToken,

  BotUser,
  BotScoreHistory,
  BotAlliance,
  BotAllianceMember,
  BotRobot,
  BotItem,
  BotRobotAttribute,
  BotItemAttribute,
  BotRobotItem,

  BotReferral,

  BotTask,
  BotTasksComplete,

  BotDailyReward
])

export default DatabaseUtil
