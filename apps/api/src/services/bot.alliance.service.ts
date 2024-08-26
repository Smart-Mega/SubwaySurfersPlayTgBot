import { Request } from "express"
import httpStatus from "http-status"

import { BotAllianceDao, BotAllianceMemberDao } from "@/dao"
import { ResponseHelper } from "@/helpers"
import { IServiceResponse } from "@/types/service"
import { DatabaseUtil, LoggerUtil } from "@/utils"

import { SERVER_MSG } from "@repo/i18n"
import { BotAllianceMember, BotUser } from "@/models"
import { TelegramConfig } from "@/configs"
import { BOT_ALLIANCE_TYPE } from "@repo/util/bot.constant"
import { literal } from "sequelize"

export default class BotAllianceService {
  private botAllianceDao: BotAllianceDao
  private botAllianceMemberDao: BotAllianceMemberDao

  constructor() {
    this.botAllianceDao = new BotAllianceDao()
    this.botAllianceMemberDao = new BotAllianceMemberDao()
  }

  getList = async (req: Request): Promise<IServiceResponse> => {
    try {
      let data = await this.botAllianceDao.findAll({ order: [["score", "DESC"]] })
      return ResponseHelper.success(httpStatus.OK, SERVER_MSG.BOT_ALLIANCES_FETCH_SUCCESS, data)
    } catch (e) {
      console.error(e)
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }

  getById = async (req: Request): Promise<IServiceResponse> => {
    try {
      if (!req.botUserInfo) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const { id } = req.params

      let data = await this.botAllianceDao.findOne({
        where: { id },
        include: [
          {
            model: BotAllianceMember,
            include: [
              {
                model: BotUser
              }
            ]
          }
        ]
      })
      const safeData = data.toJSON()

      const rank = await this.botAllianceDao.getRank(safeData.id)

      return ResponseHelper.success(httpStatus.OK, SERVER_MSG.BOT_ALLIANCES_FETCH_SUCCESS, {
        ...safeData,
        rank: String(rank)
      })
    } catch (e) {
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }

  createAlliance = async (req: Request): Promise<IServiceResponse> => {
    try {
      if (!req.botUserInfo) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const { chat_id } = req.body
      const { id: user_id, tg_id } = req.botUserInfo

      const data: any = await this.getChat(chat_id)
      
      if (data) {
        const { title, username } = data
        const isExist = await this.botAllianceDao.findOne({
          where: {
            name: username
          }
        })
        if (isExist) {
          // If alliance exist already in db, user will just add to this alliance
          const t = await DatabaseUtil.transaction()

          const safeAlliance = isExist.toJSON()

          const updatedAlliance = await this.botAllianceDao.update(
            {
              member_count: literal("member_count + 1"),
            },
            {
              where: { id: safeAlliance.id },
              transaction: t
            }
          )

          const isAlreadyJoinedMember = await this.botAllianceMemberDao.findOne({
            where: {
              alliance_id: safeAlliance.id,
              user_id
            }
          })

          if (isAlreadyJoinedMember) {
            return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_ALLIANCES_MEMBER_ALREADY_JOINED)
          }

          await this.botAllianceMemberDao.create({
              alliance_id: safeAlliance.id,
              user_id,
              is_leader: false
            }, {
              transaction: t
            }
          )

          await t.commit()

          return ResponseHelper.success(
            httpStatus.OK,
            SERVER_MSG.BOT_USER_JOIN_ALLIANCE_SUCCESS,
            updatedAlliance
          )

        } else {
          // If alliance doesn't exist in db, user will add after creating new alliance
          const t = await DatabaseUtil.transaction()
          
          let symbol = ''
          if (data.photo) {
            const ret = await this.getFile(data.photo.small_file_id)
            if (ret) {
              symbol = `https://api.telegram.org/file/bot${TelegramConfig.bot_token}/${ret.file_path}`
            }
          }

          const newAlliance = await this.botAllianceDao.create({
            name: username,
            symbol: symbol,
            description: title,
            alliance_type: BOT_ALLIANCE_TYPE.OPEN,
            member_count: 1,
            score: 0
          }, {
            transaction: t
          })
          
          const safeNewAlliance = newAlliance.toJSON()
          console.log(safeNewAlliance)
          
          const ret1 = await this.getChatMember(chat_id, tg_id)

          if (ret1) {
            let is_leader = false
            if (ret1.status === 'creator' || ret1.status === 'administrator') is_leader = true
            else if (ret1.status === 'member') is_leader = false
            else {
              return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_CHAT_INVALID_MEMBER)
            }

            await this.botAllianceMemberDao.create({
              alliance_id: safeNewAlliance.id,
              user_id: user_id,
              is_leader: is_leader,
            }, {
              transaction: t
            })
          }

          await t.commit()

          return ResponseHelper.success(
            httpStatus.OK,
            SERVER_MSG.BOT_USER_JOIN_ALLIANCE_SUCCESS,
            safeNewAlliance
          )

        }
      }

      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_CHAT_NOT_FOUND)

    } catch (e) {
      console.error(e)
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }

  /**
   * 
   * @param chat_id 
   * @returns if result is ok, {ok: true, result: {id:number, title:string, username:string, type:string, active_usernames: string[] }}
   */
  getChat = async (chat_id: string): Promise<any> => {
    try {
      if (chat_id) {
        const ret = await fetch(`${TelegramConfig.telegram_core_api}/bot${TelegramConfig.bot_token}/getChat?chat_id=${chat_id}`)
        const data: any = await ret.json()
        if (data?.ok) {
          return data.result
        }
      }

      return null
      
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /**
   * 
   * @param chat_id chat id
   * @param user_id user id
   * @returns if result is ok, {ok: boolean, result: {user: User, status:string}}
   * @returns The status data is either one of 'creator', 'administrator', 'member', 'restricted', 'left', 'kicked'
   */
  getChatMember = async (chat_id: string, user_id: number): Promise<any> => {
    try {
      if (chat_id && user_id) {
        const ret = await fetch(`${TelegramConfig.telegram_core_api}/bot${TelegramConfig.bot_token}/getChatMember?chat_id=${chat_id}&user_id=${user_id}`)
        const data:any = await ret.json()
        if (data?.ok) {
          return data.result
        }
      }

      return null
      
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /**
   * 
   * @param file_id 
   * @returns {ok: boolean, result: {file_id: string, file_unique_id: string, file_size: number, file_path: string}}
   */
  getFile = async (file_id: string): Promise<any> => {
    try {
      if (file_id) {
        const ret = await fetch(`${TelegramConfig.telegram_core_api}/bot${TelegramConfig.bot_token}/getFile?file_id=${file_id}`)
        const data: any = await ret.json()
        if (data?.ok) {
          return data.result
        }
        return null
      }
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
