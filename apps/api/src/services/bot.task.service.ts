import { Request } from "express"
import httpStatus from "http-status";
import { SERVER_MSG } from "@repo/i18n";
import { ResponseHelper } from "@/helpers";
import { DatabaseUtil, LoggerUtil } from "@/utils";
import { IServiceResponse } from "@/types/service";
import { BotDailyRewardDao, BotTaskCompleteDao, BotTaskDao, BotUserDao } from "@/dao";
import { differenceInSeconds } from "date-fns";
import { BOT_SCORE_TYPE } from "@repo/util/bot.constant";

export default class BotTaskService {
  private botUserDao: BotUserDao
  private botTaskDao: BotTaskDao
  private botTaskCompleteDao: BotTaskCompleteDao
  private botDailyRewardDao: BotDailyRewardDao

  constructor() {
    this.botUserDao = new BotUserDao()
    this.botTaskDao = new BotTaskDao()
    this.botTaskCompleteDao = new BotTaskCompleteDao()
    this.botDailyRewardDao = new BotDailyRewardDao()
  }

  getObjectives = async (req: Request): Promise<IServiceResponse> => {
    try {
      const tasksData = await this.botTaskDao.findAll({
        order: [
          ['order', 'ASC']
        ]
      })

      return ResponseHelper.success(
        httpStatus.OK,
        SERVER_MSG.BOT_TASKS_GET_SUCCESS,
        tasksData
      )
    } catch (e) {
      console.error(e)
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }

  getCompletedObjectives = async (req: Request): Promise<IServiceResponse> => {
    try {
      if (!req.botUserInfo) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const { id: user_id } = req.botUserInfo

      const data = await this.botTaskCompleteDao.findAll({
        where: {
          user_id: user_id
        }
      })

      return ResponseHelper.success(
        httpStatus.OK,
        SERVER_MSG.BOT_TASKS_GET_SUCCESS,
        data
      )
    } catch (e) {
      console.error(e)
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }

  getDailyRewards = async (req: Request): Promise<IServiceResponse> => {
    try {
      if (!req.botUserInfo) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const { id: user_id } = req.botUserInfo

      const data = await this.botDailyRewardDao.findOne({
        where: {
          user_id: user_id
        }
      })

      return ResponseHelper.success(
        httpStatus.OK,
        SERVER_MSG.BOT_TASKS_GET_SUCCESS,
        data
      )
    } catch (e) {
      console.error(e)
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }

  objectiveComplete = async (req: Request): Promise<IServiceResponse> => {
    try {
      if (!req.botUserInfo) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const { objective_id, objective_reward, objective_type } = req.body
      const { id: user_id, score } = req.botUserInfo

      const t = await DatabaseUtil.transaction()

      try {
        const ret = await this.botTaskCompleteDao.findOne({
          where: {
            user_id: user_id,
            task_id: objective_id
          },
          transaction: t
        })

        if (ret) {
          return ResponseHelper.error(
            httpStatus.CONFLICT,
            SERVER_MSG.BOT_TASKS_ALREADY_COMPLETED
          )
        }

        const createdTaskCompleted = await this.botTaskCompleteDao.create({
          user_id: user_id,
          task_type: objective_type,
          task_id: objective_id
        }, {
          transaction: t
        })

        await this.botUserDao.update({
          score: Number(score) + Number(objective_reward)
        }, {
          where: { id: user_id },
          transaction: t
        })

        await t.commit()

        return ResponseHelper.success(
          httpStatus.OK,
          SERVER_MSG.BOT_TASKS_COMPLETED_SUCCESS,
          createdTaskCompleted
        )
      } catch (err) {
          await t.rollback()
          LoggerUtil.error(err)
          return ResponseHelper.error(
            httpStatus.BAD_REQUEST,
            SERVER_MSG.BOT_TASKS_COMPLETE_FAILED
          )
        }
    } catch (e) {
      console.error(e)
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }

  updateDailyReward = async (req: Request): Promise<IServiceResponse> => {
    try {
      if (!req.botUserInfo) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.BOT_USER_NOT_FOUND)
      }

      const { id: user_id, score } = req.botUserInfo
      const t = await DatabaseUtil.transaction()

      try {
        const ret = await this.botDailyRewardDao.findOne({
          where: {
            user_id: user_id,
          },
          transaction: t
        })

        if (ret) {
          const secondsDifference = differenceInSeconds(new Date(), ret.updated_at)
          const countOfDay = Math.floor(secondsDifference / (24 * 3600))
          
          if (countOfDay > 0) {
            return ResponseHelper.error(
              httpStatus.BAD_REQUEST,
              SERVER_MSG.BOT_TASKS_COMPLETE_FAILED
            )
          } else {
            const newCountOfDay = Number(ret.day) + 1

            if (newCountOfDay <= BOT_SCORE_TYPE.DAILY_REWARD.limit) {
              const rewardAmount = BOT_SCORE_TYPE.DAILY_REWARD.score * newCountOfDay
  
              const newDailyRewardData = await this.botDailyRewardDao.update({
                  day: newCountOfDay,
                  reward: Number(ret.reward) + rewardAmount,
                  updated_at: new Date()
                }, {
                  where: { user_id: user_id },
                  transaction: t
                })
              
              await this.botUserDao.update({
                score: Number(score) + rewardAmount
              }, {
                where: { id: user_id },
                transaction: t
              })
  
              await t.commit()

              return ResponseHelper.success(
                httpStatus.OK,
                SERVER_MSG.BOT_TASKS_COMPLETED_SUCCESS,
                newDailyRewardData
              )
            }
            // TODO: should set return format when count of days is over limit
            return ResponseHelper.success(
              httpStatus.OK,
              SERVER_MSG.BOT_TASKS_COMPLETED_SUCCESS,
            )
          }
        }

        const rewardAmount = BOT_SCORE_TYPE.DAILY_REWARD.score

        const newDailyRewardData = await this.botDailyRewardDao.create({
          user_id: user_id,
          day: 1,
          reward: rewardAmount
        }, {
          transaction: t
        })

        await this.botUserDao.update({
          score: Number(score) + rewardAmount
        }, {
          where: { id: user_id },
          transaction: t
        })

        await t.commit()
  
        return ResponseHelper.success(
          httpStatus.OK,
          SERVER_MSG.BOT_TASKS_COMPLETED_SUCCESS,
          newDailyRewardData
        )
      } catch (ee) {
        await t.rollback()
        LoggerUtil.error(ee)
        return ResponseHelper.error(
          httpStatus.BAD_REQUEST,
          SERVER_MSG.BOT_TASKS_COMPLETE_FAILED
        )
      }
    } catch (e) {
      console.error(e)
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }
}