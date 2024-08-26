import { Request, Response } from "express"
import BotTaskService from "@/services/bot.task.service";
import { LoggerUtil } from "@/utils";
import httpStatus from "http-status";
import { IServiceResponse } from "@/types/service";

export default class BotTaskController {
  private botTaskService: BotTaskService
  
  constructor() {
    this.botTaskService = new BotTaskService()
  }

  getObjectives = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botTaskService.getObjectives(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({status, message, data})
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }

  getCompletedObjectives = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botTaskService.getCompletedObjectives(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({status, message, data})
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }

  getDailyRewards = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botTaskService.getDailyRewards(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({status, message, data})
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }

  checkDailyRewards = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botTaskService.updateDailyReward(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({status, message, data})
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }

  objectiveComplete = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botTaskService.objectiveComplete(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({status, message, data})
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }
}