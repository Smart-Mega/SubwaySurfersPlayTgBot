import React, { FC, useEffect, useState } from "react"

import { IoIosInformationCircleOutline } from "react-icons/io"
import { PiLightningLight } from "react-icons/pi"
import { Link } from "react-router-dom"

import ImagePlaceholder from "@/components/ImagePlaceholder"
import { IconPackage } from "@/components/icons"
import { parseItems, parseRobot } from "@/utils/parser"

import { BOT_ITEM_TYPES, BOT_ROBOT_ITEM_POSITION } from "@repo/util/bot.constant"

import ItemDrawer from "./ItemDrawer"
import InformationDrawer from "./InformationDrawer"
import ItemSlot from "./ItemSlot"

interface Props {
  robot: Record<string, any>
  items: Array<Record<string, any>>
}

const RobotCard: FC<Props> = (props) => {
  const { robot, items } = props

  const [openSlot, setOpenSlot] = useState(false)
  const [openInformation, setOpenInformation] = useState(false)

  const [slotPosition, setSlotPosition] = useState("")
  const [slotType, setSlotType] = useState("")

  const [parsedRobot, setParsedRobot] = useState<Record<string, any>>({})
  const [parsedItems, setParsedItems] = useState<Array<Record<string, any>>>([])

  const handleSlotClick = (position: string, type: string) => () => {
    setSlotPosition(position)
    setSlotType(type)
    setOpenSlot(true)
  }

  const handleInformationClick = () => {
    setOpenInformation(true)
  }

  useEffect(() => {
    const newRobot = parseRobot(robot)
    setParsedRobot(newRobot)
  }, [robot])

  useEffect(() => {
    const newItems = parseItems(items)
    setParsedItems(newItems)
  }, [items])

  return (
    <>
      <section className="relative mb-6">
        <ImagePlaceholder
          className="w-full"
          src={
            parsedRobot.image ? `${import.meta.env.VITE_API_STATIC_URL}/${parsedRobot.image}` : ""
          }
          alt="Background"
          w={375}
          h={375}
          borderRadius="rounded-[30px]"
        />

        <ItemSlot
          className="absolute left-[46%] top-[8%] h-[14.6%] w-[14.6%]"
          robot={parsedRobot}
          items={parsedItems}
          position={BOT_ROBOT_ITEM_POSITION.Top}
          type={BOT_ITEM_TYPES.Equipment}
          onSlotClick={handleSlotClick}
        />

        <ItemSlot
          className="absolute left-[17.6%] top-[26.6%] h-[14.6%] w-[14.6%]"
          robot={parsedRobot}
          items={parsedItems}
          position={BOT_ROBOT_ITEM_POSITION.HeadLeft}
          type={BOT_ITEM_TYPES.Shield}
          onSlotClick={handleSlotClick}
        />

        <ItemSlot
          className="absolute left-[65.6%] top-[32.8%] h-[14.6%] w-[14.6%]"
          robot={parsedRobot}
          items={parsedItems}
          position={BOT_ROBOT_ITEM_POSITION.HeadRight}
          type={BOT_ITEM_TYPES.Shield}
          onSlotClick={handleSlotClick}
        />

        <ItemSlot
          className="absolute left-[12.2%] top-[56.8%] h-[14.6%] w-[14.6%]"
          robot={parsedRobot}
          items={parsedItems}
          position={BOT_ROBOT_ITEM_POSITION.ArmLeft}
          type={BOT_ITEM_TYPES.Weapon}
          onSlotClick={handleSlotClick}
        />

        <ItemSlot
          className="absolute left-[42.6%] top-[50.1%] h-[14.6%] w-[14.6%]"
          robot={parsedRobot}
          items={parsedItems}
          position={BOT_ROBOT_ITEM_POSITION.Body}
          type={BOT_ITEM_TYPES.Armor}
          onSlotClick={handleSlotClick}
        />

        <ItemSlot
          className="absolute left-[81.8%] top-[50.4%] h-[14.6%] w-[14.6%]"
          robot={parsedRobot}
          items={parsedItems}
          position={BOT_ROBOT_ITEM_POSITION.Pet}
          type={BOT_ITEM_TYPES.Pet}
          onSlotClick={handleSlotClick}
        />

        <ItemSlot
          className="absolute left-[69.6%] top-[64%] h-[14.6%] w-[14.6%]"
          robot={parsedRobot}
          items={parsedItems}
          position={BOT_ROBOT_ITEM_POSITION.ArmRight}
          type={BOT_ITEM_TYPES.Weapon}
          onSlotClick={handleSlotClick}
        />

        <button
          className="absolute right-[4%] top-[4%] h-[6.4%] w-[6.4%] cursor-pointer rounded-full text-[#FFFFFF7F] hover:bg-[rgba(255,255,255,0.2)] hover:text-white"
          onClick={handleInformationClick}
        >
          <IoIosInformationCircleOutline className="h-full w-full" />
        </button>

        <Link
          to="/store"
          className="absolute bottom-[4%] right-[4%] h-[6.4%] w-[6.4%] cursor-pointer rounded-2xl text-[#FFFFFF7F] hover:bg-[rgba(255,255,255,0.2)] hover:text-white"
        >
          <IconPackage className="h-full w-full" />
        </Link>
      </section>

      <section className="mb-4 flex items-center justify-between px-5">
        <PiLightningLight className="mr-2 h-6 w-6 text-[#3CF9FB]" />
        <span className="mr-4 text-base font-medium text-white">LV 1</span>
        <div className="relative h-4 flex-1 rounded-full bg-[#292829]">
          <div className="absolute bottom-0 left-0 right-[33%] top-0 rounded-full bg-[linear-gradient(_#F181E6_0%,_#3CF9FB_100%)]" />
        </div>
      </section>

      <section className="mb-6 flex items-center justify-center px-5">
        <div className="text-xs text-white">Claim Now</div>
      </section>

      <section className="flex justify-between mb-2 px-5">
        <div>
          <Link to="#" className="text-base font-[400] text-[#F34747] uppercase">Arena</Link>
        </div>
        <div>
          <Link to="#" className="text-base font-[400] uppercase text-white">Boost</Link>
        </div>
      </section>

      <ItemDrawer
        robot={parsedRobot}
        items={parsedItems}
        position={slotPosition}
        type={slotType}
        open={openSlot}
        setOpen={setOpenSlot}
      />

      <InformationDrawer
        robot={parsedRobot}
        items={parsedItems}
        open={openInformation}
        setOpen={setOpenInformation}
      />
    </>
  )
}

export default RobotCard
