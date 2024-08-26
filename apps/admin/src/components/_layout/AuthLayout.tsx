import React from "react"

interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Readonly<Props>) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-white p-4 md:p-8 xl:p-16">
      {children}
    </main>
  )
}
