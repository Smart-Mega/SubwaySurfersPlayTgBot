import React from "react"

import { Oval, TailSpin } from "react-loader-spinner"

interface Props {
  loading?: boolean
  children?: React.ReactNode
}

export default function LoadingOverlay({ loading, children }: Readonly<Props>) {
  return (
    <>
      {children}

      {loading && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <TailSpin visible={true} height="80" width="80" color="#3CF9FB"/>
          {/* <Oval visible={true} height="80" width="80" color="#3CF9FB" secondaryColor="#3CF9FB" /> */}
        </div>
      )}
    </>
  )
}
