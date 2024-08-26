import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react"

import { Modal } from "@telegram-apps/telegram-ui"
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader"
import { IoIosInformationCircleOutline } from "react-icons/io"
import { PiLightningLight } from "react-icons/pi"

import { BOT_ROBOT_ATTRIBUTES } from "@repo/util/bot.constant"
import { capitalCase } from "change-case"

interface Props {
  robot: Record<string, any>
  items: Array<Record<string, any>>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const InformationDrawer: FC<Props> = ({ robot, items, open, setOpen }) => {
  const [additionalAttributes, setAdditionalAttributes] = useState<Record<string, any>>({})

  const initialize = () => {
    if (robot.attributes && Object.keys(robot.attributes).length > 0 && items.length > 0) {
      let newAdditionalAttributes: Record<string, any> = {}

      Object.keys(robot.attributes).forEach((key) => {
        let value = 0.0
        for (let i = 0; i < robot?.items?.length; i++) {
          const one = robot.items[i]
          const item = items.filter((i: any) => i.id === one.item_id)?.[0]

          const attributeValue = isNaN(item?.attributes?.[key])
            ? 0
            : Number(item?.attributes?.[key])
          value += attributeValue
        }
        newAdditionalAttributes = {
          ...newAdditionalAttributes,
          [key]: Math.round(value * 100) / 100
        }
      })

      setAdditionalAttributes(newAdditionalAttributes)
    } else {
      setAdditionalAttributes({})
    }
  }

  useEffect(() => {
    initialize()
  }, [robot, items])

  return (
    <Modal
      className="z-[2000] bg-[#1A1A1A] h-[57vh] border-t-[1px] border-[#FFAB0A] drop-shadow-[0_2px_20px_rgba(255,171,10,0.7)]"
      open={open}
      onOpenChange={setOpen}
      header={<ModalHeader className="before:!bg-[#C4C4C466]">Only iOS header</ModalHeader>}
      nested
    >
      <div className="mt-7 mb-5 px-5 text-xs text-[#5E5E5E]">The main characteristics and overall indicators of the robot are displayed here</div>
      <div className="mt-7 mb-5 flex justify-between items-start gap-4 px-5">
        <div className="relative flex-none w-[165px]">
          <img src={`${import.meta.env.VITE_API_STATIC_URL}/${robot.image}`} alt="Background" w={165} h={165} />
          
          <div className="absolute bottom-0 left-0 right-0 h-[25%] rounded-b-[13px] bg-[linear-gradient(_#0C0A0C00_0%,_#0C0A0C99_24%,_#0C0A0CCC_82%,_#0C0A0CFF_100%)]" />

        <div className="absolute bottom-2 left-3 right-3 flex justify-between">
          <div className="flex items-center text-white">
            <PiLightningLight className="text-yellow-400"/>
            <span className="text-[12px] font-bold ml-[2px]">+100/h</span>
          </div>
          <div className="text-[12px] font-bold text-white">LV {robot.level}</div>
        </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="text-[10px] font-semibold text-yellow-400">Limited edition</div>
          <div className="mb-2 flex items-center justify-between">
            <div className="text-base font-bold text-white overflow-hidden whitespace-nowrap text-ellipsis max-w-[60%]">{robot.name}</div>
            <IoIosInformationCircleOutline className="h-4 w-4 text-[#9F9F9F]" />
          </div>

          <div className="mb-2 h-[1px] w-full border-t border-[#4F4F4F66]" />

          {robot.attributes &&
            Object.keys(robot.attributes)
              .sort()
              .map((key) => (
                <div key={key} className="mb-2 flex items-center justify-between">
                  <div className="text-xs font-normal text-[#9F9F9F]">{capitalCase(key)}</div>
                  <div className="text-xs font-semibold text-white">
                    {additionalAttributes?.[key]
                      ? `${Number(robot.attributes?.[key]) + additionalAttributes[key]} ( +${additionalAttributes[key]} )`
                      : Number(robot.attributes?.[key])}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </Modal>
  )
}

export default InformationDrawer
