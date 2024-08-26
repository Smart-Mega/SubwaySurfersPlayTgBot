import dotenv from "dotenv"

dotenv.config()

const SendgridConfig = {
  email_from: String(process.env.API_SENDGRID_EMAIL_FROM),
  api_key: String(process.env.API_SENDGRID_API_KEY)
}

export default SendgridConfig
