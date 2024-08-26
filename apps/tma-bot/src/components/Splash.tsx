import React, { useEffect } from "react"

import { PulseLoader } from "react-spinners"

import { SITE_TITLE } from "@repo/util/constant"

import ImagePlaceholder from "@/components/ImagePlaceholder"

export default function Splash() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = 'images/splash-bg.svg'
    link.as = 'image'
    document.head.appendChild(link)
  }, [])

  return (
    <main className="flex h-screen w-full flex-col">
      <section className="relative h-full w-full">
        <ImagePlaceholder className="h-full w-full object-cover" src="images/splash-bg.svg" alt="Background" />

        <div className="absolute left-0 right-0 top-[35%] flex flex-col gap-2">
          <h2 className="text-center text-[6vw] font-light leading-[6vw] text-white">Welcome to</h2>
          <h1 className="text-center text-[15vw] font-bold uppercase leading-[15vw] text-white">
            {SITE_TITLE}
          </h1>
        </div>

        <div className="item absolute bottom-8 left-0 right-0">
          <p className="flex items-center justify-center gap-1 text-center">
            <span className="text-[4vw] leading-[4vw] text-white">Generation model</span>
            <div className="mt-[1px]">
            <PulseLoader
              size={4}
              color="#FFFFFF"
              speedMultiplier={0.75}
              margin={1}
              className="mt-1"
            />
            </div>
          </p>
        </div>
      </section>
    </main>
  )
}
