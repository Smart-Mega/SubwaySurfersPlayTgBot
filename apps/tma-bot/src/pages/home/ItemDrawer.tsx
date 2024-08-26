import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react"

import { PiLightningLight } from "react-icons/pi"
import { Modal } from "@telegram-apps/telegram-ui"
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader"

import ImagePlaceholder from "@/components/ImagePlaceholder"
import useRobotStore from "@/stores/useRobotStore"
import clsx from "clsx"
import { LuCheck, LuCheckCircle, LuPin } from "react-icons/lu"

interface Props {
  robot: Record<string, any>
  items: Array<Record<string, any>>
  position: string
  type: string

  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ItemDrawer: FC<Props> = ({ robot, items, position, type, open, setOpen }) => {
  const robotStore = useRobotStore()

  const handleItemClick = (item: any) => () => {
    robotStore.setItemAction(
      {
        robot_id: robot.id,
        item_id: item.id,
        position,
        type,
        remaining: item.quantity - item.equipped_quantity - item.sale_quantity
      },
      () => {
        setOpen(false)
      }
    )
  }

  return (
    <Modal
      className="z-[2000] bg-[#1A1A1A] h-[55vh] border-t-[1px] border-[#FFAB0A] drop-shadow-[0_2px_20px_rgba(255,171,10,0.7)]"
      open={open}
      onOpenChange={setOpen}
      header={<ModalHeader className="before:!bg-[#C4C4C466]">Only iOS header</ModalHeader>}
      nested
    >
      <div className="mt-7 mb-5 px-5 text-xs text-[#5E5E5E]">Here you can find all your items</div>

      <div className="mb-20 grid w-full grid-cols-4 gap-3 px-5">
        {items
          .filter((item) => item.type === type)
          .map((item) => (
            <div
              key={`ItemDrawer-${item.id}`}
              className={clsx(
                "flex cursor-pointer flex-col items-center gap-2",
                item.quantity - item.equipped_quantity - item.sale_quantity > 0 ? "" : "grayscale"
              )}
              onClick={handleItemClick(item)}
            >
              <div className="relative w-full">
                <ImagePlaceholder
                  className="w-full opacity-80"
                  src={`${import.meta.env.VITE_API_STATIC_URL}/${item.image}`}
                  alt={item.name}
                  w={80}
                  h={80}
                  borderRadius="rounded-[20px]"
                />

                <div className="absolute left-0 top-0 px-1 text-base font-semibold text-white">
                  x {item.quantity - item.equipped_quantity - item.sale_quantity}
                </div>

                <div className="absolute bottom-0 right-0 px-1">
                  {robot?.items?.filter(
                    (i: any) => i.item_id === item.id && i.position === position && i.type === type
                  )?.length > 0 && <LuCheck className="text-base font-bold text-white" />}
                </div>
              </div>
              <span className="text-xs font-bold text-white">{item.name}</span>
            </div>
          ))}
      </div>

      <div className="mb-5 flex justify-end px-5">
        <PiLightningLight className="h-6 w-6 text-[#3CF9FB]" />
      </div>
    </Modal>
  )
}

export default ItemDrawer
