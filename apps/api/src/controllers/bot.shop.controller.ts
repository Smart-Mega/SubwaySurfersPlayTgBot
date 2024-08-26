import { Request, Response } from "express"
import httpStatus from "http-status"

import { BotRobotService, BotShopService } from "@/services"
import { IServiceResponse } from "@/types/service"
import { LoggerUtil } from "@/utils"

export default class BotShopController {
  private botShopService: BotShopService

  constructor() {
    this.botShopService = new BotShopService()
  }

  getRobots = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botShopService.getRobots(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({ status, message, data })
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }

  getItems = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botShopService.getItems(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({ status, message, data })
    } catch (e) {
      console.error(e)
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }
}
