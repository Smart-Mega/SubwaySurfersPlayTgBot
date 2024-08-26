import { Router } from "express"

import BotLeaderboardController from "@/controllers/bot.leaderboard.controller"

const router: Router = Router()

const controller = new BotLeaderboardController()

router.get("/get", controller.getLeaders)

export default router
