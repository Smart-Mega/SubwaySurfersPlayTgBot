import path, { dirname } from "path"
import { fileURLToPath } from "url"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react-swc"
import basicSsl from "@vitejs/plugin-basic-ssl"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    // plugins: [react()],
    plugins: [react(), basicSsl()],

    publicDir: "./public",

    server: {
      port: Number(process.env.VITE_PORT) || 5000
    },

    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "./src")
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
