import api from "./api"

// Login
export const apiAdminLogin = (data: any) => api().post("/admin/auth/login", data)

// Logout
export const apiAdminLogout = () => api().post("/admin/auth/logout")

// Refresh Token
export const apiAdminRefreshToken = () => api().post("/admin/auth/refresh-token")

// Update Profile
export const apiAdminUpdateProfile = (data: any) => api().putForm("/admin/auth/profile", data)
