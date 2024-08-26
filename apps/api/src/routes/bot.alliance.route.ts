import { Router } from "express"

import BotAllianceController from "@/controllers/bot.alliance.controller"
import { bot_auth } from "@/middleware/bot.auth.middleware"

const router: Router = Router()

const controller = new BotAllianceController()

router.post("/get", bot_auth(), controller.getList)
router.post("/get/:id", bot_auth(), controller.getById)
router.post("/create", bot_auth(), controller.createAlliance)

export default router
