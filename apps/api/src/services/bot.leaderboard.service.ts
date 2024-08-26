import { Request } from "express"
import httpStatus from "http-status"
import { Op } from "sequelize"

import { BotAllianceMemberDao } from "@/dao"
import { ResponseHelper } from "@/helpers"
import { IServiceResponse } from "@/types/service"
import { LoggerUtil } from "@/utils"

import { SERVER_MSG } from "@repo/i18n"
import { BotAlliance, BotUser } from "@/models"

export default class BotLeaderboardService {
  private botAllianceMemberDao: BotAllianceMemberDao

  constructor() {
    this.botAllianceMemberDao = new BotAllianceMemberDao()
  }

  getLeaders = async (req: Request): Promise<IServiceResponse> => {
    try {
      if (!req.botUserInfo) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const { id } = req.botUserInfo

      let data = await this.botAllianceMemberDao.findAll({
        where: {
          user_id: {
            [Op.ne]: id
          },
          is_leader: true
        },
        include: [
          {
            model: BotAlliance
          },
          {
            model: BotUser
          }
        ],
        order: [[{ model: BotUser, as: "user" }, "score", "DESC"]]
      })

      return ResponseHelper.success(httpStatus.OK, SERVER_MSG.BOT_LEADERS_FETCH_SUCCESS, data)
    } catch (e) {
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }
}
