import dotenv from "dotenv"

dotenv.config()

const AppConfig = {
  node_env: String(process.env.API_NODE_ENV),
  port: Number(process.env.API_PORT) || 5000,
  web_url: String(process.env.API_WEB_URL) || "",
  admin_url: String(process.env.API_ADMIN_URL) || "",
  bot_url: String(process.env.API_BOT_URL) || "",
  bcrypt_salt: Number(process.env.API_BCRYPT_SALT) || 10
}

export default AppConfig
