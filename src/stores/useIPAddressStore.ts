import { defineStore } from 'pinia'
import type { IPAddress, TablePagination } from '@/types'

interface Loading {
  ipAddresses?: boolean
  save?: boolean
  update?: boolean
}

export const useIPAddressStore = defineStore('ipAddress', {
  state: () => ({
    ipAddresses: [] as IPAddress[],
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
      ipAddresses: false,
      save: false,
      update: false,
    } as Loading,
  }),

  actions: {
    setIPAddresses(data: IPAddress[]) {
      this.ipAddresses = data
    },
    setPagination(data: TablePagination) {
      this.pagination = data
    },
    setLoading(loading: Loading) {
      this.loading = { ...this.loading, ...loading }
    },
    addIPAddress(ipAddress: IPAddress) {
      this.ipAddresses = [...this.ipAddresses, ipAddress]
    },
    updateIPAddress(ipAddress: IPAddress) {
      this.ipAddresses = this.ipAddresses.map((ip) => (ip.id === ipAddress.id ? ipAddress : ip))
    },
  },
})
