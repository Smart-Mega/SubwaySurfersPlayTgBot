import React, { FC, PropsWithChildren } from "react"

import { Link } from "react-router-dom"

import ImagePlaceholder from "@/components/ImagePlaceholder"

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex min-h-screen w-full flex-col pb-[calc(25vw+45px)]">
      {children}

      <section className="fixed w-full bottom-0 z-[1000] bg-black p-5">
        <div className="flex w-full items-center justify-between gap-3 select-none">
          <Link className="flex flex-1 flex-col items-center gap-2" to="/">
            <ImagePlaceholder className="w-full h-[76px] object-cover" src="menus/home.svg" alt="Home" borderRadius="rounded-[20px]"/>
            <span className="text-xs font-bold text-white">Home</span>
          </Link>

          <Link className="flex flex-1 flex-col items-center gap-2" to="/store">
            <ImagePlaceholder className="w-full h-[76px] object-cover" src="menus/store.svg" alt="Store" borderRadius="rounded-[20px]"/>
            <span className="text-xs font-bold text-white">Store</span>
          </Link>

          <Link className="flex flex-1 flex-col items-center gap-2" to="/tasks">
            <ImagePlaceholder className="w-full h-[76px] object-cover" src="menus/tasks.svg" alt="Tasks" borderRadius="rounded-[20px]"/>
            <span className="text-xs font-bold text-white">Tasks</span>
          </Link>

          <Link className="flex flex-1 flex-col items-center gap-2" to="/profile">
            <ImagePlaceholder className="w-full h-[76px] object-cover" src="menus/profile.svg" alt="Me" borderRadius="rounded-[20px]"/>
            <span className="text-xs font-bold text-white">Me</span>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default PageLayout
