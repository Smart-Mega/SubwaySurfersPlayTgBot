import React from "react"

import AdminLayout from "@/components/_layout/AdminLayout"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@repo/ui/components/ui/breadcrumb"

export default function Dashboard() {
  return (
    <AdminLayout
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-main text-sm font-semibold">Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <div className="flex flex-col p-4">Dashboard</div>
    </AdminLayout>
  )
}
