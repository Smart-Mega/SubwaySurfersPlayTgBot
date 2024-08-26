import React, { useEffect, useState, type FC } from "react"

import ImagePlaceholder from "@/components/ImagePlaceholder"
import { useParams } from "react-router-dom"
import useAllianceStore from "@/stores/useAllianceStore"
import PageLayout from "@/components/PageLayout"

const AllianceArena: FC = () => {
  const { id: allianceId } = useParams()

  const store = useAllianceStore()

  const [data, setData] = useState<any>({})

  const items = [
    {
      img: "items/arena/recovery-hp.svg",
      name: "Recovery XP"
    },
    {
      img: "items/arena/attack-speed.svg",
      name: "Attack speed"
    }
  ]

  const initialize = () => {
    store.getAction(Number(allianceId), (newData) => {
      setData(newData)
    })
  }

  const handleStartClick = () => {}

  useEffect(() => {
    initialize()
  }, [])

  return (
    <PageLayout>
      <section className="relative mb-4">
        <ImagePlaceholder
          className="w-full"
          src="images/alliance-arena-bg.svg"
          alt="Background"
          w={375}
          h={303}
          borderRadius="rounded-t-[30px]"
        />

        <div className="absolute bottom-1 left-0 right-0 text-center text-xs font-normal text-white">
          Click the "Start" button if your clan is ready for battle
        </div>

        <div className="absolute bottom-10 left-5 flex w-[35vw] flex-col">
          <div className="relative mb-16 h-2 w-full bg-[#FFFFFF40]">
            <div className="absolute bottom-0 left-0 top-0 bg-[#31C2C3]" style={{ width: "70%" }} />
          </div>

          <span className="text-left">{data.name}</span>
        </div>

        <div className="absolute bottom-32 left-0 right-0 text-center text-[8vw] font-bold text-white">
          GO
        </div>

        <div className="absolute bottom-10 right-5 flex w-[35vw] flex-col">
          <div className="relative mb-16 h-2 w-full bg-[#FFFFFF40]">
            <div
              className="absolute bottom-0 right-0 top-0 bg-[#31C2C3]"
              style={{ width: "30%" }}
            />
          </div>

          <span className="text-right">Alliance 3</span>
        </div>
      </section>

      <section className="mb-4 px-5">
        <button
          className="h-12 w-full rounded-3xl bg-[linear-gradient(_#F181E6_0%,_#3CF9FB_100%)] text-base font-bold text-white"
          onClick={handleStartClick}
        >
          Start
        </button>
      </section>

      <section className="mb-5 px-5">
        <div className="h-[1px] w-full border-t border-t-[#4F4F4F66]" />
      </section>

      <section className="mb-5 flex flex-col px-5">
        <h2 className="mb-4 text-white">Effects</h2>
        <p className="mb-5 text-xs font-normal text-[#5E5E5E]">
          Here you will see all the effects available for use for the clan
        </p>

        <div className="flex items-center gap-2">
          {items.map((item) => (
            <div key={item.name} className="flex w-16 flex-col gap-1.5">
              <img className="h-16 w-16" src={item.img} alt={item.name} />
              <span className="text-center text-xs font-bold text-white">{item.name}</span>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}

export default AllianceArena
