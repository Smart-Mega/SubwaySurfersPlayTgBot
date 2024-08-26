import { Request, Response } from "express"
import httpStatus from "http-status"

import { BotLeaderboardService } from "@/services"
import { IServiceResponse } from "@/types/service"
import { LoggerUtil } from "@/utils"

export default class BotLeaderboardController {
  private botLeaderboardService: BotLeaderboardService

  constructor() {
    this.botLeaderboardService = new BotLeaderboardService()
  }

  getLeaders = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.botLeaderboardService.getLeaders(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({ status, message, data })
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }
}
