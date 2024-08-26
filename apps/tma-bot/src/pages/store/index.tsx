import React, { useEffect, useState, type FC } from "react"

import clsx from "clsx"
import { LuChevronDown } from "react-icons/lu"

import ImagePlaceholder from "@/components/ImagePlaceholder"
import PageLayout from "@/components/PageLayout"
import useShopStore from "@/stores/useShopStore"
import { parseItems, parseRobots } from "@/utils/parser"

import RobotCard from "./RobotCard"
import ItemCard from "./ItemCard"
import { BOT_ITEM_TYPES } from "@repo/util/bot.constant"

const Store: FC = () => {
  const tabs = ["Robot", "Items", "Assistant", "Boost"]

  const shopStore = useShopStore()
  const [activeTab, setActiveTab] = useState(tabs[0])

  const [robots, setRobots] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])

  const [sortOrder, setSortOrder] = useState<string>("asc")
  const [showSortMenu, setShowSortMenu] = useState(false)

  const initialize = () => {
    shopStore.getRobotsAction((newRobots) => {
      setRobots(parseRobots(newRobots))
    })

    shopStore.getItemsAction((newItems) => {
      setItems(parseItems(newItems))
    })
  }

  useEffect(() => {
    initialize()
  }, [])

  const handleSort = (order: string) => {
    setSortOrder(order)
    setShowSortMenu(false)
  }

  const sortedRobots = () => {
    return [...robots].sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price
    })
  }

  const sortedItems = () => {
    return [...items].sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price
    })
    .filter(
        (i) =>
          i.type !== BOT_ITEM_TYPES.Effect &&
          i.type !== BOT_ITEM_TYPES.Pet &&
          i.type !== BOT_ITEM_TYPES.Equipment
      )
  }

  return (
    <PageLayout>
      <section className="relative mb-[-16%]">
        <ImagePlaceholder
          className="w-full"
          src="images/store-bg.svg"
          alt="Background"
          w={375}
          h={338}
          borderRadius="rounded-t-[30px]"
        />

        <div className="absolute bottom-0 left-0 right-0 top-[50%] bg-[linear-gradient(_#0C0A0C00_0%,_#0C0A0C61_18%,_#0C0A0CCC_82%,_#0C0A0CFF_100%)]" />

        <div className="absolute left-0 right-0 top-[45%] flex flex-col">
          <h1 className="mb-2 text-center text-2xl font-semibold text-white">Mega Store</h1>
          <p className="w-[221px] mx-auto mb-6 text-center text-xs font-normal text-[#FFFFFFB3] leading-[13.44px] tracking-tight">Buy unique robots, items, and effects to develop and enhance your character</p>

          <div className="flex items-center justify-between px-5">
            <div className="flex items-center gap-5">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={clsx(
                    "text-sm font-bold",
                    activeTab === tab ? "text-white" : "text-white/50"
                  )}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative flex justify-between items-center gap-1">
              <button className="text-sm font-bold text-[#9F9F9F]" onClick={() => setShowSortMenu(!showSortMenu)}>Sort
              </button>
              <LuChevronDown className="text-sm font-bold text-[#9F9F9F]" />
              {showSortMenu && (
              <div className="absolute right-0 mt-9 w-40 bg-white rounded-md shadow-lg z-[100] select-none">
                <button 
                  onClick={() => handleSort("asc")} 
                  className={clsx("w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg")}
                >
                  Cheaper first
                </button>
                <button 
                  onClick={() => handleSort("desc")} 
                  className={clsx("w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg")}
                >
                  More expensive at first
                </button>
                </div>
              )} 
            </div>
          </div>
        </div>
      </section>

      {activeTab === tabs[0] && (
        <section className="z-10 mb-5 grid grid-cols-2 gap-2 px-5">
          {sortedRobots().map((r) => (
            <RobotCard key={r.id} robot={r} />
          ))}
        </section>
      )}

      {activeTab === tabs[1] && (
        <section className="z-10 mb-5 grid grid-cols-2 gap-2 px-5">
          {sortedItems().map((i) => (
              <ItemCard key={i.id} item={i} />
            ))}
        </section>
      )}

      {activeTab === tabs[2] && (
        <section className="z-10 mb-5 grid grid-cols-2 gap-2 px-5">
          {sortedItems()
            .filter((i) => i.type === BOT_ITEM_TYPES.Pet)
            .map((i) => (
              <ItemCard key={i.id} item={i} />
            ))}
        </section>
      )}

      {activeTab === tabs[3] && (
        <section className="z-10 mb-5 grid grid-cols-2 gap-2 px-5">
          {sortedItems()
            .filter((i) => i.type === BOT_ITEM_TYPES.Effect || i.type === BOT_ITEM_TYPES.Equipment)
            .map((i) => (
              <ItemCard key={i.id} item={i} />
            ))}
        </section>
      )}
    </PageLayout>
  )
}

export default Store
