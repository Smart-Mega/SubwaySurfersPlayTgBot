import { Request } from "express"
import httpStatus from "http-status"

import { BotAllianceDao, BotAllianceMemberDao, BotUserDao } from "@/dao"
import { ResponseHelper } from "@/helpers"
import {
  BotAlliance,
  BotAllianceMember,
  BotItem,
  BotItemAttribute,
  BotRobot,
  BotRobotAttribute,
  BotRobotItem
} from "@/models"
import { IServiceResponse } from "@/types/service"
import { DatabaseUtil, LoggerUtil } from "@/utils"

import { SERVER_MSG } from "@repo/i18n"
import { literal } from "sequelize"

export default class BotAuthService {
  private botUserDao: BotUserDao
  private botAllianceDao: BotAllianceDao
  private botAllianceMemberDao: BotAllianceMemberDao

  constructor() {
    this.botUserDao = new BotUserDao()
    this.botAllianceDao = new BotAllianceDao()
    this.botAllianceMemberDao = new BotAllianceMemberDao()
  }

  refresh = async (req: Request): Promise<IServiceResponse> => {
    try {
      if (!req.botUserInfo) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const { tg_id } = req.botUserInfo

      let data = await this.botUserDao.findOne({
        where: { tg_id },
        include: [
          {
            model: BotAllianceMember,
            include: [
              {
                model: BotAlliance
              }
            ]
          },
          {
            model: BotRobot,
            include: [
              {
                model: BotRobotAttribute
              },
              {
                model: BotRobotItem
              }
            ]
          },
          {
            model: BotItem,
            include: [
              {
                model: BotItemAttribute
              }
            ]
          }
        ]
      })

      if (!data) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const safeData = data.toJSON()
      const rank = await this.botUserDao.getRank(safeData.id)
      return ResponseHelper.success(httpStatus.OK, SERVER_MSG.BOT_USER_AUTHENTICATE_SUCCESS, {
        ...safeData,
        rank: String(rank)
      })
    } catch (e) {
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }

  joinAlliance = async (req: Request): Promise<IServiceResponse> => {
    try {
      if (!req.botUserInfo) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const { alliance_id } = req.body
      const { id: user_id, allianceMember, score } = req.botUserInfo

      if (!allianceMember) {
        const t = await DatabaseUtil.transaction()

        try {
          await this.botAllianceMemberDao.create(
            {
              alliance_id,
              user_id,
              is_leader: false
            },
            { transaction: t }
          )

          await this.botAllianceDao.update(
            {
              member_count: literal("member_count + 1"),
              // score: literal(`score + ${score}`)
            },
            {
              where: { id: alliance_id },
              transaction: t
            }
          )

          let updatedUser = await this.botUserDao.findOne({
            where: { id: user_id },
            include: [
              {
                model: BotAllianceMember,
                include: [
                  {
                    model: BotAlliance
                  }
                ]
              }
            ],
            transaction: t
          })

          await t.commit()

          return ResponseHelper.success(
            httpStatus.OK,
            SERVER_MSG.BOT_USER_JOIN_ALLIANCE_SUCCESS,
            updatedUser.toJSON()
          )
        } catch (ee) {
          await t.rollback()
          LoggerUtil.error(ee)
          return ResponseHelper.error(
            httpStatus.BAD_REQUEST,
            SERVER_MSG.BOT_USER_JOIN_ALLIANCE_FAILED
          )
        }
      }

      if (allianceMember?.is_leader) {
        return ResponseHelper.error(
          httpStatus.BAD_REQUEST,
          SERVER_MSG.BOT_USER_JOIN_ALLIANCE_WITH_LEADER_REJECT
        )
      }

      if (!allianceMember.is_leader) {
        const t = await DatabaseUtil.transaction()

        try {
          await this.botAllianceDao.update(
            {
              member_count: literal("member_count - 1"),
              // score: literal(`score - ${score}`)
            },
            {
              where: { id: allianceMember.alliance_id },
              transaction: t
            }
          )

          await this.botAllianceMemberDao.destroy({
            where: { user_id },
            transaction: t
          })

          if (allianceMember.alliance_id !== alliance_id) {
            await this.botAllianceMemberDao.create(
              {
                alliance_id,
                user_id,
                is_leader: false
              },
              {
                transaction: t
              }
            )
          }

          let updatedUser = await this.botUserDao.findOne({
            where: { id: user_id },
            include: [
              {
                model: BotAllianceMember,
                include: [
                  {
                    model: BotAlliance
                  }
                ]
              }
            ],
            transaction: t
          })

          await t.commit()

          return ResponseHelper.success(
            httpStatus.OK,
            SERVER_MSG.BOT_USER_JOIN_ALLIANCE_SUCCESS,
            updatedUser.toJSON()
          )
        } catch (ee) {
          await t.rollback()
          LoggerUtil.error(ee)
          return ResponseHelper.error(
            httpStatus.BAD_REQUEST,
            SERVER_MSG.BOT_USER_JOIN_ALLIANCE_FAILED
          )
        }
      }

      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    } catch (e) {
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }

  leaveAlliance = async (req: Request): Promise<IServiceResponse> => {
    try {
      if (!req.botUserInfo) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const { id: user_id, allianceMember, score } = req.botUserInfo

      if (!allianceMember) {
        return ResponseHelper.error(
          httpStatus.BAD_REQUEST,
          SERVER_MSG.BOT_USER_LEAVE_ALLIANCE_WITHOUT_ALLIANCE_REJECT
        )
      }

      if (allianceMember?.is_leader) {
        return ResponseHelper.error(
          httpStatus.BAD_REQUEST,
          SERVER_MSG.BOT_USER_LEAVE_ALLIANCE_WITH_LEADER_REJECT
        )
      }

      if (!allianceMember?.is_leader) {
        const t = await DatabaseUtil.transaction()

        try {
          await this.botAllianceDao.update(
            {
              member_count: literal("member_count - 1"),
              // score: literal(`score - ${score}`)
            },
            {
              where: { id: allianceMember.alliance_id },
              transaction: t
            }
          )

          await this.botAllianceMemberDao.destroy({
            where: { user_id },
            transaction: t
          })

          let updatedUser = await this.botUserDao.findOne({
            where: { id: user_id },
            include: [
              {
                model: BotAllianceMember,
                include: [
                  {
                    model: BotAlliance
                  }
                ]
              }
            ],
            transaction: t
          })

          await t.commit()

          return ResponseHelper.success(
            httpStatus.OK,
            SERVER_MSG.BOT_USER_LEAVE_ALLIANCE_SUCCESS,
            updatedUser.toJSON()
          )
        } catch (ee) {
          await t.rollback()
          LoggerUtil.error(ee)
          return ResponseHelper.error(
            httpStatus.BAD_REQUEST,
            SERVER_MSG.BOT_USER_LEAVE_ALLIANCE_FAILED
          )
        }
      }

      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    } catch (e) {
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }
}
