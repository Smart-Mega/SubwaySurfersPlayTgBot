import { Router } from "express"

import BotAuthController from "@/controllers/bot.auth.controller"
import { bot_auth } from "@/middleware/bot.auth.middleware"

const router: Router = Router()

const controller = new BotAuthController()

router.post("/refresh", controller.refresh)

router.post("/join-alliance", bot_auth(), controller.joinAlliance)
router.post("/leave-alliance", bot_auth(), controller.leaveAlliance)

export default router
