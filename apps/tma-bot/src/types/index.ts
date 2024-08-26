import { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from "react"

export type BaseInputProps = InputHTMLAttributes<HTMLInputElement>

export type BaseDivProps = HTMLAttributes<HTMLDivElement>

export type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export type CompletedObjectivesRequestDataType = {
  objective_id: number
  objective_type: string
  objective_reward: number
}

export type CompletedObjectivesResponseDataType = {
  id: number
  user_id: number
  task_type: string
  task_id: number
  created_at: string
  updated_at: string
}

export type DailyRewardDataType = {
  id: number
  user_id: number
  day: number
  reward: number
  created_at: string
  updated_at: string
}

export type ObjectivesResponseDataType = {
  id: number
  type: string
  title: string
  description: string
  icon: string
  link?: string
  reward: number
  order: number
  created_at: string
  updated_at: string
}

export type UserDataType = {
  created_at: string
  deleted_at: string
  exchangeable_point: string
  hourly_rewarded_at: string
  id: number
  referral_code: string
  score: string
  status: number
  tg_avatar: string
  tg_first_name: string
  tg_id: string
  tg_last_name: string
  tg_username: string
  updated_at: string
  wallet_private_key: string
  wallet_public_key: string
}

export type AllianceMemberDataType = {
  alliance_id: number
  created_at: string
  deleted_at: string
  id: number
  is_leader: boolean
  updated_at: string
  user_id: number
  user: UserDataType
}

export type AllianceDataType = {
  id: number
  name: string
  symbol: string
  description: string
  score: string
  alliance_type: string
  member_count: 1
  members: AllianceMemberDataType[]
  rank?: string
  created_at: string
  updated_at: string
  deleted_at: string
}