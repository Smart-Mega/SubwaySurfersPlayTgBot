import React, { useEffect, useState, type FC } from "react"
import { Link } from "react-router-dom"

import clsx from "clsx"

import { FaUsers } from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri"
import { Image } from "@telegram-apps/telegram-ui"
import { IoIosInformationCircleOutline } from "react-icons/io"

import useAuthStore from "@/stores/useAuthStore"
import useAllianceStore from "@/stores/useAllianceStore"

import PageLayout from "@/components/PageLayout"
import ImagePlaceholder from "@/components/ImagePlaceholder"
import BaseButton from "@/components/buttons/BaseButton"
import LoadingOverlay from "@/components/LoadingOverlay"
import AllianceCreate from "../create"
import { AllianceDataType } from "@/types";
import IconMembers from "@/components/icons/IconMembers";

const AllianceList: FC = () => {
  const store = useAllianceStore()
  const authStore = useAuthStore()

  const [data, setData] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [allianceOfUser, setAllianceOfUser] = useState<AllianceDataType>()

  const initialize = React.useCallback(() => {
    store.getListAction((newData) => {
      setData(newData)
    })

    if (authStore.user?.allianceMember?.alliance) {
      store.getAction(authStore.user.allianceMember.alliance.id, (res) => {
        setAllianceOfUser(res)
      })
    }
  }, [store, authStore])

  useEffect(() => {
    initialize()
  }, [open])

  return (
    <PageLayout>
      <section className="relative mb-4">
        <ImagePlaceholder
          className="w-full"
          src="images/alliance-bg.svg"
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
          Alliance
        </div>

        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 text-center text-sm font-medium text-[#5E5E5E]">
          <RiGlobalLine className="text-xl" />
          Worldwide
        </div>
      </section>

      <section className="mb-1 flex flex-col px-5 text-white">
        {allianceOfUser ? (
          <Link
            to={`/alliance/view/${allianceOfUser?.id}`}
            className="col-span-3 grid grid-cols-[75px_1fr_50px] items-center mb-4"
          >
            <div className={clsx("flex items-center justify-between text-white")}>
              <span className="text-xs font-bold">{allianceOfUser?.rank}</span>
              <Image
                className="h-8 w-8 !rounded-full"
                src={allianceOfUser?.symbol}
                alt={allianceOfUser?.name}
              />
            </div>
            <div className="flex flex-col h-full justify-between px-2 ">
              <div
                className={clsx("w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs font-bold text-white")}
              >
                {allianceOfUser?.name}
              </div>
              <div className="text-white flex items-center gap-1">
                <IconMembers /> <span className="text-xs text-[#C79BFF]">{ allianceOfUser?.member_count ? allianceOfUser?.member_count : 0 }</span>
              </div>
            </div>
            <div className={clsx("text-right text-xs font-bold text-[#C79BFF]")}>
              {allianceOfUser?.score}
            </div>
          </Link>
        ): (
          <BaseButton onClick={()=>setOpen(true)}>Join or create alliance</BaseButton>
        )}
      </section>

      <section className="mt-5 flex flex-1 flex-col rounded-t-3xl bg-[#141114] px-5 py-4">
        <div className="items-center">
          <div className="grid h-full grid-cols-[30px_50px_1fr_50px] items-center">
            <div className="mb-4 text-xs font-bold text-white">Rank</div>
            <div></div>
            <div className="mb-4 text-xs font-bold text-white px-2">Name</div>
            <div className="mb-4 text-xs font-bold text-white text-right">Points</div>
          </div>

          <div className="col-span-4 mb-4 h-[1px] w-full border-t border-[#4F4F4F66]" />

          {data?.map((d, index) => (
            <Link
              key={d.id}
              to={`/alliance/view/${d.id}`}
              className="col-span-3 grid grid-cols-[30px_50px_1fr_50px] items-center mb-4"
            >
              <div
                className={clsx(
                  "flex items-center justify-between",
                  index < 5 ? "text-[#C79BFF]" : "text-white"
                )}
              >
                <span className="text-xs font-bold">{index + 1}</span>
              </div>
              <div>
                <Image
                  className="h-8 w-8 !rounded-full"
                  src={
                    d.symbol ? `${d.symbol}` : ''
                  }
                  alt={d.name}
                />
              </div>
              <div className="flex flex-col h-full justify-between px-2 ">
                <div
                  className={clsx(
                    "w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs font-bold",
                    index < 5 ? "text-[#C79BFF]" : "text-white"
                  )}
                >
                  {d.name}
                </div>
                <div className="text-white flex items-center gap-1">
                  <IconMembers/> <span className="text-xs">{ d.member_count ? d.member_count : 0 }</span>
                </div>
              </div>
              <div
                className={clsx(
                  "text-right text-xs font-bold",
                  index < 5 ? "text-[#C79BFF]" : "text-white"
                )}
              >
                {d.score}
              </div>
            </Link>
          ))}
        </div>

        {data?.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center text-xs font-bold text-white">
            Coming Soon...
          </div>
        )}
      </section>
      <AllianceCreate
        open={open}
        setOpen={setOpen}
      />
      {store.loading && <LoadingOverlay loading />}
    </PageLayout>
  )
}

export default AllianceList
