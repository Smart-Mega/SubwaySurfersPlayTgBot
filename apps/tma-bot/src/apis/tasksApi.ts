import { CompletedObjectivesRequestDataType } from "@/types"
import api from "./api"

/**
 * Get objectivies
 */
export const apiGetObjectives = () => api().post("/bot/tasks/get-objectives")

export const apiGetCompletedObjectives = () => api().post("/bot/tasks/get-completed-objectives")

export const apiGetDailyRewards = () => api().post("/bot/tasks/get-daily-rewards")

// Handler
export const apiObjectiveComplete = (param: CompletedObjectivesRequestDataType) => api().post("/bot/tasks/objective-complete", param)

export const apiCheckDailyRewards = () => api().post("/bot/tasks/check-daily-rewards")
