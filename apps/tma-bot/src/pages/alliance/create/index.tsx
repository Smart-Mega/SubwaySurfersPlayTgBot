import React, { Dispatch, SetStateAction, type FC } from "react"
import { toast } from "sonner"

import { Modal } from "@telegram-apps/telegram-ui"
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader"

import { CLIENT_MSG } from "@repo/i18n"

import { apiCreateAlliance } from "@/apis/allianceApi"

import BaseInput from "@/components/inputs/BaseInputs"
import BaseButton from "@/components/buttons/BaseButton"
import BaseErrorSpan from "@/components/spans/ErrorSpan"
import LoadingOverlay from "@/components/LoadingOverlay"

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AllianceCreate: FC<Props> = ({ open, setOpen }) => {

  const regExp = /(?:https?:\/\/)?(?:t\.me\/|t.me\/|@)([A-Za-z0-9_]+)/;

  const [allianceLink, setAllianceLink] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const onChangeInput = React.useCallback((e:React.ChangeEvent<HTMLInputElement>) => { 
    e.preventDefault()
    const value = e.target.value
    setErrorMessage('')
    setAllianceLink(value)
  }, [])
  
  const onClickJoinOrCreate = React.useCallback(() => {
    const isRegExp = regExp.test(allianceLink)
    if (!isRegExp) {
      return setErrorMessage(CLIENT_MSG.INVALID_VALUE)
    } else setErrorMessage('')
    // TODO: send api for joining or creating alliance to backend
    setLoading(true)
    apiCreateAlliance({ chat_id: allianceLink }).then(res => {
      console.log(res)
      if (res.status === 200) {
        toast.success('Created')
        setOpen(false)
      } else {
        toast.success(CLIENT_MSG.SOMETHING_WENT_WRONG)
      }
    }).catch(err => {
      console.error(err)
      toast.error('Failed')

    }).finally(() => {
      setLoading(false)
    })

  }, [allianceLink])

  return (
    <Modal
      className="z-[2000] bg-[--bg-color] h-[calc(100%-215px)] border-t-[1px] border-[#FFAB0A] drop-shadow-[0_2px_20px_rgba(255,171,10,0.7)]"
      open={open}
      onOpenChange={setOpen}
      header={<ModalHeader>Only iOS header</ModalHeader>}
      nested
    >
      <section className="alliance-create">
        <div className="mb-5 px-5 text-center text-xl text-[--text-color]">Join or Create Alliance</div>
        <div className="mb-5 px-5 text-center text-sm text-[--text-color-secondary]">
          <p>Enter a link to a public group</p>
          <p>or channel</p>
        </div>
        <div className="px-5 mb-5">
          <BaseInput
            type="text"
            name="Alliance link"
            id="alliance_link"
            placeholder="example @megatonpro"
            className="bg-[--disactive-color]"
            value={allianceLink}
            onChange={onChangeInput}
          />
          {errorMessage !== '' && <BaseErrorSpan errorMessage={errorMessage} />}
        </div>
        <div className="px-5">
          <BaseButton
            uppercase
            className="text-sm font-bold"
            onClick={onClickJoinOrCreate}
          >Join Or Create</BaseButton>
        </div>
      </section>
      {
        loading && <LoadingOverlay loading />
      }
    </Modal>
  )
}

export default AllianceCreate
