import { AdminToken } from "@/models"

import BaseDao from "./base.dao"

export default class AdminTokenDao extends BaseDao {
  constructor() {
    super(AdminToken)
  }
}
