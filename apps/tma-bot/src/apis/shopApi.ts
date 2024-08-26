import api from "./api"

export const apiShopGetRobots = () => api().get("/bot/shop/get-robots")

export const apiShopGetItems = () => api().get("/bot/shop/get-items")
