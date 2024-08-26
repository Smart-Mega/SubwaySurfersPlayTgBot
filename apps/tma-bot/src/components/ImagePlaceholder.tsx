import React, { type FC, useState, useEffect } from "react"

import clsx from "clsx"

interface ImagePlaceholderProps {
  className?: string
  src: string
  alt?: string
  w?: number
  h?: number
  borderRadius?: string
}

const ImagePlaceholder: FC<ImagePlaceholderProps> = (props) => {
  const {
    className = "",
    src,
    alt = "Background Image",
    borderRadius = "rounded-none",
    w = 375,
    h = 375
  } = props

  const [isLoaded, setIsLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  const baseClasses = "absolute top-0 left-0 w-full h-full"
  const skeletonClasses = `bg-gray-300 animate-pulse ${borderRadius}`
  const imgClasses = `object-cover ${borderRadius}`

  return (
    <div
      className={clsx(className, "relative w-full")}
      style={{ paddingBottom: `${(h * 100) / w}%` }}
    >
      {!isLoaded && (
        <div className={`${baseClasses} ${skeletonClasses}`}></div>
      )}

      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        className={`${baseClasses} ${imgClasses} ${!isLoaded ? "hidden" : ""}`}
      />
    </div>
  )
}

export default ImagePlaceholder
