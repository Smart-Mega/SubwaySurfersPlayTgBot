import { parse, validate } from "@tma.js/init-data-node"
import { NextFunction, Request, Response } from "express"

import { TelegramConfig } from "@/configs"
import { BotUserDao } from "@/dao"
import { BotAlliance, BotAllianceMember } from "@/models"

export const bot_auth = () => async (req: Request, res: Response, next: NextFunction) => {
  const [authType, authData = ""] = (req.header("authorization") ?? "").split(" ")

  try {
    console.log("authType==========>", authType)
    if (authType === "ssp") {
      validate(authData, TelegramConfig.bot_token, { expiresIn: 60 * 60 * 24 })
      const parsedAuthData = parse(authData)

      const botUserDao = new BotUserDao()
      const user = await botUserDao.findOne({
        where: { tg_id: parsedAuthData?.user?.id },
        include: [
          {
            model: BotAllianceMember,
            include: [
              {
                model: BotAlliance
              }
            ]
          }
        ]
      })

      if (!user) {
        return next(new Error("Unauthorized"))
      }

      req.botUserInfo = user.toJSON()
      return next()
    }
    return next(new Error("Unauthorized"))
  } catch (e) {
    console.error(e)
    return next(e)
  }
}
