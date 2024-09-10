import dotenv from "dotenv"

dotenv.config()

const DatabaseConfig = {
  dialect: String(process.env.API_DB_DIALECT) || "postgres",
  host: String(process.env.API_DB_HOST) || "127.0.0.1",
  port: Number(process.env.API_DB_PORT) || 5432,
  database: String(process.env.API_DB_DATABASE) || "megatondb",
  username: String(process.env.API_DB_USERNAME) || "postgres",
  password: String(process.env.API_DB_PASSWORD) || "123"
}

export default DatabaseConfig
