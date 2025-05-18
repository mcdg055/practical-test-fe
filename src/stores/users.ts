import type { User, tableFilter } from '@/types'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    filter: {
      page: 1,
      perPage: 10,
      search: '',
    } as tableFilter,
    loading: {
      users: false,
    },
  }),
  actions: {
    setUsers(users: User[]) {
      this.users = users
    },
    setFilters(filter: tableFilter) {
      this.filter = filter
    },
    setLoading(loading: boolean) {
      this.loading.users = loading
    },
  },
  getters: {
    getUsers: (state) => state.users,
  },
})
