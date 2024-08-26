import { Request } from "express"
import httpStatus from "http-status"
import { literal } from "sequelize"

import { BotItemDao, BotRobotDao, BotRobotItemDao } from "@/dao"
import { ResponseHelper } from "@/helpers"
import { BotItemAttribute, BotRobotAttribute, BotRobotItem } from "@/models"
import { IServiceResponse } from "@/types/service"
import { DatabaseUtil, LoggerUtil } from "@/utils"

import { SERVER_MSG } from "@repo/i18n"

export default class BotRobotService {
  private botRobotDao: BotRobotDao
  private botItemDao: BotItemDao
  private botRobotItemDao: BotRobotItemDao

  constructor() {
    this.botRobotDao = new BotRobotDao()
    this.botItemDao = new BotItemDao()
    this.botRobotItemDao = new BotRobotItemDao()
  }

  setItem = async (req: Request): Promise<IServiceResponse> => {
    try {
      if (!req.botUserInfo) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const { robot_id, item_id, position, type, remaining } = req.body
      let msg = ""

      const t = await DatabaseUtil.transaction()

      try {
        let itemData = await this.botRobotItemDao.findOne({
          where: {
            robot_id,
            position,
            type
          },
          transaction: t
        })

        if (itemData) {
          const safeItemData = itemData.toJSON()

          // Destroy old item
          await this.botRobotItemDao.destroy({
            where: {
              id: safeItemData.id
            },
            transaction: t
          })

          await this.botItemDao.update(
            {
              equipped_quantity: literal("equipped_quantity - 1")
            },
            { where: { id: safeItemData.item_id }, transaction: t }
          )

          msg = SERVER_MSG.BOT_ROBOT_SET_ITEM_REMOVED_SUCCESS

          // Replace with new item
          if (item_id !== safeItemData.item_id && Number(remaining) > 0) {
            await this.botRobotItemDao.create(
              {
                robot_id,
                item_id,
                position,
                type
              },
              { transaction: t }
            )

            await this.botItemDao.update(
              {
                equipped_quantity: literal("equipped_quantity + 1")
              },
              { where: { id: item_id }, transaction: t }
            )

            msg = SERVER_MSG.BOT_ROBOT_SET_ITEM_REPLACED_SUCCESS
          }
        } else {
          // Put new item if remaining
          if (Number(remaining) > 0) {
            itemData = await this.botRobotItemDao.create(
              {
                robot_id,
                item_id,
                position,
                type
              },
              { transaction: t }
            )

            await this.botItemDao.update(
              {
                equipped_quantity: literal("equipped_quantity + 1")
              },
              { where: { id: item_id }, transaction: t }
            )

            msg = SERVER_MSG.BOT_ROBOT_SET_ITEM_PUT_SUCCESS
          }
        }

        const newRobots = await this.botRobotDao.findAll({
          where: { user_id: req.botUserInfo.id },
          include: [
            {
              model: BotRobotAttribute
            },
            {
              model: BotRobotItem
            }
          ],
          transaction: t
        })

        const newItems = await this.botItemDao.findAll({
          where: { user_id: req.botUserInfo.id },
          include: [
            {
              model: BotItemAttribute
            }
          ],
          transaction: t
        })

        await t.commit()
        return ResponseHelper.success(httpStatus.OK, msg, {
          robotsData: newRobots,
          itemsData: newItems
        })
      } catch (ee) {
        await t.rollback()
        LoggerUtil.error(ee)
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_ROBOT_SET_ITEM_FAILED)
      }
    } catch (e) {
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }
}
