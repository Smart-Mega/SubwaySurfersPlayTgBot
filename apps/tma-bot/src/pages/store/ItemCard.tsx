import React, { FC, useState } from "react"

import ImagePlaceholder from "@/components/ImagePlaceholder"

import ItemDrawer from "./ItemDrawer"

interface Props {
  item: Record<string, any>
}

const ItemCard: FC<Props> = ({ item }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <>
      <div className="relative cursor-pointer" onClick={handleClick}>
        <ImagePlaceholder
          className="w-full"
          src={item.image ? `${import.meta.env.VITE_API_STATIC_URL}/${item.image}` : ""}
          alt={item.name}
          w={165}
          h={165}
          borderRadius="rounded-[20px]"
        />

        <div className="absolute bottom-0 left-0 right-0 h-[25%] rounded-b-[20px] bg-[linear-gradient(_#0C0A0C00_0%,_#0C0A0C99_24%,_#0C0A0CCC_82%,_#0C0A0CFF_100%)]" />

        <div className="absolute bottom-2 left-3 right-3 flex justify-between">
          <span className="text-xs font-bold text-white overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</span>
          <span className="text-xs font-bold text-white">{item.price} TON</span>
        </div>
      </div>

      <ItemDrawer item={item} open={open} setOpen={setOpen} />
    </>
  )
}

export default ItemCard
