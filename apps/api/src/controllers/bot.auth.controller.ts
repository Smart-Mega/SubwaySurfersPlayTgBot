import { Request, Response } from "express"
import httpStatus from "http-status"

import { IServiceResponse } from "@/types/service"
import { BotAuthService } from "@/services"
import { LoggerUtil } from "@/utils"

export default class BotAuthController {
  private botAuthService: BotAuthService

  constructor() {
    this.botAuthService = new BotAuthService()
  }

  refresh = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botAuthService.refresh(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({ status, message, data })
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }

  joinAlliance = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botAuthService.joinAlliance(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({ status, message, data })
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }

  leaveAlliance = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botAuthService.leaveAlliance(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({ status, message, data })
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }
}
