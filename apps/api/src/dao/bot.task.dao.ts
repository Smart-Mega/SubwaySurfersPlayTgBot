import { BotTask } from "@/models";
import BaseDao from "./base.dao";

export default class BotTaskDao extends BaseDao {
  constructor() {
    super(BotTask)
  }
}