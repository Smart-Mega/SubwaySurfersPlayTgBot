import React from "react"

import { Oval } from "react-loader-spinner"

interface Props {
  loading?: boolean
  children?: React.ReactNode
}

export default function LoadingOverlay({ loading, children }: Readonly<Props>) {
  return (
    <>
      {children}

      {loading && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-white">
          <Oval visible={true} height="80" width="80" color="#08ECB3" secondaryColor="#08ECB3" />
        </div>
      )}
    </>
  )
}
