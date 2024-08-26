import { BotItem } from "@/models"

import BaseDao from "./base.dao"

export default class BotItemDao extends BaseDao {
  constructor() {
    super(BotItem)
  }
}
