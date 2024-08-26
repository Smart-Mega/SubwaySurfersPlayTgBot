import { BotItemAttribute } from "@/models"

import BaseDao from "./base.dao"

export default class BotItemAttributeDao extends BaseDao {
  constructor() {
    super(BotItemAttribute)
  }
}
