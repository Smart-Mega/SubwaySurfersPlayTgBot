import { QueryTypes } from "sequelize"

import { BotAlliance } from "@/models"
import { DatabaseUtil, LoggerUtil } from "@/utils"

import BaseDao from "./base.dao"

export default class BotAllianceDao extends BaseDao {
  constructor() {
    super(BotAlliance)
  }

  getRank = async (allianceId: number) => {
    try {
      const sql = `
        SELECT rank
        FROM (
          SELECT id, score, RANK() OVER (ORDER BY score DESC) as rank
          FROM bot_alliances
        ) ranked_alliances
        WHERE id = :allianceId
      `

      const result: any = await DatabaseUtil.query(sql, {
        replacements: { allianceId },
        type: QueryTypes.SELECT
      })

      return BigInt(result[0]?.rank) ?? 1
    } catch (e) {
      LoggerUtil.error(e)
      console.error(e)
      throw e
    }
  }
}
