import { Request } from 'express';
import httpStatus from "http-status"

import { BotUser } from "@/models"
import { BotReferralDao, BotScoreHistoryDao } from "@/dao"
import { IServiceResponse } from "@/types/service"

import { ResponseHelper } from "@/helpers"
import { SERVER_MSG } from "@repo/i18n"
import { LoggerUtil } from "@/utils"
import { BOT_SCORE_TYPE } from "@repo/util/bot.constant"

export default class BotReferService {
  private botReferDao: BotReferralDao
  private botScoreHistoryDao: BotScoreHistoryDao

  constructor() {
    this.botReferDao = new BotReferralDao()
    this.botScoreHistoryDao = new BotScoreHistoryDao()
  }

  refresh = async (req: Request): Promise<IServiceResponse> => {
    console.log('BotReferService/refresh...')
    try {
      if (!req.botUserInfo) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const { referral_code, id } = req.botUserInfo

      let data = await this.botReferDao.findAll({
        where: {referral_code: referral_code},
        include: [
          {
            model: BotUser
          }
        ],
      })

      if (data.length === 0) {
        return ResponseHelper.success(httpStatus.OK, SERVER_MSG.BOT_USER_AUTHENTICATE_SUCCESS, {
          data: null,
          total: 0,
          rewards: 0
        })
      }

      const count = await this.botReferDao.count({
        where: {referral_code: referral_code},
      })

      const referralRewardData = await this.botScoreHistoryDao.findOne({
        where: {
          user_id: id,
          type: BOT_SCORE_TYPE.REFERRAL_REWARD.type
        }
      })

      const safeReferralRewardData = referralRewardData.toJSON()

      return ResponseHelper.success(httpStatus.OK, SERVER_MSG.BOT_USER_AUTHENTICATE_SUCCESS, {
        data: data,
        total: count,
        rewards: safeReferralRewardData.score
      })
    } catch (e) {
      console.error(e)
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }
}