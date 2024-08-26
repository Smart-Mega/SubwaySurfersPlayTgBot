import { Request, Response } from "express"
import httpStatus from "http-status"

import { IServiceResponse } from "@/types/service"
import { LoggerUtil } from "@/utils"
import { AppConfig } from "@/configs"
import { NODE_ENV } from "@/constants"
import { AdminAuthService, AdminTokenService } from "@/services"
import { IAdminUser } from "@/models"

export default class AdminAuthController {
  private adminAuthService: AdminAuthService
  private adminTokenService: AdminTokenService

  constructor() {
    this.adminAuthService = new AdminAuthService()
    this.adminTokenService = new AdminTokenService()
  }

  login = async (req: Request, res: Response) => {
    try {
      const resp = await this.adminAuthService.login(req)
      const { message, data, status } = resp.response

      if (status) {
        const tokens = await this.adminTokenService.generateAuthTokens(data as IAdminUser)

        res
          .cookie("access_token", tokens.access.token, {
            httpOnly: true,
            secure: AppConfig.node_env === NODE_ENV.PRODUCTION
          })
          .cookie("refresh_token", tokens.refresh.token, {
            httpOnly: true,
            secure: AppConfig.node_env === NODE_ENV.PRODUCTION
          })
          .status(resp.statusCode)
          .send(resp.response)
      } else {
        res.status(resp.statusCode).send({ status, message, data })
      }
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }

  logout = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.adminAuthService.logout(req)
      res
        .clearCookie("access_token")
        .clearCookie("refresh_token")
        .status(resp.statusCode)
        .send(resp.response)
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }

  refreshTokens = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.adminAuthService.refreshToken(
        req.cookies.refresh_token
      )
      if (resp.response.status) {
        const tokens = await this.adminTokenService.generateAuthTokens(
          resp.response.data as IAdminUser
        )

        res
          .cookie("access_token", tokens.access.token, {
            httpOnly: true,
            secure: AppConfig.node_env === NODE_ENV.PRODUCTION
          })
          .cookie("refresh_token", tokens.refresh.token, {
            httpOnly: true,
            secure: AppConfig.node_env === NODE_ENV.PRODUCTION
          })
          .status(resp.statusCode)
          .send(resp.response)
      } else {
        return res.status(resp.statusCode).send(resp.response)
      }
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }

  updateProfile = async (req: Request, res: Response) => {
    try {
      const resp: IServiceResponse = await this.adminAuthService.updateProfile(req)
      const { status, message, data } = resp.response
      res.status(resp.statusCode).send({ status, message, data })
    } catch (e) {
      LoggerUtil.error(e)
      res.status(httpStatus.BAD_GATEWAY).send(e)
    }
  }
}
