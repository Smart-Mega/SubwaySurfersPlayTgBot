import { BotRobotAttribute } from "@/models"

import BaseDao from "./base.dao"

export default class BotRobotAttributeDao extends BaseDao {
  constructor() {
    super(BotRobotAttribute)
  }
}
