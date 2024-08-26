import api from "./api"

/**
 * Refresh
 */
export const apiReferRefresh = () => api().post("/bot/refer/refresh")
