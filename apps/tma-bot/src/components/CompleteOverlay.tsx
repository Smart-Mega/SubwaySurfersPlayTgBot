import React from "react"
import { IconDone } from "./icons"

interface Props {
  isSuccess?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

export default function CompleteOverlay({ isSuccess, onClose, children }: Readonly<Props>) {
  return (
    <>
      {children}

      {isSuccess && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
          <IconDone/>
          {/* <Oval visible={true} height="80" width="80" color="#3CF9FB" secondaryColor="#3CF9FB" /> */}
        </div>
      )}
    </>
  )
}
