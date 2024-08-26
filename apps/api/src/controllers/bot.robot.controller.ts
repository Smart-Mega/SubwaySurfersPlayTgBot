import { Request, Response } from "express"
import httpStatus from "http-status"

import { BotRobotService } from "@/services"
import { IServiceResponse } from "@/types/service"
import { LoggerUtil } from "@/utils"

export default class BotRobotController {
  private botRobotService: BotRobotService

  constructor() {
    this.botRobotService = new BotRobotService()
  }

  setItem = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botRobotService.setItem(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({ status, message, data })
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }
}
