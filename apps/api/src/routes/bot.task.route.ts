
import { Router } from "express";

import BotTaskController from "@/controllers/bot.task.controller";

const router: Router = Router()

const controller = new BotTaskController()

router.post('/get-objectives', controller.getObjectives)
router.post('/get-completed-objectives', controller.getCompletedObjectives)
router.post('/get-daily-rewards', controller.getDailyRewards)
router.post('/check-daily-rewards', controller.checkDailyRewards)
router.post('/objective-complete', controller.objectiveComplete)

export default router