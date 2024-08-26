import React, { useEffect, useState, type FC } from "react"

import clsx from "clsx"

import { IconLock } from "@/components/icons"

interface Props {
  className: string
  robot: Record<string, any>
  items: Array<Record<string, any>>
  position: string
  type: string
  onSlotClick: (position: string, type: string) => () => void
}

const ItemSlot: FC<Props> = ({ className, robot, items, position, type, onSlotClick }) => {
  const [itemImage, setItemImage] = useState("")

  useEffect(() => {
    if (!robot?.items?.length) return

    const item_id = robot?.items?.filter(
      (ri: any) => ri.position === position && ri.type === type
    )?.[0]?.item_id

    setItemImage(items.filter((item) => item.id === item_id)?.[0]?.image)
  }, [robot, items, position, type])

  return (
    <div
      className={clsx(
        "cursor-pointer rounded-2xl text-[#FFFFFF7F] hover:bg-[rgba(255,255,255,0.2)] hover:text-white",
        className
      )}
      onClick={onSlotClick(position, type)}
    >
      <IconLock className="absolute h-full w-full" />

      {itemImage && (
        <div className="absolute flex h-full w-full items-center justify-center">
          <img
            className="h-2/3 w-2/3"
            src={`${import.meta.env.VITE_API_STATIC_URL}/${itemImage}`}
          />
        </div>
      )}
    </div>
  )
}

export default ItemSlot
