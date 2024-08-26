import { Request, Response } from "express"
import httpStatus from "http-status"

import BotReferService from "@/services/bot.refer.service.ts"
import { IServiceResponse } from "@/types/service"
import { LoggerUtil } from "@/utils"

export default class BotReferController {
  private botReferService: BotReferService

  constructor() {
    this.botReferService = new BotReferService();
  }

  refresh = async (req: Request, res: Response) => {
    try {
      console.log('BotReferController/refresh...')
      const resp: IServiceResponse = await this.botReferService.refresh(req)
      const {status, message, data} = resp.response
      res.status(resp.statusCode).send({ status, message, data })
    } catch (e) {
      console.error(e)
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_REQUEST).send(e)
    }
  }
}