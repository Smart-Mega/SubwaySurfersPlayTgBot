import React from "react"

import Header from "./components/Header"
import AdminSidebar from "./components/AdminSidebar"

interface Props {
  breadcrumb: React.ReactNode
  children: React.ReactNode
}

export default function AdminLayout({ breadcrumb, children }: Readonly<Props>) {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <AdminSidebar />

      <div className="flex min-h-screen w-full flex-col pl-0 lg:pl-[270px]">
        <Header breadcrumb={breadcrumb} />

        <section className="flex w-full flex-1 flex-col p-4 pt-[120px] lg:pt-24">
          {children}
        </section>
      </div>
    </main>
  )
}
