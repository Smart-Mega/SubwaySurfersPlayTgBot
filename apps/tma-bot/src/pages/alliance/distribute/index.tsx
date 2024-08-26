import React, { type FC } from "react"

import { useParams } from "react-router-dom"

import PageLayout from "@/components/PageLayout"

const AllianceDistribute: FC = () => {
  const { id: allianceId } = useParams()

  return <PageLayout>Distribute: {allianceId}</PageLayout>
}

export default AllianceDistribute
