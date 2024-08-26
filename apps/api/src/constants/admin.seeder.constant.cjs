const { faker } = require("@faker-js/faker/locale/ru")
const bcrypt = require("bcrypt")
const uuid = require("uuid")

/**
 * Constant
 */
const ADMIN_USER_ROLES = {
  Administrator: "administrator",
  Developer: "enterprise"
}

const ADMIN_USER_STATUS = {
  ACTIVE: 1,
  BLOCKED: 2
}

/**
 * Administrators
 */
const adminUsers = [
  {
    uuid: uuid.v4(),
    role: ADMIN_USER_ROLES.Administrator,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: "superadmin@gmail.com",
    email_verified: true,
    mobile_number: faker.phone.number().replace(/ /g, ""),
    password: bcrypt.hashSync("123456789", 10),
    status: ADMIN_USER_STATUS.ACTIVE,
    image: null
  },
  {
    uuid: uuid.v4(),
    role: ADMIN_USER_ROLES.Developer,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: "luckydev@gmail.com",
    email_verified: true,
    mobile_number: faker.phone.number().replace(/ /g, ""),
    password: bcrypt.hashSync("123456789", 10),
    status: ADMIN_USER_STATUS.ACTIVE,
    image: null
  }
]

module.exports = {
  adminUsers
}
