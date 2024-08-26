import { BotScoreHistory } from "@/models"

import BaseDao from "./base.dao"

export default class BotScoreHistoryDao extends BaseDao {
  constructor() {
    super(BotScoreHistory)
  }
}
