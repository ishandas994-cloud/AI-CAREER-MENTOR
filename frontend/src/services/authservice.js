import api from './api'
 
// ─── Auth Service ─────────────────────────────────────────────────────────────
 
/**
 * Register a new user
 * @param {{ name: string, email: string, password: string }} data
 */
export const register = async (data) => {
  const res = await api.post('/auth/register', data)
  if (res.token) {
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
  }
  return res
}
 
/**
 * Login an existing user
 * @param {{ email: string, password: string }} credentials
 */
export const login = async (credentials) => {
  const res = await api.post('/auth/login', credentials)
  if (res.token) {
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
  }
  return res
}
 
/**
 * Logout – clear local state
 */
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
 
/**
 * Get the currently logged-in user from localStorage
 */
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  } catch {
    return null
  }
}
 
/**
 * Check if a user is currently authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}
 
/**
 * Fetch current user profile from the server
 */
export const fetchProfile = async () => {
  return api.get('/auth/me')
}
 
/**
 * Update user profile
 * @param {{ name?: string, title?: string, bio?: string }} updates
 */
export const updateProfile = async (updates) => {
  const res = await api.put('/auth/me', updates)
  if (res.user) {
    localStorage.setItem('user', JSON.stringify(res.user))
  }
  return res
}
 
/**
 * Change password
 * @param {{ currentPassword: string, newPassword: string }} data
 */
export const changePassword = async (data) => {
  return api.put('/auth/change-password', data)
}
 
/**
 * Request a password reset email
 * @param {string} email
 */
export const forgotPassword = async (email) => {
  return api.post('/auth/forgot-password', { email })
}
 
/**
 * Reset password using the token from email
 * @param {{ token: string, newPassword: string }} data
 */
export const resetPassword = async (data) => {
  return api.post('/auth/reset-password', data)
}
 
const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  fetchProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
}
 
export default authService