import axios from "axios"

const baseURL = import.meta.env.VITE_API_URL || ""

function refreshToken() {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}/admin/auth/refresh-token`)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const api = () => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 20000,
    timeoutErrorMessage: "Timeout error occurred. Please try again later."
  })

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          await instance.post("/admin/auth/refresh-token")
          return instance(originalRequest)
        } catch (refreshError) {
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    }
  )

  return instance
}

export default api
