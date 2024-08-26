import React from 'react'
import { BaseDivProps } from 'src/types'

type Props = { borderWidth?: number; hideBorder?: boolean; gradientOpacity?: number } & BaseDivProps

function GradientWrraper({
  className,
  children,
  gradientOpacity = 1,
  ...others
}: Props) {
  return (
    <div className={'relative ' + className} {...others}>
      <div
        className='gradient-border pointer-events-none'
        style={
          {
            position: 'absolute',
            opacity: gradientOpacity,
          } as React.CSSProperties
        }
        />
      {children}
    </div>
  )
}

export default GradientWrraper
