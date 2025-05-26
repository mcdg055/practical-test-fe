import { fetchUserProfile, login, logout } from '@/api/auth'
import { useAuthStore } from '@/stores/useAuthStore'

export const loginService = async (email: string, password: string) => {
  const authStore = useAuthStore()

  authStore.setLoading(true)

  return await login({ email, password })
    .then((res) => {
      localStorage.setItem('token', res.data.authorization.token)
      localStorage.setItem('refresh_token', res.data.authorization.refresh_token)
      authStore.setUser(res.data.user)
      authStore.setRoles(res.data.user.roles || [])
      authStore.setPermissions(res.data.user.permissions || [])
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

export const fetchUserProfileService = async () => {
  const authStore = useAuthStore()

  if (authStore.loading || authStore.user) return

  authStore.setLoading(true)

  return await fetchUserProfile()
    .then((response) => {
      if (response.status === 200) {
        authStore.setUser(response.data)
        authStore.setRoles(response.data.roles || [])
        authStore.setPermissions(response.data.permissions || [])
      }
    })
    .finally(() => {
      authStore.setLoading(false)
    })
}
