import dotenv from "dotenv"

dotenv.config()

const JwtConfig = {
  secret: String(process.env.API_JWT_SECRET) || "",
  access_expiration_minutes: Number(process.env.API_JWT_ACCESS_EXPIRATION_MINUTES) || 5,
  refresh_expiration_days: Number(process.env.API_JWT_REFRESH_EXPIRATION_DAYS) || 30,
  reset_password_expiration_minutes:
    Number(process.env.API_JWT_RESET_PASSWORD_EXPIRATION_MINUTES) || 30,
  verify_email_expiration_minutes: Number(process.env.API_JWT_VERIFY_EMAIL_EXPIRATION_MINUTES) || 30
}

export default JwtConfig
