import dotenv from "dotenv"

dotenv.config()

const TelegramConfig = {
  bot_token: String(process.env.API_TELEGRAM_BOT_TOKEN),
  telegram_core_api: String(process.env.API_TELEGRAM_URL)
}

export default TelegramConfig
