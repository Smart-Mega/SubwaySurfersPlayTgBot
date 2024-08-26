import { Fields, Files } from "formidable"

import { IAdminUser, IBotUser } from "@/models"

declare global {
  namespace Express {
    interface Request {
      adminInfo?: IAdminUser
      botUserInfo?: Record<string, any>
      fields?: Fields
      files?: Files
    }
  }
}
