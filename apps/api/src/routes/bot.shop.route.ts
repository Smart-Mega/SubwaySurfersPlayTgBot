import { Router } from "express"

import BotShopController from "@/controllers/bot.shop.controller"

const router: Router = Router()

const controller = new BotShopController()

router.get("/get-robots", controller.getRobots)
router.get("/get-items", controller.getItems)

export default router
