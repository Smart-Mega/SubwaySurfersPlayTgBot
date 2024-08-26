import api from "./api"

/**
 * Refresh
 */
export const apiAuthRefresh = () => api().post("/bot/auth/refresh")

/**
 * Join alliance
 */
export const apiAuthJoinAlliance = (param: any) => api().post("/bot/auth/join-alliance", param)

/**
 * Leave alliance
 */
export const apiAuthLeaveAlliance = () => api().post("/bot/auth/leave-alliance")

/**
 * Mini app close event
 */
export const apiCloseApp = () => api().post("/bot/close")
