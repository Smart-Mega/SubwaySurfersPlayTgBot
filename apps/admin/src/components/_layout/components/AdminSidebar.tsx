import React from "react"

import { LuHome, LuUsers } from "react-icons/lu"
import { RiRobot2Line } from "react-icons/ri"
import { GiCrossedPistols } from "react-icons/gi"
import { Link } from "react-router-dom"

import { Button } from "@repo/ui/components/ui/button"
import { SITE_TITLE } from "@repo/util/constant"

import Logo from "./Logo"

export default function AdminSidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-0 hidden max-h-screen min-h-screen min-w-[270px] max-w-[270px] flex-col bg-white px-6 py-[30px] lg:flex">
      <div className="mb-12">
        <Logo />
      </div>

      <div className="mb-20 flex flex-1 flex-col">
        <Link className="mb-10 w-full" to="/dashboard">
          <Button className="h-auto w-full rounded-xl py-4 text-sm font-semibold text-white">
            <LuHome className="mr-2 text-base" /> Back to home
          </Button>
        </Link>

        <Link className="mb-4 flex items-center gap-1 py-1 text-sm" to="/">
          <LuUsers className="text-xl" />
          Users
        </Link>
        <Link className="mb-4 flex items-center gap-1 py-1 text-sm" to="/">
          <RiRobot2Line className="text-xl" />
          Robots
        </Link>
        <Link className="flex items-center gap-1 py-1 text-sm" to="/">
          <GiCrossedPistols className="text-xl" />
          Weapons
        </Link>
      </div>

      <p className="text-sm">
        &copy; {new Date().getFullYear()} {SITE_TITLE}
      </p>
    </aside>
  )
}
