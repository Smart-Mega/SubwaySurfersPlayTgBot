export const BOT_USER_STATUS = {
  ACTIVE: 1,
  BLOCKED: 2
}
export const BOT_USER_ONLINE_STATUS = {
  ONLINE: 1,
  OFFLINE: 0
}

export const BOT_ALLIANCE_TYPE = {
  OPEN: "open",
  PRIVATE: "private",
  INVITE_ONLY: "invite-only"
}

export const BOT_EXCHANGEABLE_POINT_TYPE = {
  JOIN_REWARD: {
    score: 1000,
    type: "Join Reward"
  }
}

export const BOT_REWARD_LIMIT_TIME = 10800

export const BOT_SCORE_TYPE = {
  JOIN_REWARD: {
    score: 1000,
    type: "Join Reward"
  },
  REFERRAL_REWARD: {
    score: 1000,
    type: "Refer Reward"
  },
  HOURLY_REWARD_INITIAL: {
    score: 0,
    type: "Hourly Reward"
  },
  HOURLY_REWARD: {
    score: 3600, // 1 reward per sec
    type: "Hourly Reward",
    unit: 3600 // 1 hour
  },
  DAILY_REWARD: {
    score: 50, // count of day * 50
    limit: 10, // limit 10 days
    type: "Daily Reward"
  },
  TASK_REWARD: {
    type: "Task Reward"
  }
}

export const BOT_ROBOT_OWNER_TYPES = {
  Default: "default",
  Platform: "platform",
  User: "user"
}

export const BOT_ITEM_OWNER_TYPES = {
  Default: "default",
  Platform: "platform",
  User: "user"
}

export const BOT_ITEM_TYPES = {
  Weapon: "weapon",
  Armor: "armor",
  Shield: "shield",
  Equipment: "equipment",
  Effect: "effect",
  Pet: "pet"
}

export const BOT_ROBOT_ITEM_POSITION = {
  ArmLeft: "arm-left",
  ArmRight: "arm-right",
  Body: "body",
  HeadLeft: "head-left",
  HeadRight: "head-right",
  Top: "top",
  Pet: "pet"
}

export const BOT_ROBOT_LEVEL_SCORES = [
  100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200, 102400
]

export const BOT_ROBOT_ATTRIBUTES = {
  Attack: "attack",
  AttackSpeed: "attack-speed",
  Health: "health",
  Energy: "energy",
  Armor: "armor",
  EnergyShield: "energy-shield"
}

export const BOT_ITEM_ATTRIBUTES = {
  Attack: "attack",
  AttackSpeed: "attack-speed",
  Strength: "strength",
  Energy: "energy",
  HealthRecovery: "health-recovery",
  CoolDownTime: "cool-down-time",
  ShieldEnergy: "shield-energy",
  Armor: "armor"
}
