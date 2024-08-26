import React from "react"

import { Link } from "react-router-dom"

export default function Logo() {
  return (
    <Link to="/">
      <img className="h-10 min-h-10 w-[240px] min-w-[240px]" src="/logo.png" alt="Logo" />
    </Link>
  )
}
