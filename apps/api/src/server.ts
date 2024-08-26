import cookieParser from "cookie-parser"
import cors from "cors"
import express, { type Express, Request, Response } from "express"
import helmet from "helmet"
import morgan from "morgan"
import passport from "passport"
import path from "path"

import { AppConfig } from "@/configs"
import routes from "@/routes"
import { PassportUtil } from "@/utils"

import { SITE_TITLE } from "@repo/util/constant"
import { downloadAvatar } from "./utils/avatar.util"

export const createServer = (): Express => {
  const app = express()

  const allowedOrigins = [AppConfig.web_url, AppConfig.admin_url, AppConfig.bot_url]

  passport.use(PassportUtil.cookieStrategy)

  app
    // .disable("x-powered-by")
    // .use(helmet())
    // .use(morgan("dev"))
    // .use(express.urlencoded({ extended: true }))
    // .use(express.json())
    // .use(cookieParser())
    // .use(passport.initialize())
    .use(
        cors({
            origin: '*'
        })
    )
    // .use(
    //   cors({
    //     origin: (origin, callback) => {
    //       if (!origin) return callback(null, true)

    //         if (allowedOrigins.indexOf(origin) === -1) {
    //           const msg =
    //           "The CORS policy for this site does not allow access from the specified Origin."
    //           return callback(new Error(msg), false)
    //         }

    //       return callback(null, true)
    //     },
    //     credentials: true
    //   })
    // )
    // .use((req, res, next) => {
    //   // res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    //   res.setHeader("Access-Control-Allow-Origin", "*");
    //   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
    //   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    //   console.log(req.method, req.url);
    //   next()
    // })
    .use(routes)
    .use("/", express.static(path.join(__dirname, "..", path.sep, "..", path.sep, "surfers")))
    .post('/download/avatar', async (req: Request, res: Response) => {
          console.log(req.params, req.query, req.body);
          let avatar = '';
          if (req.query.id && req.query.name) {
              avatar = await downloadAvatar(req.query.id as any, req.query.name as string);
          }
          res.json({avatar});
      }
    )
    .post('/', async (req: Request, res: Response) => {
          res.json({});
      }
    )
    .get(/sockjs-node.*/, async (req: Request, res: Response) => {
          res.json({});
      }
    )
    .get(/\/\/.*/, async (req: Request, res: Response) => {
          res.json({});
      }
    )
    .post(/sockjs-node.*/, async (req: Request, res: Response) => {
          res.json({});
      }
    )
    // .get("/healthcheck", (_: Request, res: Response) => {
    //   return res.json({
    //     success: true,
    //     msg: `${SITE_TITLE}: The health is good now.`,
    //     data: {
    //       uptime: process.uptime(),
    //       name: process.env.npm_package_name,
    //       version: process.env.npm_package_version
    //     }
    //   })
    // })
    .put("/", (_: Request, res: Response) => {
      return res.json({
        success: true,
        msg: `${SITE_TITLE}: This is a test response.`,
        data: null
      })
    })
    

  return app
}
