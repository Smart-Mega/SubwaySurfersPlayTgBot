import React, { forwardRef, useCallback, useEffect, useState } from "react"

import { useDropzone } from "react-dropzone"

// import { IconPicture, IconUpload } from "../_icons"

import { Input } from "@repo/ui/components/ui/input"

interface Props {
  name?: string
  value?: File | string | null
  onChange?: Function
  readOnly?: boolean
}

function DocumentUpload({ name, value, onChange, readOnly }: Props, ref: any) {
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
    <div className="flex w-full items-center gap-4">
      <input {...getInputProps()} />

      {!file && (
        <div className="relative w-full" {...(readOnly ? {} : getRootProps())}>
          <Input readOnly placeholder="Browse file" className="cursor-pointer" />

          <div className="absolute right-[17.5px] top-[50%] translate-y-[-50%]">
            {/* <IconUpload className="text-default text-lg" /> */}
          </div>
        </div>
      )}

      {!!file && (
        <div
          className="flex cursor-pointer items-center justify-between gap-2"
          {...(readOnly ? {} : getRootProps())}
        >
          <div className="relative w-full">
            <Input readOnly />

            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-xl bg-[#C8C8C8]">
              {/* <IconPicture className="text-2xl text-white" /> */}
            </div>
          </div>

          {/* <IconUpload className="text-default text-lg" /> */}
        </div>
      )}
    </div>
  )
}

export default forwardRef(DocumentUpload)
