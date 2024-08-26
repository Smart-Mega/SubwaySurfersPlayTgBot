import dotenv from "dotenv"

dotenv.config()

const LogConfig = {
  folder: String(process.env.API_LOG_FOLDER) || "",
  file: String(process.env.API_LOG_FILE) || "",
  level: String(process.env.API_LOG_LEVEL) || ""
}

export default LogConfig
