import { verify } from "jsonwebtoken"
import { Strategy as CookieStrategy } from "passport-cookie"

import { TOKEN_TYPE } from "@/constants"
import { AdminUserDao, AdminTokenDao } from "@/dao"
import { JwtConfig } from "@/configs"

const cookieVerify = async (req: any, accessToken: string, done: any) => {
  try {
    const payload: any = verify(accessToken, JwtConfig.secret)

    if (!payload) {
      return done(null, false)
    }

    if (payload.type !== TOKEN_TYPE.ACCESS) {
      throw new Error("Invalid token type")
    }

    const adminUserDao = new AdminUserDao()
    const adminTokenDao = new AdminTokenDao()

    let tokenData = await adminTokenDao.findOne({
      where: {
        token: accessToken,
        type: TOKEN_TYPE.ACCESS,
        blacklisted: false
      }
    })
    if (!tokenData) {
      return done(null, false)
    }

    const safeTokenData = tokenData.toJSON()
    const adminUuid = safeTokenData.admin_uuid

    const adminData = await adminUserDao.findOne({ where: { uuid: adminUuid } })
    if (!adminData) {
      return done(null, false)
    }

    const safeAdminData = adminData.toJSON()
    return done(null, safeAdminData)
  } catch (error) {
    console.error("passport.util - cookieVerify error: ", error)
    return done(error, false)
  }
}

const cookieStrategy = new CookieStrategy(
  {
    cookieName: "access_token",
    passReqToCallback: true
  },
  cookieVerify
)

export default { cookieStrategy }
