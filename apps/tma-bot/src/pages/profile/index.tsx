import React, { type FC, useEffect, useState } from "react"

import { LuCopy } from "react-icons/lu"

import PageLayout from "@/components/PageLayout"
import ImagePlaceholder from "@/components/ImagePlaceholder"
import useAuthStore from "@/stores/useAuthStore"

import { TonConnectButton } from "@tonconnect/ui-react"
import useReferStore from "@/stores/useReferStore.ts"

const botURL = import.meta.env.VITE_BOT_LINK || "https://t.me/megaton_probot"

const Profile: FC = () => {
  const authStore = useAuthStore()
  const referStore = useReferStore()

  const [notification, setNotification] = useState<string | null>(null)

  const handleCopyClick = () => {
    if (authStore.user?.referral_code) {
      navigator.clipboard.writeText(authStore.user.referral_code)
        .then(() => {
          setNotification("Referral link is copied")
          setTimeout(() => {
            setNotification(null)
          }, 2000);
        })
        .catch(err => {
          console.error("Failed to copy ref link: ", err)
        })
    }
  }

  const handleSendClick = () => {
    const referralCode = authStore.user?.referral_code ?? ""
    const message = `Come join me on SubwaySurfersPlay and start earning together! Click my invite link to get started.`
    const referLink = `${botURL}?start=${referralCode}`
    const telegramUrl = `https://t.me/share/url?url=${referLink}&&text=${encodeURIComponent(message)}`
    window.open(telegramUrl, '_blank')
  }

  useEffect(() => {
    referStore.refresh().then()
  }, [])

  return (
    <PageLayout>
      <section className="relative mb-4">
        <ImagePlaceholder
          className="w-full"
          src="images/profile-bg.svg"
          alt="Background"
          w={375}
          h={293}
          borderRadius="rounded-t-[30px]"
        />

        <div className="absolute left-0 right-0 top-[55%] px-5">
          <TonConnectButton
            className="rounded-full m-auto"
          />
        </div>

        <div className="absolute left-0 right-0 top-[75%] text-center text-2xl font-semibold text-white">
          Invite Friends and Earn
        </div>

        <div className="absolute bottom-2 left-0 right-0 text-center text-xs font-medium text-white">
          Get a 10% bonus on all points your friends collect
        </div>
      </section>

      <section className="mb-4 flex w-full flex-col gap-3 px-5">
        {notification && (
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <div className="rounded bg-green-500 px-4 py-2 text-white">
              {notification}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between gap-2 rounded-full bg-[#1C161C] px-4 py-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleCopyClick}>
            <span className="text-white font-semibold">{authStore.user?.referral_code ?? ""}</span>
            <LuCopy className="text-lg text-[#3CF9FB]" />
          </div>
          <button className="rounded-full bg-[#D9D9D9] px-4 py-2 text-base font-semibold text-black" onClick={handleSendClick}>
            Send
          </button>
        </div>
      </section>

      <section className="flex w-full flex-1 flex-col px-5">
        <div className="grid grid-cols-[1fr_50px] items-center">
          <div className="mb-1 text-xs text-[#9F9F9F]">You referred</div>
          <div className="mb-1 text-xs text-[#9F9F9F]">Rewards</div>

          <div className="mb-4 text-base font-medium text-white">{referStore.refer?.total}</div>
          <div className="mb-4 text-base font-medium text-white">{referStore.refer?.rewards}</div>

          <div className="col-span-2 mb-4 h-[1px] w-full border-t border-dashed border-[#4F4F4F]" />
        </div>
        {
          Number(referStore.refer?.total) > 0 ? (
            <>
              {
                referStore.refer?.data?.map((refer:any, index:number) => (
                  <div key={index} className="grid grid-cols-[1fr_50px] items-center">
                    <div className="mb-4 text-sm font-medium text-[#9F9F9F]">{refer?.user?.tg_username}</div>
                    <div className="mb-4 text-sm font-medium text-[#9F9F9F]">{refer?.user?.score}</div>
                  </div>
                ))
              }
            </>
          ) : (
            <>
              <div className="mb-4 text-sm font-medium text-[#9F9F9F]">No Data</div>
            </>
          )
        }
      </section>
    </PageLayout>
  )
}

export default Profile
