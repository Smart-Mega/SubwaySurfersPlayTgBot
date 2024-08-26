import clsx from "clsx"
import React from "react"
import { BaseButtonProps } from "@/types"
import GradientWrraper from "../GradientWrapper"

export type Props = {
  name?: string
  uppercase?: boolean
} & BaseButtonProps

function BaseButton({
  className,
  children,
  uppercase = false,
  disabled,
  name,
  ...others
}: Props) {
  return (
    <button
      name={name}
      className={clsx(`gradient-button flex items-center text-white justify-center w-full h-11 rounded-full px-5 py-2 ${className}`, {
        'opacity-30': disabled,
        uppercase: uppercase
      })}
      disabled={disabled}
      {...others}
    >
      {children}
    </button>
  )
}

export default BaseButton