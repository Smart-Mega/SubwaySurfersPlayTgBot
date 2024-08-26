import React, { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { LuEye, LuEyeOff } from "react-icons/lu"
import { Link, useNavigate } from "react-router-dom"
import * as z from "zod"

import AuthLayout from "@/components/_layout/AuthLayout"
import Logo from "@/components/_layout/components/Logo"
import { LoadingButton } from "@/components/_uiext"
import useAdminAuthStore from "@/stores/useAdminAuthStore"
import { ANIMATION_DURATION } from "@/utils/constants"

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { Input } from "@repo/ui/components/ui/input"
import { SITE_TITLE } from "@repo/util/constant"

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  password: z.string().min(8, {
    message: "Password should be at least 8 characters"
  })
})

type FormSchemaType = z.infer<typeof FormSchema>

export default function Login() {
  const navigate = useNavigate()
  const store = useAdminAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const variants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * ANIMATION_DURATION,
        duration: ANIMATION_DURATION
      }
    })
  }

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  const onSubmit = async (values: FormSchemaType) => {
    store.loginAction(values, () => {
      navigate("/dashboard")
    })
  }

  useEffect(() => {
    if (store.admin?.uuid) {
      navigate("/dashboard")
    }
  }, [])

  return (
    <AuthLayout>
      <motion.div
        custom={0}
        initial="initial"
        animate="animate"
        variants={variants}
        className={"flex w-full items-center justify-center gap-4 md:justify-between"}
      >
        <Logo />
      </motion.div>

      <div className="flex w-full flex-1 items-center justify-center">
        <div className="flex w-full flex-1 flex-col md:max-w-[600px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-1 flex-col justify-center"
            >
              <motion.h3
                custom={1}
                initial="initial"
                animate="animate"
                variants={variants}
                className="text-main mb-4 text-lg font-semibold"
              >
                Welcome back!
              </motion.h3>

              <motion.p
                custom={2}
                initial="initial"
                animate="animate"
                variants={variants}
                className="mb-8 text-sm font-normal"
              >
                Log in to your {SITE_TITLE} account.
              </motion.p>

              <motion.div
                custom={3}
                initial="initial"
                animate="animate"
                variants={variants}
                className="mb-4 w-full"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-main text-sm font-normal">Email address</FormLabel>
                      <Input autoFocus autoComplete="off" type="email" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                custom={4}
                initial="initial"
                animate="animate"
                variants={variants}
                className="mb-4 w-full"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-main text-sm font-normal">Password</FormLabel>
                      <div className="relative w-full">
                        <Input
                          autoComplete="off"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />

                        <div
                          className="absolute right-[4px] top-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer"
                          onClick={handleTogglePassword}
                        >
                          {showPassword ? (
                            <LuEyeOff className="text-[16px]" />
                          ) : (
                            <LuEye className="text-[16px]" />
                          )}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                custom={5}
                initial="initial"
                animate="animate"
                variants={variants}
                className="mb-8 w-full text-right"
              >
                <Link className="text-sm" to="/password-reset">
                  Forgot your password?
                </Link>
              </motion.div>

              <motion.div
                custom={6}
                initial="initial"
                animate="animate"
                variants={variants}
                className="w-full"
              >
                <LoadingButton type="submit" loading={store.loading}>
                  Log in
                </LoadingButton>
              </motion.div>
            </form>
          </Form>
        </div>
      </div>
    </AuthLayout>
  )
}
