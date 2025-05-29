import { defineStore } from 'pinia'
import type { ActivityLog, TablePagination } from '@/types'

interface Loading {
  activityLogs: boolean
}

export const useActivityLogStore = defineStore('activityLogs', {
  state: () => ({
    activityLogs: [] as ActivityLog[],
    pagination: {
      page: 1,
      perPage: 10,
      totalPages: 1,
      nextPage: null,
      lastPage: null,
      prevPage: null,
      firstPage: null,
      search: '',
    } as TablePagination,
    loading: {
      activityLogs: false,
    } as Loading,
  }),

  actions: {
    setActivityLogs(data: ActivityLog[]) {
      this.activityLogs = data
    },
    setLoading(loading: Loading) {
      this.loading = { ...this.loading, ...loading }
    },
    setPagination(data: TablePagination) {
      this.pagination = data
    },
  },
})
