import React, { useEffect, useState, type FC } from "react"

import { createAvatar } from "@dicebear/core"
import { initials } from "@dicebear/collection"
import { LuFlag } from "react-icons/lu"
import { LuGlobe } from "react-icons/lu";
import { PiCodesandboxLogoBold } from "react-icons/pi"
import { Link } from "react-router-dom"
import FlipNumbers from 'react-flip-numbers'

import useAuthStore from "@/stores/useAuthStore"

import RobotCard from "./RobotCard"
import PageLayout from "@/components/PageLayout"
import { useSocket } from "@/context/socket";
// import { apiAuthRefresh } from "@/apis/authApi.ts"

const Home: FC = () => {
  const authStore = useAuthStore()
  const { socket } = useSocket()

  const [selectedRobot, setSelectedRobot] = useState<Record<string, any> | null>(null)
  const [items, setItems] = useState<Array<Record<string, any>>>([])
  const [defaultAvatar, setDefaultAvatar] = useState<string | null>(null)

  
  useEffect(() => { 
    if (socket.connected) {
      socket.emit('user', authStore.user)
    }
  }, [socket])

  const initialize = () => {
    const avatar = createAvatar(initials, {
      seed: `${authStore.user?.tg_first_name ?? ""} ${authStore.user?.tg_last_name ?? ""}`,
      radius: 50,
      fontFamily: ["Manrope"],
      fontWeight: 600
    })
    setDefaultAvatar(avatar.toString())
  }

  useEffect(() => {
    const filteredRobot = authStore.user?.robots?.filter((item: any) => item.is_selected)
    if (filteredRobot?.length > 0) {
      setSelectedRobot(filteredRobot[0])
    } else {
      setSelectedRobot(null)
    }

    if (authStore.user?.items?.length > 0) {
      setItems(authStore.user?.items)
    } else {
      setItems([])
    }

    initialize()
  }, [authStore.user])

  return (
    <PageLayout>
      <section className="mb-4 mt-3 flex items-center justify-between px-5">
        <div className="flex items-center gap-2">
          {authStore.user?.tg_avatar ? (
            <img
              className="h-8 w-8 rounded-full"
              src={authStore.user?.tg_avatar}
              alt={`${authStore.user?.tg_first_name ?? ""} ${authStore.user?.tg_last_name ?? ""}`}
            />
          ) : (
            <div className="h-8 w-8" dangerouslySetInnerHTML={{ __html: defaultAvatar ?? "" }} />
          )}

          <span className="text-base font-bold text-white">
            {`${authStore.user?.tg_first_name ?? ""} ${authStore.user?.tg_last_name ?? ""}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/alliance/list" className="text-[13px] font-medium text-[#717171]">
            {authStore.user?.allianceMember?.alliance?.name ?? "No alliance"}
          </Link>
          <Link to="#" className="text-[20px] text-[#717171]">
            <LuGlobe />
          </Link>
        </div>

      </section>

      <section className="mb-[18px] flex items-center justify-between px-5">
        <div className="flex items-center gap-1">
          <Link
            to="/leaderboard"
            className="flex items-center justify-between gap-0.5 rounded-full bg-[#FFFFFF30] px-1.5 py-0.5 text-sm font-medium text-[#C1C1C1]"
          >
            <LuFlag className="text-[13px]" />
            {authStore.user?.rank ?? "N/A"}
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <PiCodesandboxLogoBold className="text-[22px] text-yellow-600" />
          <span className="text-[24px] font-bold text-white">
            {/*{formatNumber(authStore.user?.score ?? 0)}*/}
            <FlipNumbers
              height={24}
              width={16}
              color="white"
              play
              numbers={(authStore.baseScore + authStore.hourlyRewardPoint).toLocaleString('ru-RU')}
            />
          </span>
        </div>
        <div className="text-[14px] font-[500] text-gray-400">{ authStore.user?.hourly_reward_point.toLocaleString()} / h</div>
      </section>

      {selectedRobot && <RobotCard robot={selectedRobot} items={items} />}
    </PageLayout>
  )
}

export default Home
