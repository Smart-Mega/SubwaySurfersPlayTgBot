import { BotRobot } from "@/models"

import BaseDao from "./base.dao"

export default class BotRobotDao extends BaseDao {
  constructor() {
    super(BotRobot)
  }
}
