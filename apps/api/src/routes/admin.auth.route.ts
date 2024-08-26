import { Router } from "express"

import AdminAuthController from "@/controllers/admin.auth.controller"
import { admin_auth } from "@/middleware/admin.auth.middleware"
import { form } from "@/middleware/form.middleware"

const router: Router = Router()

const controller = new AdminAuthController()

router.post("/login", controller.login)
router.post("/logout", admin_auth(), controller.logout)

router.post("/refresh-token", controller.refreshTokens)

router.put("/profile", admin_auth(), form(), controller.updateProfile)

export default router
