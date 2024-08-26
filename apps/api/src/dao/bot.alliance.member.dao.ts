import { BotAllianceMember } from "@/models"

import BaseDao from "./base.dao"

export default class BotAllianceMemberDao extends BaseDao {
  constructor() {
    super(BotAllianceMember)
  }
}
