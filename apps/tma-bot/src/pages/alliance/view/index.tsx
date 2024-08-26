import React, { useEffect, useState, type FC } from "react"

import clsx from "clsx"
import { IoIosInformationCircleOutline } from "react-icons/io"
import { PiCodesandboxLogoBold } from "react-icons/pi"
import { Link, useParams } from "react-router-dom"

import PageLayout from "@/components/PageLayout"
import { IconMembers } from "@/components/icons"
import ImagePlaceholder from "@/components/ImagePlaceholder"
import useAllianceStore from "@/stores/useAllianceStore"
import useAuthStore from "@/stores/useAuthStore"
import BaseButton from "@/components/buttons/BaseButton"
import { Image } from "@telegram-apps/telegram-ui"
import LoadingOverlay from "@/components/LoadingOverlay"
import CompleteOverlay from "@/components/CompleteOverlay"

const AllianceView: FC = () => {
  const { id: allianceId } = useParams()

  const store = useAllianceStore()
  const authStore = useAuthStore()

  const [data, setData] = useState<any>({})
  const [isJoined, setIsJoined] = useState(false)
  const [isLeader, setIsLeader] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const initialize = () => {
    store.getAction(Number(allianceId), (newData) => {
      setData(newData)
    })
  }

  const handleJoinAlliance = React.useCallback(async () => {
    if (isJoined) {
      await authStore.leaveAllianceAction(() => {
        setIsSuccess(true)
        store.getAction(Number(allianceId), (newData) => {
          setData(newData)
        })
      })
      
    } else {
      await authStore.joinAllianceAction({ alliance_id: allianceId })
      setIsSuccess(true)
      store.getAction(Number(allianceId), (newData) => {
        setData(newData)
      })
    }
  }, [authStore, data, setData])

  const handleLeaveAlliance = React.useCallback(async () => {
    await authStore.leaveAllianceAction(() => {
      setIsSuccess(true)
      store.getAction(Number(allianceId), (newData) => {
        setData(newData)
      })
    })
  }, [authStore, data, setData])

  useEffect(() => {
    initialize()
  }, [])

  useEffect(() => {
    if (authStore.user?.allianceMember) {
      if (Number(authStore.user?.allianceMember?.alliance_id) === Number(allianceId)) {
        setIsJoined(true)
      }

      if (
        Number(authStore.user?.allianceMember?.alliance_id) === Number(allianceId) &&
        authStore.user?.allianceMember?.is_leader
      ) {
        setIsLeader(true)
      }
    } else {
      setIsJoined(false)
      setIsLeader(false)
    }
  }, [authStore.user, allianceId])

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
          {data?.name ?? ""}
        </div>

        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 text-center text-sm font-medium text-[#5E5E5E]">
          #{data?.rank} Place
        </div>

        <div className="absolute bottom-1 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <PiCodesandboxLogoBold className="text-xl text-white" />
            <span className="text-sm font-bold text-white">{data?.score ?? 0}</span>
          </div>

          <div className="flex items-center gap-1">
            <IconMembers className="text-xl text-white" />
            <span className="text-sm font-bold text-white">{data?.member_count ?? 0}</span>
          </div>
        </div>
      </section>

      <section className="mb-6 px-5">
        {!isLeader && (
          <BaseButton onClick={handleJoinAlliance}>{!isJoined ? "Join the alliance" : "Leave the alliance"}</BaseButton>
        )}

        {isLeader && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Link
                to={`/alliance/distribute/${allianceId}`}
                className="text-sm font-bold text-white"
              >
                Distribute
              </Link>
              <Link
                to={`/alliance/arena/${allianceId}`}
                className="text-sm font-bold text-[#E55B5B]"
              >
                Alliance Arena
              </Link>
              <Link to={`/alliance/megagun/${allianceId}`} className="text-sm font-bold text-white">
                Megagun
              </Link>
            </div>
            <BaseButton onClick={handleLeaveAlliance}>Leave the alliance</BaseButton>
          </div>
        )}
      </section>

      <section className="flex flex-1 flex-col rounded-3xl bg-[#141114] px-5 py-4">
        <div className="items-center">
          <div className="grid h-full grid-cols-[30px_50px_1fr_50px] items-center">
            <div className="mb-4 text-xs font-bold text-white">Rank</div>
            <div></div>
            <div className="mb-4 text-xs font-bold text-white">Name</div>
            <div className="mb-4 text-xs font-bold text-white text-right">Points</div>
          </div>

          <div className="col-span-3 mb-4 h-[1px] w-full border-t border-[#4F4F4F66]" />

          {data?.members?.map((d: any, index: number) => (
            <div key={d.id} className="col-span-3 grid grid-cols-[30px_50px_1fr_50px] mb-4 items-center">
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
                  src={d?.user?.tg_avatar}
                  alt={d?.user?.tg_username}
                />
              </div>
              <div
                className={clsx(
                  "w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 text-xs font-bold",
                  index < 5 ? "text-[#C79BFF]" : "text-white"
                )}
              >
                {d?.user?.tg_first_name ?? ""} {d?.user?.tg_last_name ?? ""}
              </div>
              <div
                className={clsx(
                  "text-right text-xs font-bold",
                  index < 5 ? "text-[#C79BFF]" : "text-white"
                )}
              >
                {d?.user?.score}
              </div>
            </div>
          ))}
        </div>

        {data?.members?.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center text-xs font-bold text-white">
            Coming Soon...
          </div>
        )}

        {(store.loading || authStore.loading) && <LoadingOverlay loading />}
        
        {isSuccess && <CompleteOverlay isSuccess onClose={() => setIsSuccess(false)} />}
      </section>
    </PageLayout>
  )
}

export default AllianceView
