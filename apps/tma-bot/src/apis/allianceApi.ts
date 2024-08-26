import api from "./api"

export const apiAllianceGetList = () => api().post("/bot/alliance/get")

export const apiAllianceGet = (id: number) => api().post(`/bot/alliance/get/${id}`)

export const apiCreateAlliance = (param: {chat_id: string}) => api().post("/bot/alliance/create", param)