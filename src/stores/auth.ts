import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false as boolean,
    isInvalid: false as boolean,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
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
  },
})
