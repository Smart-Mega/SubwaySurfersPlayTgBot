import { AdminUser } from "@/models"

import BaseDao from "./base.dao"

export default class AdminUserDao extends BaseDao {
  constructor() {
    super(AdminUser)
  }
}
