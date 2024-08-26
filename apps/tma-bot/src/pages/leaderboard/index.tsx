import React, { useEffect, useState, type FC } from "react"

import clsx from "clsx"
import { IoIosInformationCircleOutline } from "react-icons/io"
import { RiGlobalLine } from "react-icons/ri"

import PageLayout from "@/components/PageLayout"
import ImagePlaceholder from "@/components/ImagePlaceholder"
import useLeaderboardStore from "@/stores/useLeaderboardStore"

const Leaderboard: FC = () => {
  const store = useLeaderboardStore()

  const [data, setData] = useState<any[]>([])

  const initialize = () => {
    store.getAction((newData) => {
      setData(newData)
    })
  }

  useEffect(() => {
    initialize()
  }, [])

  return (
    <PageLayout>
      <section className="relative mb-4">
        <ImagePlaceholder
          className="w-full"
          src="images/leaderboard-bg.svg"
          alt="Background"
          w={375}
          h={215}
          borderRadius="rounded-t-[30px]"
        />

        <button className="absolute right-4 top-4 flex items-center gap-1 rounded-xl p-1 hover:bg-[rgba(255,255,255,0.2)]">
          <IoIosInformationCircleOutline className="text-base text-white" />
          <span className="text-xs font-bold text-white">Notice</span>
        </button>

        <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-[linear-gradient(_#0C0A0C00_0%,_#0C0A0C61_23%,_#0C0A0CCC_82%,_#0C0A0CFF_100%)]" />

        <div className="absolute bottom-10 left-0 right-0 text-center text-2xl font-semibold text-white">
          Leaderboard
        </div>

        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 text-center text-sm font-medium text-[#5E5E5E]">
          <RiGlobalLine className="text-xl" />
          Worldwide
        </div>
      </section>

      <section className="mb-6 flex flex-col px-10 text-white">
        <div className="mb-1 flex items-center justify-center text-base font-bold">
          {data?.[0]?.user?.tg_username ?? "Soon"}
        </div>

        <div className="flex items-center justify-between text-xs font-bold">
          <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left">
            {data?.[1]?.user?.tg_username ?? "Soon"}
          </span>
          <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-right">
            {data?.[2]?.user?.tg_username ?? "Soon"}
          </span>
        </div>
      </section>

      <section className="flex flex-1 flex-col rounded-3xl bg-[#141114] px-5 py-4">
        <div className="grid h-full grid-cols-[75px_1fr_50px] items-center">
          <div className="mb-4 text-xs font-bold text-white">Rank</div>
          <div className="mb-4 text-xs font-bold text-white">Name</div>
          <div className="mb-4 text-xs font-bold text-white">MGT</div>

          <div className="col-span-3 mb-4 h-[1px] w-full border-t border-[#4F4F4F66]" />

          {data.map((d, index) => (
            <React.Fragment key={d.rank}>
              <div
                className={clsx(
                  "mb-4 flex items-center justify-between",
                  index < 5 ? "text-[#C79BFF]" : "text-white"
                )}
              >
                <span className="text-xs font-bold">{index + 1}</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={d.user?.tg_avatar}
                  alt={d.user?.tg_username}
                />
              </div>
              <div
                className={clsx(
                  "mb-4 w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 text-xs font-bold",
                  index < 5 ? "text-[#C79BFF]" : "text-white"
                )}
              >
                {d.user?.tg_username}
              </div>
              <div
                className={clsx(
                  "mb-4 text-right text-xs font-bold",
                  index < 5 ? "text-[#C79BFF]" : "text-white"
                )}
              >
                {d.user?.score}
              </div>
            </React.Fragment>
          ))}
        </div>

        {data?.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center text-xs font-bold text-white">
            Coming Soon...
          </div>
        )}
      </section>
    </PageLayout>
  )
}

export default Leaderboard
