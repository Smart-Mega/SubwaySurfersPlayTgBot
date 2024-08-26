import React, { forwardRef, useCallback, useEffect, useState } from "react"

import { useDropzone } from "react-dropzone"

// import { IconPicture, IconUpload } from "../_icons"

import { Button } from "@repo/ui/components/ui/button"

interface Props {
  name?: string
  value?: File | string | null
  onChange?: Function
  readOnly?: boolean
}

function ImageUpload({ name, value, onChange, readOnly }: Props, ref: any) {
  const [file, setFile] = useState<File | string | null>(value ?? null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (typeof onChange === "function") {
        onChange(acceptedFiles[0])
      }

      setFile(acceptedFiles[0])
    },
    [file, onChange]
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": []
    },
    maxSize: 5 * 1024 * 1024,
    maxFiles: 1,
    onDrop
  })

  useEffect(() => {
    setFile(value ?? null)
  }, [value])

  return (
    <div className="flex items-center gap-4">
      <input {...getInputProps()} />

      {!file && (
        <div
          className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-[#C8C8C8]"
          {...(readOnly ? {} : getRootProps())}
        >
          {/* <IconPicture className="text-2xl text-white" /> */}
        </div>
      )}

      {!!file && (
        <img
          className="h-16 w-16 cursor-pointer rounded-full object-cover"
          src={typeof file === "object" ? URL.createObjectURL(file) : file}
          alt="PlaceHolder"
          {...(readOnly ? {} : getRootProps())}
        />
      )}

      {!readOnly && (
        <Button
          type="button"
          className="text-default flex h-auto items-center gap-1.5 border border-[#868194] bg-white p-3 font-semibold hover:bg-transparent"
          {...(readOnly ? {} : getRootProps())}
        >
          {/* <IconUpload /> */}
          Upload image
        </Button>
      )}
    </div>
  )
}

export default forwardRef(ImageUpload)
