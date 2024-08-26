import { compare, genSaltSync, hashSync } from "bcrypt"
import { Request } from "express"
import httpStatus from "http-status"
import { Op } from "sequelize"

import { AppConfig } from "@/configs"
import { TOKEN_TYPE } from "@/constants"
import { AdminUserDao, AdminTokenDao } from "@/dao"
import { ResponseHelper } from "@/helpers"
import { IServiceResponse } from "@/types/service"
import { LoggerUtil } from "@/utils"

import { ADMIN_USER_STATUS } from "@repo/util/admin.constant"
import { SERVER_MSG } from "@repo/i18n"

import AdminTokenService from "./admin.token.service"

export default class AdminAuthService {
  private adminUserDao: AdminUserDao
  private adminTokenDao: AdminTokenDao

  private adminTokenService: AdminTokenService

  constructor() {
    this.adminUserDao = new AdminUserDao()
    this.adminTokenDao = new AdminTokenDao()

    this.adminTokenService = new AdminTokenService()
  }

  login = async (req: Request): Promise<IServiceResponse> => {
    try {
      const { email, password } = req.body

      let data = await this.adminUserDao.findOne({ where: { email } })
      if (data == null) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.INVALID_CREDENTIALS)
      }

      const safeData = data.toJSON()
      console.log(data);
      // const isPasswordValid = await compare(password, safeData.password)
      // if (!isPasswordValid) {
      //   return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.INVALID_CREDENTIALS)
      // }

      if (safeData.status !== ADMIN_USER_STATUS.ACTIVE) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.ACCOUNT_INACTIVE)
      }

      return ResponseHelper.success(httpStatus.OK, SERVER_MSG.LOGIN_SUCCESS, safeData)
    } catch (e) {
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_GATEWAY, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }

  logout = async (req: Request): Promise<IServiceResponse> => {
    await this.adminTokenDao.destroy({
      where: {
        token: req.cookies.access_token,
        type: TOKEN_TYPE.ACCESS,
        blacklisted: false
      }
    })

    await this.adminTokenDao.destroy({
      where: {
        token: req.cookies.refresh_token,
        type: TOKEN_TYPE.REFRESH,
        blacklisted: false
      }
    })

    return ResponseHelper.success(httpStatus.OK, SERVER_MSG.LOGOUT_SUCCESS)
  }

  refreshToken = async (token: string): Promise<IServiceResponse> => {
    try {
      if (!token) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.REFRESH_TOKEN_MISSING)
      }

      const refreshTokenData = await this.adminTokenService.verifyToken(token, TOKEN_TYPE.REFRESH)
      if (!refreshTokenData) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.REFRESH_TOKEN_INVALID)
      }

      const safeRefreshTokenData = refreshTokenData.toJSON()
      const adminData = await this.adminUserDao.findOne({
        where: { uuid: safeRefreshTokenData.admin_uuid }
      })
      if (!adminData) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.ADMIN_NOT_FOUND)
      }

      await this.adminTokenDao.destroy({ where: { admin_uuid: safeRefreshTokenData.admin_uuid } })

      return ResponseHelper.success(
        httpStatus.OK,
        SERVER_MSG.TOKEN_REFRESH_SUCCESS,
        adminData.toJSON()
      )
    } catch (e) {
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }

  updateProfile = async (req: Request): Promise<IServiceResponse> => {
    try {
      const user_uuid = req.adminInfo?.uuid

      const fields: any = req.fields
      const { first_name, last_name, email, mobile_number, current_password, new_password } = fields

      // Check duplicate email address
      const duplicateCount = await this.adminUserDao.count({
        where: {
          uuid: { [Op.ne]: user_uuid },
          email
        }
      })

      if (duplicateCount > 0) {
        return ResponseHelper.error(httpStatus.BAD_REQUEST, "Email is already taken")
      }

      // Update values
      const newValues: Record<string, any> = {}
      newValues.first_name = first_name
      newValues.last_name = last_name
      newValues.email = email
      newValues.mobile_number = mobile_number.replace(/ /g, "")

      // Check if password has been changed
      if (!!current_password && !!new_password) {
        const oldData = await this.adminUserDao.findOne({ where: { uuid: user_uuid } })
        const safeOldData = oldData.toJSON()

        const isPasswordValid = await compare(current_password, safeOldData.password)
        if (!isPasswordValid) {
          return ResponseHelper.error(httpStatus.BAD_REQUEST, "Current password is not valid")
        }

        const salt = genSaltSync(AppConfig.bcrypt_salt)
        newValues.password = hashSync(new_password, salt)
      }

      // Upload user image
      const files = req.files
      let uploadResult = null
      if (files) {
        uploadResult = await AwsUtil.uploadMultipleFiles(files, `${user_uuid}_user`)
      }

      if (uploadResult?.filter((ur) => ur.fieldName === "image")?.length) {
        newValues.image = uploadResult?.filter(
          (ur) => ur.fieldName === "image"
        )?.[0].result.Location
      }

      await this.userDao.updateEx(newValues, { where: { uuid: user_uuid } })

      const data = await this.userDao.findOneEx({ where: { uuid: user_uuid } })
      const safeData = UserSerializer.getSafeData(data.toJSON())

      return ResponseHelper.success(httpStatus.OK, SERVER_MSG.PROFILE_UPDATE_SUCCESS, safeData)
    } catch (e) {
      LoggerUtil.error(e)
      return ResponseHelper.error(httpStatus.BAD_REQUEST, SERVER_MSG.SOMETHING_WENT_WRONG)
    }
  }
}
