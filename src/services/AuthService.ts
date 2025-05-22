import { login, logout } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

export const loginService = async (email: string, password: string) => {
  const authStore = useAuthStore()

  authStore.setLoading(true)

  return await login({ email, password })
    .then((res) => {
      localStorage.setItem('token', res.data.authorization.token)
      localStorage.setItem('refresh_token', res.data.authorization.refresh_token)
      authStore.setUser(res.data.user)
    })
    .catch((error) => {
      if (error.status === 401) authStore.setIsInvalid(true)
    })
    .finally(() => {
      authStore.setLoading(false)
    })
}

export const logoutService = async () => {
  const authStore = useAuthStore()

  return await logout().then(() => {
    authStore.clearUser()
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
  })
}
