import type { User, TablePagination } from '@/types'
import { defineStore } from 'pinia'

interface Loading {
  users?: boolean
  roles?: boolean
  form?: boolean
  delete?: boolean
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    pagination: {
      page: 1,
      perPage: 10,
      totalPages: 1,
      nextPage: null,
      lastPage: null,
      prevPage: null,
      firstPage: null,
    } as TablePagination,
    loading: {
      users: false,
      roles: false,
      form: false,
      delete: false,
    },
    roles: [] as String[],
  }),
  actions: {
    setUsers(users: User[]) {
      this.users = users
    },
    setPagination(pagination: TablePagination) {
      this.pagination = pagination
    },
    setLoading(loading: Loading) {
      this.loading = { ...this.loading, ...loading }
    },
    setRoles(roles: String[]) {
      this.roles = roles
    },
    addUser(user: User) {
      this.users = [...this.users, user]
    },
    setPerPage(perPage: number) {
      this.pagination.perPage = perPage
    },
    updateUser(user: User) {
      this.users = this.users.map((u) => (u.id === user.id ? user : u))
    },
    deleteUser(userId: number) {
      this.users = this.users.filter((user) => user.id !== userId)
    },
  },
  getters: {
    getUsers: (state) => state.users,
    getRoles: (state) => state.roles,
    getPagination: (state) => state.pagination,
  },
})
