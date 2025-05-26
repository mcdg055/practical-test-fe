import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    roles: [] as string[],
    permissions: [] as string[],
    loading: false as boolean,
    isInvalid: false as boolean,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
    hasRole: (state) => (role: string) => {
      return state.roles.includes(role)
    },
    hasPermission: (state) => (permission: string) => {
      return state.permissions.includes(permission)
    },
  },
  actions: {
    setUser(user: User) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
    setLoading(loading: boolean) {
      this.loading = loading
    },
    setIsInvalid(isInvalid: boolean) {
      this.isInvalid = isInvalid
    },
    setRoles(roles: string[]) {
      this.roles = roles
    },
    setPermissions(permissions: string[]) {
      this.permissions = permissions
    },
  },
})
