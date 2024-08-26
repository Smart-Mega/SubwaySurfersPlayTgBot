import React from "react"

import { Link } from "react-router-dom"

import AdminLayout from "@/components/_layout/AdminLayout"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@repo/ui/components/ui/breadcrumb"

import MainForm from "./MainForm"

export default function AccountSettings() {
  return (
    <AdminLayout
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/dashboard" className="text-default text-sm font-normal">
                Dashboard
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="" className="text-default text-sm font-normal">
                Profile
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-main text-sm font-semibold">
                Account Settings
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <div className="flex flex-col">
        <div className="mb-4 block w-full rounded-xl border border-[#ECECEC] bg-white p-8 md:hidden">
          <h3 className="text-main text-lg font-semibold">Account Settings</h3>
        </div>

        <MainForm />
      </div>
    </AdminLayout>
  )
}
