import React from "react"

import clsx from "clsx"

import { IStickyShortcutItem } from "@/types/interface"

interface Props {
  width?: number
  items: IStickyShortcutItem[]
}

export default function StickyShortcut(props: Readonly<Props>) {
  const { width, items } = props

  return (
    <div
      className="bg-background sticky top-24 hidden rounded-xl border p-6 xl:inline-block"
      style={{
        width,
        height: 50 + 20 * items.length + 16 * (items.length - 1)
      }}
    >
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-4">
            <a
              className={clsx(
                "flex items-center gap-2 text-sm",
                item.inView ? "text-main" : "text-default"
              )}
              href={`#${item.id}`}
            >
              <div
                className={clsx(
                  "h-2 w-2 rounded-full",
                  item.inView ? "bg-primary" : "bg-[#ECECEC]"
                )}
              />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
