import api from "./api"

export const apiRobotSetItem = (param: any) => api().post("/bot/robot/set-item", param)
