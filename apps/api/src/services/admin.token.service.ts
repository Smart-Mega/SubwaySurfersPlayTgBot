import { addDays, addMinutes, getUnixTime } from "date-fns"
import jwt from "jsonwebtoken"
import { Op } from "sequelize"

import { JwtConfig } from "@/configs"
import { TOKEN_TYPE } from "@/constants"
import { AdminTokenDao } from "@/dao"
import { parseTime } from "@/helpers"
import { IAdmin, IToken, Token } from "@/models"

export default class AdminTokenService {
  private adminTokenDao: AdminTokenDao

  constructor() {
    this.adminTokenDao = new AdminTokenDao()
  }

  generateToken = (
    uuid: string,
    expires: Date,
    type: string,
    secret = JwtConfig.secret
  ): string => {
    const payload = {
      sub: uuid,
      iat: getUnixTime(new Date()),
      exp: getUnixTime(parseTime(expires)),
      type
    }
    return jwt.sign(payload, secret)
  }

  verifyToken = async (token: string, type: string): Promise<Token | null> => {
    const payload: any = jwt.verify(token, JwtConfig.secret, (err: any, decoded: any) => {
      if (err) {
        throw new Error("Token not found")
      } else {
        return decoded
      }
    })

    const tokenDoc = await this.adminTokenDao.findOne({
      where: {
        token,
        type,
        admin_uuid: payload.sub,
        blacklisted: false
      }
    })

    if (!tokenDoc) {
      throw new Error("Token not found")
    }

    return tokenDoc
  }

  saveToken = async (
    token: string,
    userUuid: number,
    expires: Date,
    type: string,
    blacklisted = false
  ): Promise<Token> =>
    this.adminTokenDao.create({
      token,
      user_uuid: userUuid,
      expires,
      type,
      blacklisted
    })

  saveMultipleTokens = async (tokens: object[]): Promise<boolean> =>
    this.adminTokenDao.bulkCreate(tokens)

  removeTokenById = async (id: number): Promise<boolean> =>
    this.adminTokenDao.destroy({ where: { id } })

  generateAuthTokens = async (admin: IAdmin): Promise<any> => {
    const accessTokenExpires: Date = addMinutes(new Date(), JwtConfig.access_expiration_minutes)
    const accessToken = this.generateToken(admin.uuid, accessTokenExpires, TOKEN_TYPE.ACCESS)

    const refreshTokenExpires: Date = addDays(new Date(), JwtConfig.refresh_expiration_days)
    const refreshToken = this.generateToken(admin.uuid, refreshTokenExpires, TOKEN_TYPE.REFRESH)

    const authTokens: IToken[] = []
    authTokens.push({
      token: accessToken,
      admin_uuid: admin.uuid,
      type: TOKEN_TYPE.ACCESS,
      expires: accessTokenExpires,
      blacklisted: false
    })
    authTokens.push({
      token: refreshToken,
      admin_uuid: admin.uuid,
      type: TOKEN_TYPE.REFRESH,
      expires: refreshTokenExpires,
      blacklisted: false
    })
    await this.saveMultipleTokens(authTokens)

    const expiredAccessTokenWhere = {
      expires: {
        [Op.lt]: new Date()
      },
      type: TOKEN_TYPE.ACCESS
    }
    await this.adminTokenDao.destroy({ where: expiredAccessTokenWhere })

    const expiredRefreshTokenWhere = {
      expires: {
        [Op.lt]: new Date()
      },
      type: TOKEN_TYPE.REFRESH
    }
    await this.adminTokenDao.destroy({ where: expiredRefreshTokenWhere })

    const tokens = {
      access: {
        token: accessToken,
        expires: accessTokenExpires
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires
      }
    }

    return tokens
  }
}
