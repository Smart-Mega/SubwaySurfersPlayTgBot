import { BotTasksComplete } from "@/models";
import BaseDao from "./base.dao";

export default class BotTaskCompleteDao extends BaseDao {
  constructor() {
    super(BotTasksComplete)
  }
}