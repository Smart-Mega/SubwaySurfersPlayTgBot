import React from 'react'
import { BaseInputProps } from '@/types'

const BaseInput: React.FC<BaseInputProps> = ({ className, ...rest }) => {
  return (
    <input
      className={`w-full h-10 rounded-full border-0 outline-0 placeholder-gray-500 px-5 py-2 text-sm text-white ${className}`}
      {...rest}
    />
  )
}

export default BaseInput
