import { BotReferral } from "@/models"

import BaseDao from "./base.dao"

export default class BotReferralDao extends BaseDao {
  constructor() {
    super(BotReferral)
  }
}