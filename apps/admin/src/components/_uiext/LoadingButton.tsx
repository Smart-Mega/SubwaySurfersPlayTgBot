import React from "react"

import clsx from "clsx"
import { Oval } from "react-loader-spinner"

import { Button } from "@repo/ui/components/ui/button"

interface Props {
  children?: React.ReactNode
  className?: string
  type?: "button" | "submit" | "reset"
  loading?: boolean

  onClick?: React.MouseEventHandler
}

export default function LoadingButton(props: Readonly<Props>) {
  const { children, className, type, loading = false, onClick } = props

  return (
    <Button
      disabled={loading}
      className={clsx("h-auto w-full rounded-xl py-4 text-sm font-semibold text-white", className)}
      type={type ?? "button"}
      onClick={onClick}
    >
      {loading && (
        <Oval
          visible={true}
          height={20}
          width={20}
          strokeWidth={8}
          color="#FFF"
          secondaryColor="#eee"
        />
      )}

      {!loading && children}
    </Button>
  )
}
