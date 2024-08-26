import React, { useState } from "react"

import { LuBell, LuChevronDown, LuChevronUp, LuLogOut, LuUser, LuUserCircle } from "react-icons/lu"
import { Link } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@repo/ui/components/ui/dropdown-menu"
import { SITE_TITLE } from "@repo/util/constant"

import Logo from "./Logo"
import MobileAdminSidebar from "./MobileAdminSidebar"
import useAdminAuthStore from "@/stores/useAdminAuthStore"

interface Props {
  breadcrumb: React.ReactNode
}

export default function Header({ breadcrumb }: Readonly<Props>) {
  const authStore = useAdminAuthStore()
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleLogoutClick = () => {
    authStore.logoutAction()
  }

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 hidden h-20 items-center justify-between bg-white px-4 py-3 md:left-[270px] lg:flex">
        {breadcrumb}

        <div className="flex items-center justify-center gap-4">
          <LuBell className="text-main text-2xl" />

          <DropdownMenu open={openDrawer} onOpenChange={setOpenDrawer}>
            <DropdownMenuTrigger className="outline-none">
              <div className="flex items-center gap-2">
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

            <DropdownMenuContent className="flex w-60 flex-col gap-2 p-3" sideOffset={20}>
              <DropdownMenuItem asChild className="flex items-center gap-1">
                <Link className="text-default text-sm" to="/account-settings">
                  <LuUserCircle className="text-xl" />
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
        </div>
      </header>

      <header className="fixed left-0 right-0 z-50 flex h-[104px] w-full items-center justify-between bg-white px-6 py-8 lg:hidden">
        <Logo />

        <MobileAdminSidebar />
      </header>
    </>
  )
}
