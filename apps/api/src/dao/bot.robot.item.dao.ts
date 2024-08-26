import { BotRobotItem } from "@/models"

import BaseDao from "./base.dao"

export default class BotRobotItemDao extends BaseDao {
  constructor() {
    super(BotRobotItem)
  }
}
