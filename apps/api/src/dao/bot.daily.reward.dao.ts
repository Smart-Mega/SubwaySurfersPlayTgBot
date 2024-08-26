import { BotDailyReward } from "@/models";
import BaseDao from "./base.dao";

export default class BotDailyRewardDao extends BaseDao {
  constructor() {
    super(BotDailyReward)
  }
}