import { Request } from "express"
import httpStatus from "http-status"

import { BotItemDao, BotRobotDao } from "@/dao"
import { ResponseHelper } from "@/helpers"
import { IServiceResponse } from "@/types/service"
import { LoggerUtil } from "@/utils"

import { SERVER_MSG } from "@repo/i18n"
import { BotItemAttribute, BotRobotAttribute } from "@/models"

export default class BotShopService {
  private botRobotDao: BotRobotDao
  private botItemDao: BotItemDao

  constructor() {
    this.botRobotDao = new BotRobotDao()
    this.botItemDao = new BotItemDao()
  }

  getRobots = async (req: Request): Promise<IServiceResponse> => {
    try {
      if (!req.botUserInfo) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const robotsData = await this.botRobotDao.findAll({
        where: {
          is_sale: true
        },
        include: [
          {
            model: BotRobotAttribute
          }
        ]
      })

      return ResponseHelper.success(
        httpStatus.OK,
        SERVER_MSG.BOT_SHOP_GET_ROBOTS_SUCCESS,
        robotsData
      )
    } catch (e) {
      console.error(e)
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }

  getItems = async (req: Request): Promise<IServiceResponse> => {
    try {
      if (!req.botUserInfo) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const itemsData = await this.botItemDao.findAll({
        where: {
          is_sale: true
        },
        include: [
          {
            model: BotItemAttribute
          }
        ]
      })

      return ResponseHelper.success(httpStatus.OK, SERVER_MSG.BOT_SHOP_GET_ITEMS_SUCCESS, itemsData)
    } catch (e) {
      console.error(e)
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }
}
