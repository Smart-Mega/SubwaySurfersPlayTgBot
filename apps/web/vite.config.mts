import { fileURLToPath } from "url"
import path, { dirname } from "path"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    plugins: [react()],
    server: {
      port: Number(process.env.VITE_PORT) || 3000
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "./src")
        },
        {
          find: "@ui",
          replacement: path.resolve(__dirname, "../../packages/ui/src")
        },
        {
          find: "@util",
          replacement: path.resolve(__dirname, "../../packages/util")
        },
        {
          find: "@i18n",
          replacement: path.resolve(__dirname, "../../packages/i18n")
        }
      ]
    }
  }
})
