import React from 'react'

interface BaseSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  spanClass?: string
  errorMessage?: string
}

const BaseErrorSpan: React.FC<BaseSpanProps> = ({ spanClass, errorMessage, ...rest }) => {
  return (
    <span className={`text-red-500 text-[14px] ml-[0.5rem] ${spanClass}`} {...rest}>
      {errorMessage}
    </span>
  )
}

export default BaseErrorSpan
