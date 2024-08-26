import dotenv from "dotenv"

dotenv.config()

const DatabaseConfig = {
  dialect: String(process.env.API_DB_DIALECT) || "postgres",
  host: String(process.env.API_DB_HOST) || "",
  port: Number(process.env.API_DB_PORT) || 0,
  database: String(process.env.API_DB_DATABASE) || "",
  username: String(process.env.API_DB_USERNAME) || "",
  password: String(process.env.API_DB_PASSWORD) || ""
}

export default DatabaseConfig
