import { Router } from "express"
import BotReferController from "@/controllers/bot.refer.controller.ts"

const router: Router = Router()

const controller = new BotReferController()

router.post("/refresh", controller.refresh)

export default router
