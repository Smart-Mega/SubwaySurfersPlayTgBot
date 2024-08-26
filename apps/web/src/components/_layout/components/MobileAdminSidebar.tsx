import React, { useState } from "react"

import { Link } from "react-router-dom"
import {
  LuAlignJustify,
  LuBell,
  LuChevronDown,
  LuChevronUp,
  LuHome,
  LuLogOut,
  LuUser,
  LuUsers,
  LuX,
  LuXCircle
} from "react-icons/lu"

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { Button } from "@repo/ui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@repo/ui/components/ui/dropdown-menu"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@repo/ui/components/ui/sheet"
import { SITE_TITLE } from "@repo/util/constant"

import Logo from "./Logo"
import useAdminAuthStore from "@/stores/useAdminAuthStore"
import { GiCrossedPistols } from "react-icons/gi"
import { RiRobot2Line } from "react-icons/ri"

export default function MobileAdminSidebar() {
  const authStore = useAdminAuthStore()
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleLogoutClick = () => {
    authStore.logoutAction()
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-10 rounded-xl px-0">
          <LuAlignJustify className="text-xl" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="flex w-full flex-col gap-0 bg-white p-0 md:min-w-[400px] md:max-w-[400px]"
        hideClose
      >
        <div className="flex h-[104px] w-full items-center justify-between px-6 py-8">
          <Logo />

          <SheetClose asChild>
            <Button className="w-10 rounded-xl px-0">
              <LuX className="text-xl" />
            </Button>
          </SheetClose>
        </div>

        <div className="flex w-full flex-col px-6 py-8">
          <Link className="mb-4 flex items-center gap-1 py-1 text-sm" to="/">
            <LuUsers className="text-xl" />
            Users
          </Link>
          <Link className="mb-4 flex items-center gap-1 py-1 text-sm" to="/">
            <RiRobot2Line className="text-xl" />
            Robots
          </Link>
          <Link className="mb-10 flex items-center gap-1 py-1 text-sm" to="/">
            <GiCrossedPistols className="text-xl" />
            Weapons
          </Link>

          <div className="text-main mb-4 flex cursor-pointer items-center gap-2 py-1 text-sm font-semibold">
            <LuBell className="text-2xl" />
            Notifications
          </div>

          <DropdownMenu open={openDrawer} onOpenChange={setOpenDrawer}>
            <DropdownMenuTrigger className="mb-4 outline-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      className="h-10 w-10 rounded-full object-cover"
                      src={authStore.admin?.image}
                      alt={`${authStore.admin?.first_name} ${authStore.admin?.last_name}`}
                    />
                    <AvatarFallback>
                      <LuUser className="text-main text-[40px]" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="text-main text-left text-sm font-semibold">
                      {authStore.admin?.first_name} {authStore.admin?.last_name}
                    </p>
                    <p className="text-left text-sm font-normal">{SITE_TITLE}</p>
                  </div>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F8F8]">
                  {openDrawer ? (
                    <LuChevronUp className="text-default text-xl" />
                  ) : (
                    <LuChevronDown className="text-default text-xl" />
                  )}
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="flex w-[352px] flex-col gap-2 p-3" sideOffset={10}>
              <DropdownMenuItem asChild className="flex items-center gap-1">
                <Link className="text-default text-sm" to="/account-settings">
                  <LuUser className="text-xl" />
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogoutClick}
                className="flex items-center gap-1 text-[#EF4444]"
              >
                <LuLogOut className="text-xl" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link className="mb-10 w-full" to="/">
            <Button className="h-auto w-full rounded-xl py-4 text-sm font-semibold text-white">
              <LuHome className="mr-2 text-base" /> Back to home
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
