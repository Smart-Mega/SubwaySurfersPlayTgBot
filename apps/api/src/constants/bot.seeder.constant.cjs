// const { fakerRU: faker } = require("@faker-js/faker")
const { faker } = require("@faker-js/faker/locale/ru")
const { differenceInSeconds } = require("date-fns")
const ShortUniqueId = require("short-unique-id")

/**
 * Constant
 */
const FAKE_USER_COUNT = 0
const FAKE_ALLIANCE_COUNT = 0
const FAKE_PLATFORM_ROBOT_COUNT = 10

const BOT_USER_STATUS = {
  ACTIVE: 1,
  BLOCKED: 2
}

const BOT_SCORE_TYPE = {
  JOIN_REWARD: {
    score: 1000,
    type: "Join Reward"
  },
  HOURLY_REWARD_INITIAL: {
    score: 0,
    type: "Hourly Reward"
  },
  HOURLY_REWARD: {
    score: 10,
    type: "Hourly Reward"
  }
}

const BOT_ALLIANCE_TYPE = {
  OPEN: "open",
  PRIVATE: "private",
  INVITE_ONLY: "invite-only"
}

const BOT_ROBOT_ATTRIBUTES = {
  Attack: "attack",
  AttackSpeed: "attack-speed",
  Health: "health",
  Energy: "energy",
  Armor: "armor",
  EnergyShield: "energy-shield"
}

const BOT_ROBOT_OWNER_TYPES = {
  Default: "default",
  Platform: "platform",
  User: "user"
}

const BOT_ITEM_ATTRIBUTES = {
  Attack: "attack",
  AttackSpeed: "attack-speed",
  Strength: "strength",
  Energy: "energy",
  HealthRecovery: "health-recovery",
  CoolDownTime: "cool-down-time",
  ShieldEnergy: "shield-energy",
  Armor: "armor"
}

const BOT_ITEM_OWNER_TYPES = {
  Default: "default",
  Platform: "platform",
  User: "user"
}

const BOT_ITEM_TYPES = {
  Weapon: "weapon",
  Armor: "armor",
  Shield: "shield",
  Equipment: "equipment",
  Effect: "effect",
  Pet: "pet"
}
/**
 * Fake users
 */
const fakeUsers = []
const fakeScoreHistories = []
for (let i = 0; i < FAKE_USER_COUNT; i++) {
  const created_at = faker.date.between({
    from: "2024-06-01T00:00:00.000Z",
    to: new Date()
  })

  const secondsDifference = differenceInSeconds(new Date(), created_at)
  const countHourlyReward = Math.floor(secondsDifference / 3600)

  const uid = new ShortUniqueId({ dictionary: "alpha_upper" })

  fakeUsers.push({
    id: i + 1,
    tg_id: faker.number.bigInt({ min: 10000000000, max: 100000000000 }),
    tg_avatar: faker.image.avatar(),
    tg_username: faker.internet.userName(),
    tg_first_name: faker.person.firstName(),
    tg_last_name: faker.person.lastName(),
    wallet_private_key: "",
    wallet_public_key: "",
    exchangeable_point:
      BOT_SCORE_TYPE.JOIN_REWARD.score +
      BOT_SCORE_TYPE.HOURLY_REWARD_INITIAL.score +
      BOT_SCORE_TYPE.HOURLY_REWARD.score * countHourlyReward,
    score: BOT_SCORE_TYPE.JOIN_REWARD.score + BOT_SCORE_TYPE.HOURLY_REWARD_INITIAL.score,
    referral_code: uid.rnd(6),
    status: BOT_USER_STATUS.ACTIVE,
    created_at,
    updated_at: created_at,
    hourly_rewarded_at: created_at
  })

  fakeScoreHistories.push({
    user_id: i + 1,
    score: BOT_SCORE_TYPE.JOIN_REWARD.score,
    type: BOT_SCORE_TYPE.JOIN_REWARD.type,
    created_at,
    updated_at: created_at
  })

  fakeScoreHistories.push({
    user_id: i + 1,
    score: BOT_SCORE_TYPE.HOURLY_REWARD_INITIAL.score,
    type: BOT_SCORE_TYPE.HOURLY_REWARD_INITIAL.type,
    created_at,
    updated_at: created_at
  })
}

/**
 * Fake alliances
 */
const fakeAlliances = []
for (let i = 0; i < FAKE_ALLIANCE_COUNT; i++) {
  fakeAlliances.push({
    id: i + 1,
    name: faker.company.name(),
    symbol: faker.image.avatar(),
    description: faker.company.buzzPhrase(),
    alliance_type: BOT_ALLIANCE_TYPE.OPEN,
    member_count: 0,
    score: 0
  })
}

const fakeAllianceMembers = []
let totalMemberCount = 0
for (let i = 0; i < FAKE_ALLIANCE_COUNT; i++) {
  const memberCount = faker.number.int({ min: 50, max: 100 })
  for (let j = 0; j < memberCount; j++) {
    totalMemberCount++
    fakeAllianceMembers.push({
      alliance_id: i + 1,
      user_id: totalMemberCount,
      is_leader: j === 0
    })
  }
}

/**
 * Default robots
 */
const defaultRobots = []
const defaultRobotsAttributes = []

defaultRobots.push({
  id: 1,
  owner_type: BOT_ROBOT_OWNER_TYPES.Default,
  user_id: null,
  image: "robots/default.svg",
  name: "SubwaySurfersPlay",
  score: 0,
  level: 1,
  price: 0,
  is_sale: false,
  is_selected: false
})

defaultRobotsAttributes.push(
  {
    robot_id: 1,
    attribute_name: BOT_ROBOT_ATTRIBUTES.Attack,
    attribute_value: 50
  },
  {
    robot_id: 1,
    attribute_name: BOT_ROBOT_ATTRIBUTES.AttackSpeed,
    attribute_value: 10
  },
  {
    robot_id: 1,
    attribute_name: BOT_ROBOT_ATTRIBUTES.Health,
    attribute_value: 2000
  },
  {
    robot_id: 1,
    attribute_name: BOT_ROBOT_ATTRIBUTES.Energy,
    attribute_value: 100
  },
  {
    robot_id: 1,
    attribute_name: BOT_ROBOT_ATTRIBUTES.Armor,
    attribute_value: 5
  },
  {
    robot_id: 1,
    attribute_name: BOT_ROBOT_ATTRIBUTES.EnergyShield,
    attribute_value: 0
  }
)

/**
 * Platform robots
 */
const platformRobots = []
const platformRobotsAttributes = []

for (let i = 0; i < FAKE_PLATFORM_ROBOT_COUNT; i++) {
  platformRobots.push({
    id: 2 + i,
    owner_type: BOT_ROBOT_OWNER_TYPES.Platform,
    user_id: null,
    image: `robots/platform-${(i + 1).toString().padStart(2, "0")}.svg`,
    name: faker.commerce.productName(),
    score: 0,
    level: 1 + i,
    price: 0.5 * (i + 1),
    is_sale: true,
    is_selected: false
  })
  platformRobotsAttributes.push(
    {
      robot_id: 2 + i,
      attribute_name: BOT_ROBOT_ATTRIBUTES.Attack,
      attribute_value: 50 * (i + 1)
    },
    {
      robot_id: 2 + i,
      attribute_name: BOT_ROBOT_ATTRIBUTES.AttackSpeed,
      attribute_value: Math.round((10 - i * 0.3) * 100) / 100
    },
    {
      robot_id: 2 + i,
      attribute_name: BOT_ROBOT_ATTRIBUTES.Health,
      attribute_value: 2000 * (i + 1)
    },
    {
      robot_id: 2 + i,
      attribute_name: BOT_ROBOT_ATTRIBUTES.Energy,
      attribute_value: 100 + 10 * i
    },
    {
      robot_id: 2 + i,
      attribute_name: BOT_ROBOT_ATTRIBUTES.Armor,
      attribute_value: 5 * (i + 1)
    },
    {
      robot_id: 2 + i,
      attribute_name: BOT_ROBOT_ATTRIBUTES.EnergyShield,
      attribute_value: 2 * i
    }
  )
}

/**
 * Default items
 */
const defaultItems = []
const defaultItemAttributes = []

defaultItems.push({
  id: 1,
  owner_type: BOT_ITEM_OWNER_TYPES.Default,
  user_id: null,
  image: "items/weapon_rifle.svg",
  name: "Rifle",
  price: 0,
  quantity: 1,
  equipped_quantity: 0,
  sale_quantity: 0,
  type: BOT_ITEM_TYPES.Weapon,
  is_sale: false
})
defaultItemAttributes.push(
  {
    item_id: 1,
    attribute_name: BOT_ITEM_ATTRIBUTES.Attack,
    attribute_value: 85
  },
  {
    item_id: 1,
    attribute_name: BOT_ITEM_ATTRIBUTES.AttackSpeed,
    attribute_value: 0.9
  },
  {
    item_id: 1,
    attribute_name: BOT_ITEM_ATTRIBUTES.Strength,
    attribute_value: 120
  },
  {
    item_id: 1,
    attribute_name: BOT_ITEM_ATTRIBUTES.Energy,
    attribute_value: 25
  }
)

defaultItems.push({
  id: 2,
  owner_type: BOT_ITEM_OWNER_TYPES.Default,
  user_id: null,
  image: "items/weapon_rocket.svg",
  name: "Rocket",
  price: 0,
  quantity: 1,
  equipped_quantity: 0,
  sale_quantity: 0,
  type: BOT_ITEM_TYPES.Weapon,
  is_sale: false
})
defaultItemAttributes.push(
  {
    item_id: 2,
    attribute_name: BOT_ITEM_ATTRIBUTES.Attack,
    attribute_value: 115
  },
  {
    item_id: 2,
    attribute_name: BOT_ITEM_ATTRIBUTES.AttackSpeed,
    attribute_value: 0.4
  },
  {
    item_id: 2,
    attribute_name: BOT_ITEM_ATTRIBUTES.Strength,
    attribute_value: 220
  },
  {
    item_id: 2,
    attribute_name: BOT_ITEM_ATTRIBUTES.Energy,
    attribute_value: 15
  }
)

defaultItems.push({
  id: 3,
  owner_type: BOT_ITEM_OWNER_TYPES.Default,
  user_id: null,
  image: "items/weapon_laser.svg",
  name: "Laser",
  price: 0,
  quantity: 1,
  equipped_quantity: 0,
  sale_quantity: 0,
  type: BOT_ITEM_TYPES.Weapon,
  is_sale: false
})
defaultItemAttributes.push(
  {
    item_id: 3,
    attribute_name: BOT_ITEM_ATTRIBUTES.Attack,
    attribute_value: 105
  },
  {
    item_id: 3,
    attribute_name: BOT_ITEM_ATTRIBUTES.AttackSpeed,
    attribute_value: 0.8
  },
  {
    item_id: 3,
    attribute_name: BOT_ITEM_ATTRIBUTES.Strength,
    attribute_value: 100
  },
  {
    item_id: 3,
    attribute_name: BOT_ITEM_ATTRIBUTES.Energy,
    attribute_value: 60
  }
)

defaultItems.push({
  id: 4,
  owner_type: BOT_ITEM_OWNER_TYPES.Default,
  user_id: null,
  image: "items/effect_1st-aid.svg",
  name: "First-aid kit",
  price: 0,
  quantity: 1,
  equipped_quantity: 0,
  sale_quantity: 0,
  type: BOT_ITEM_TYPES.Effect,
  is_sale: false
})
defaultItemAttributes.push(
  {
    item_id: 4,
    attribute_name: BOT_ITEM_ATTRIBUTES.HealthRecovery,
    attribute_value: 300
  },
  {
    item_id: 4,
    attribute_name: BOT_ITEM_ATTRIBUTES.CoolDownTime,
    attribute_value: 7
  }
)

defaultItems.push({
  id: 5,
  owner_type: BOT_ITEM_OWNER_TYPES.Default,
  user_id: null,
  image: "items/shield_galaxy.svg",
  name: "Galaxy",
  price: 0,
  quantity: 1,
  equipped_quantity: 0,
  sale_quantity: 0,
  type: BOT_ITEM_TYPES.Shield,
  is_sale: false
})
defaultItemAttributes.push(
  {
    item_id: 5,
    attribute_name: BOT_ITEM_ATTRIBUTES.ShieldEnergy,
    attribute_value: 200
  },
  {
    item_id: 5,
    attribute_name: BOT_ITEM_ATTRIBUTES.Strength,
    attribute_value: 270
  },
  {
    item_id: 5,
    attribute_name: BOT_ITEM_ATTRIBUTES.Energy,
    attribute_value: 30
  }
)

defaultItems.push({
  id: 6,
  owner_type: BOT_ITEM_OWNER_TYPES.Default,
  user_id: null,
  image: "items/equipment_generator.svg",
  name: "Generator",
  price: 0,
  quantity: 1,
  equipped_quantity: 0,
  sale_quantity: 0,
  type: BOT_ITEM_TYPES.Equipment,
  is_sale: false
})
defaultItemAttributes.push(
  {
    item_id: 6,
    attribute_name: BOT_ITEM_ATTRIBUTES.Energy,
    attribute_value: 400
  },
  {
    item_id: 6,
    attribute_name: BOT_ITEM_ATTRIBUTES.Strength,
    attribute_value: 200
  }
)

defaultItems.push({
  id: 7,
  owner_type: BOT_ITEM_OWNER_TYPES.Default,
  user_id: null,
  image: "items/armor_nomad.svg",
  name: "Nomad",
  price: 0,
  quantity: 1,
  equipped_quantity: 0,
  sale_quantity: 0,
  type: BOT_ITEM_TYPES.Armor,
  is_sale: false
})
defaultItemAttributes.push(
  {
    item_id: 7,
    attribute_name: BOT_ITEM_ATTRIBUTES.Armor,
    attribute_value: 400
  },
  {
    item_id: 7,
    attribute_name: BOT_ITEM_ATTRIBUTES.Energy,
    attribute_value: 100
  },
  {
    item_id: 7,
    attribute_name: BOT_ITEM_ATTRIBUTES.Strength,
    attribute_value: 1000
  }
)

/**
 * Platform items
 */
const platformItems = []
const platformItemAttributes = []

platformItems.push({
  id: 8,
  owner_type: BOT_ITEM_OWNER_TYPES.Platform,
  user_id: null,
  image: "items/weapon_rifle.svg",
  name: "Rifle",
  price: 0.1,
  quantity: 1,
  equipped_quantity: 0,
  sale_quantity: 1,
  type: BOT_ITEM_TYPES.Weapon,
  is_sale: true
})
platformItemAttributes.push(
  {
    item_id: 8,
    attribute_name: BOT_ITEM_ATTRIBUTES.Attack,
    attribute_value: 85
  },
  {
    item_id: 8,
    attribute_name: BOT_ITEM_ATTRIBUTES.AttackSpeed,
    attribute_value: 0.9
  },
  {
    item_id: 8,
    attribute_name: BOT_ITEM_ATTRIBUTES.Strength,
    attribute_value: 120
  },
  {
    item_id: 8,
    attribute_name: BOT_ITEM_ATTRIBUTES.Energy,
    attribute_value: 25
  }
)

platformItems.push({
  id: 9,
  owner_type: BOT_ITEM_OWNER_TYPES.Platform,
  user_id: null,
  image: "items/weapon_rocket.svg",
  name: "Rocket",
  price: 0.1,
  quantity: 1,
  equipped_quantity: 0,
  sale_quantity: 1,
  type: BOT_ITEM_TYPES.Weapon,
  is_sale: true
})
platformItemAttributes.push(
  {
    item_id: 9,
    attribute_name: BOT_ITEM_ATTRIBUTES.Attack,
    attribute_value: 115
  },
  {
    item_id: 9,
    attribute_name: BOT_ITEM_ATTRIBUTES.AttackSpeed,
    attribute_value: 0.4
  },
  {
    item_id: 9,
    attribute_name: BOT_ITEM_ATTRIBUTES.Strength,
    attribute_value: 220
  },
  {
    item_id: 9,
    attribute_name: BOT_ITEM_ATTRIBUTES.Energy,
    attribute_value: 15
  }
)

platformItems.push({
  id: 10,
  owner_type: BOT_ITEM_OWNER_TYPES.Platform,
  user_id: null,
  image: "items/weapon_laser.svg",
  name: "Laser",
  price: 0.1,
  quantity: 1,
  equipped_quantity: 0,
  sale_quantity: 1,
  type: BOT_ITEM_TYPES.Weapon,
  is_sale: true
})
platformItemAttributes.push(
  {
    item_id: 10,
    attribute_name: BOT_ITEM_ATTRIBUTES.Attack,
    attribute_value: 105
  },
  {
    item_id: 10,
    attribute_name: BOT_ITEM_ATTRIBUTES.AttackSpeed,
    attribute_value: 0.8
  },
  {
    item_id: 10,
    attribute_name: BOT_ITEM_ATTRIBUTES.Strength,
    attribute_value: 100
  },
  {
    item_id: 10,
    attribute_name: BOT_ITEM_ATTRIBUTES.Energy,
    attribute_value: 60
  }
)

platformItems.push({
  id: 11,
  owner_type: BOT_ITEM_OWNER_TYPES.Platform,
  user_id: null,
  image: "items/effect_1st-aid.svg",
  name: "First-aid kit",
  price: 0.2,
  quantity: 1,
  equipped_quantity: 0,
  sale_quantity: 1,
  type: BOT_ITEM_TYPES.Effect,
  is_sale: true
})
platformItemAttributes.push(
  {
    item_id: 11,
    attribute_name: BOT_ITEM_ATTRIBUTES.HealthRecovery,
    attribute_value: 300
  },
  {
    item_id: 11,
    attribute_name: BOT_ITEM_ATTRIBUTES.CoolDownTime,
    attribute_value: 7
  }
)

platformItems.push({
  id: 12,
  owner_type: BOT_ITEM_OWNER_TYPES.Platform,
  user_id: null,
  image: "items/shield_galaxy.svg",
  name: "Galaxy",
  price: 0.1,
  quantity: 1,
  equipped_quantity: 0,
  sale_quantity: 1,
  type: BOT_ITEM_TYPES.Shield,
  is_sale: true
})
defaultItemAttributes.push(
  {
    item_id: 12,
    attribute_name: BOT_ITEM_ATTRIBUTES.ShieldEnergy,
    attribute_value: 200
  },
  {
    item_id: 12,
    attribute_name: BOT_ITEM_ATTRIBUTES.Strength,
    attribute_value: 270
  },
  {
    item_id: 12,
    attribute_name: BOT_ITEM_ATTRIBUTES.Energy,
    attribute_value: 30
  }
)

platformItems.push({
  id: 13,
  owner_type: BOT_ITEM_OWNER_TYPES.Platform,
  user_id: null,
  image: "items/equipment_generator.svg",
  name: "Generator",
  price: 0.2,
  quantity: 1,
  equipped_quantity: 0,
  sale_quantity: 1,
  type: BOT_ITEM_TYPES.Equipment,
  is_sale: true
})
platformItemAttributes.push(
  {
    item_id: 13,
    attribute_name: BOT_ITEM_ATTRIBUTES.Energy,
    attribute_value: 400
  },
  {
    item_id: 13,
    attribute_name: BOT_ITEM_ATTRIBUTES.Strength,
    attribute_value: 200
  }
)

platformItems.push({
  id: 14,
  owner_type: BOT_ITEM_OWNER_TYPES.Platform,
  user_id: null,
  image: "items/armor_nomad.svg",
  name: "Nomad",
  price: 0.1,
  quantity: 1,
  equipped_quantity: 0,
  sale_quantity: 1,
  type: BOT_ITEM_TYPES.Armor,
  is_sale: true
})
platformItemAttributes.push(
  {
    item_id: 14,
    attribute_name: BOT_ITEM_ATTRIBUTES.Armor,
    attribute_value: 400
  },
  {
    item_id: 14,
    attribute_name: BOT_ITEM_ATTRIBUTES.Energy,
    attribute_value: 100
  },
  {
    item_id: 14,
    attribute_name: BOT_ITEM_ATTRIBUTES.Strength,
    attribute_value: 1000
  }
)

const defaultTasks = []

defaultTasks.push({
  type: 'invite',
  title: 'Invite 3 friends',
  description: '+50 MGT',
  icon: 'icons/user-group.svg',
  link: '',
  reward: 50,
  order: 1,
  created_at: new Date(),
  updated_at: new Date()
})

defaultTasks.push({
  type: 'wallet',
  title: 'Connect Ton Wallet',
  description: '+50 MGT',
  icon: 'icons/wallet.svg',
  link: '',
  reward: 50,
  order: 2,
  created_at: new Date(),
  updated_at: new Date()
})

defaultTasks.push({
  type: 'link',
  title: 'Join SubwaySurfersPlay community',
  description: '+50 MGT',
  icon: 'icons/social-telegram.svg',
  link: 'https://t.me/toncoin',
  reward: 50,
  order: 0,
  created_at: new Date(),
  updated_at: new Date()
})

module.exports = {
  fakeUsers,
  fakeScoreHistories,

  fakeAlliances,
  fakeAllianceMembers,

  defaultRobots,
  defaultRobotsAttributes,

  platformRobots,
  platformRobotsAttributes,

  defaultItems,
  defaultItemAttributes,

  platformItems,
  platformItemAttributes,

  defaultTasks
}
