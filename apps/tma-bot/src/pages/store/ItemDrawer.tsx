import React, { Dispatch, FC, SetStateAction, useState } from "react"

import { Modal } from "@telegram-apps/telegram-ui"
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader"
import { capitalCase } from "change-case"
import { IoIosInformationCircleOutline } from "react-icons/io"
import { PiLightningLight, PiCodesandboxLogoBold } from "react-icons/pi"
import ImagePlaceholder from "@/components/ImagePlaceholder"

interface Props {
  item: Record<string, any>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ItemDrawer: FC<Props> = ({ item, open, setOpen }) => {

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  return (
    <Modal
      className="z-[2000] bg-[#1A1A1A] h-[65vh] border-t-[1px] border-[#FFAB0A] drop-shadow-[0_2px_20px_rgba(255,171,10,0.7)]"
      open={open}
      onOpenChange={setOpen}
      header={<ModalHeader className="before:!bg-[#C4C4C466]">Only iOS header</ModalHeader>}
      nested
    >
      <div className="mt-7 mb-5 flex justify-between items-start gap-4 px-5">
        <div className="relative flex-none w-[165px]">
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
          <div className="flex items-center text-white">
            <PiLightningLight className="text-yellow-400"/>
            <span className="text-[12px] font-bold ml-[2px]">+30/h</span>
          </div>
          <div className="text-[12px] font-bold text-white">LV 10</div>
        </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="text-[10px] font-semibold text-yellow-400">Limited edition</div>
          <div className="mb-2 flex items-center justify-between">
            <div className="text-base font-bold text-white overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</div>
            <IoIosInformationCircleOutline className="h-4 w-4 text-[#9F9F9F]" />
          </div>

          <div className="mb-2 h-[1px] w-full border-t border-[#4F4F4F66]" />

          {Object.keys(item.attributes).map((key) => (
            <div key={key} className="mb-2 flex items-center justify-between">
              <div className="text-xs font-normal text-[#9F9F9F]">{capitalCase(key)}</div>
              <div className="text-xs font-semibold text-white">{item.attributes?.[key]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-7 px-5">
          <div className="flex items-center rounded-full bg-[#212121]">
            <button
              onClick={handleDecrement}
              className="text-[26px] w-8 h-8 rounded-full text-white flex items-center justify-center"
            >
              -
            </button>
            <input
            type="number"
            value={quantity}
            onChange={handleChange}
            className="text-[12px] w-12 text-center text-white bg-transparent border-none"
            min="1"
          />
            <button
              onClick={handleIncrement}
              className="text-[18px] w-8 h-8 rounded-full text-white flex items-center justify-center"
            >
              +
            </button>
          </div>

          <div className="flex items-center">
            <PiCodesandboxLogoBold className="text-xl text-yellow-400" />
            <div className="text-xl font-bold text-white ml-2">
              {item.price.toLocaleString()}
            </div>
        </div>
      </div>

      <div className="w-full mt-5 px-5">
          <button className="w-full rounded-full bg-[#A2B950] py-2 text-lg font-semibold text-white">
            Buy
          </button>
        </div>
    </Modal>
  )
}

export default ItemDrawer
