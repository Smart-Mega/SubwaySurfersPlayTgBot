import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import passport from "passport"

import { ErrorHelper } from "@/helpers"
import { IUser } from "@/models"

const verifyCallback =
  (req: Request, res: Response, resolve: any, reject: any) =>
  async (err: any, user: IUser, info: any) => {
    if (err || info || !user) {
      return reject(new ErrorHelper(httpStatus.UNAUTHORIZED, "Please authenticate"))
    }

    req.userInfo = user

    resolve()
  }

export const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  new Promise((resolve, reject) => {
    passport.authenticate("cookie", { session: false }, verifyCallback(req, res, resolve, reject))(
      req,
      res,
      next
    )
  })
    .then(() => next())
    .catch((err) => {
      next(err)
    })
}
