import { Request, Response } from "express"
import httpStatus from "http-status"

import { BotAllianceService } from "@/services"
import { IServiceResponse } from "@/types/service"
import { LoggerUtil } from "@/utils"

export default class BotAllianceController {
  private botAllianceService: BotAllianceService

  constructor() {
    this.botAllianceService = new BotAllianceService()
  }

  getList = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botAllianceService.getList(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({ status, message, data })
    } catch (e) {
      console.error(e)
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }

  getById = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botAllianceService.getById(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({ status, message, data })
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }

  createAlliance = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botAllianceService.createAlliance(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({ status, message, data })
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }

}
