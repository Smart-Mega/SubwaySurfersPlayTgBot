import React, { FC, useState } from "react"

import ImagePlaceholder from "@/components/ImagePlaceholder"

import RobotDrawer from "./RobotDrawer"

interface Props {
  robot: Record<string, any>
}

const RobotCard: FC<Props> = ({ robot }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <>
      <div className="relative cursor-pointer" onClick={handleClick}>
        <ImagePlaceholder
          className="w-full"
          src={robot.image ? `${import.meta.env.VITE_API_STATIC_URL}/${robot.image}` : ""}
          alt={robot.name}
          w={165}
          h={165}
          borderRadius="rounded-[20px]"
        />

        <div className="absolute right-2 top-2 text-xs font-bold text-white">LV {robot.level}</div>
        <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-[linear-gradient(_#0C0A0C00_0%,_#0C0A0C99_24%,_#0C0A0CCC_82%,_#0C0A0CFF_100%)]" />

        <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center">
          <span className="text-xs font-bold text-white overflow-hidden whitespace-nowrap text-ellipsis max-w-[60%]">{robot.name}</span>
          <span className="text-xs font-bold text-white">{robot.price} TON</span>
        </div>
      </div>

      <RobotDrawer robot={robot} open={open} setOpen={setOpen} />
    </>
  )
}

export default RobotCard
