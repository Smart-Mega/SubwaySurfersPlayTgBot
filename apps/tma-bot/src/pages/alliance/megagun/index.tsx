import React, { type FC } from "react"

import { useParams } from "react-router-dom"

import PageLayout from "@/components/PageLayout"

const AllianceMegagun: FC = () => {
  const { id: allianceId } = useParams()

  return <PageLayout>Megagun: {allianceId}</PageLayout>
}

export default AllianceMegagun
