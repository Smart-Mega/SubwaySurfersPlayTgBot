import React, { useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"

import { ImageUpload, LoadingButton } from "@/components/_uiext"
import useAuthStore from "@/stores/useAuthStore"

import { Button } from "@repo/ui/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { Input } from "@repo/ui/components/ui/input"
import useAdminAuthStore from "@/stores/useAdminAuthStore"

const FormSchema = z
  .object({
    image: z.any().optional(),
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({
      message: "Please enter a valid email address"
    }),
    mobile_number: z.string().min(1, {
      message: "Please enter a valid mobile number"
    }),
    current_password: z.string().refine((data) => data === "" || data.length >= 8, {
      message: "Current password should be at least 8 characters"
    }),
    new_password: z.string().refine((data) => data === "" || data.length >= 8, {
      message: "New password should be at least 8 characters"
    })
  })
  .refine(
    (data) => {
      if (data.current_password === "" && data.new_password !== "") {
        return false
      }
      return true
    },
    {
      message: "Current password is required if new password is set",
      path: ["current_password"]
    }
  )
  .refine(
    (data) => {
      if (data.current_password !== "" && data.new_password === "") {
        return false
      }
      return true
    },
    {
      message: "New password is required if current password is set",
      path: ["new_password"]
    }
  )

type FormSchemaType = z.infer<typeof FormSchema>

export default function MainForm() {
  const store = useAdminAuthStore()
  const navigate = useNavigate()

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      image: null,
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
      current_password: "",
      new_password: ""
    }
  })

  const handleCancelClick = () => {
    navigate("/dashboard")
  }

  const onSubmit = (values: FormSchemaType) => {
    store.updateProfileAction(values)
  }

  useEffect(() => {
    form.reset({
      image: store.admin?.image ?? null,
      first_name: store.admin?.first_name ?? "",
      last_name: store.admin?.last_name ?? "",
      email: store.admin?.email ?? "",
      mobile_number: store.admin?.mobile_number ?? ""
    })
  }, [store.admin])

  return (
    <Form {...form}>
      <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full rounded-xl border border-[#ECECEC] bg-white p-8">
          <div className="flex w-full flex-1 flex-col gap-5 xl:pr-8">
            <h3 className="text-main mb-4 py-4 text-lg font-semibold">Manage account</h3>

            <div className="mb-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-main text-sm font-normal">Image</FormLabel>
                    <ImageUpload {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4 flex w-full flex-col gap-4 md:flex-row md:gap-8">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-main text-sm font-normal">First name</FormLabel>
                      <Input autoFocus autoComplete="off" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-main text-sm font-normal">Last name</FormLabel>
                      <Input autoComplete="off" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="mb-4 flex w-full flex-col gap-4 md:flex-row md:gap-8">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-main text-sm font-normal">Email address</FormLabel>
                      <Input autoComplete="off" type="email" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="mobile_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-main text-sm font-normal">Mobile number</FormLabel>
                      <Input autoComplete="off" type="tel" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="mb-4 flex w-full flex-col gap-4 md:flex-row md:gap-8">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="current_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-main text-sm font-normal">
                        Current password
                      </FormLabel>
                      <Input autoComplete="off" type="password" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-main text-sm font-normal">New password</FormLabel>
                      <Input autoComplete="off" type="password" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="hidden w-80 xl:inline-block" />
        </div>

        <div className="flex w-full justify-end gap-2 pb-2 pt-6">
          <Button
            type="button"
            className="text-default h-auto border border-[#868194] bg-transparent px-6 py-4 font-semibold hover:bg-transparent"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>

          <LoadingButton loading={store.loading} type="submit" className="px-6 py-4 md:!w-auto">
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}
