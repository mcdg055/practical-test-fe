import { axios } from '@/services/axios'
import type { TablePagination } from '@/types'

export const fetchActivityLogs = async ({
  page = 1,
  perPage = 10,
  nextPage = null,
  lastPage = null,
  prevPage = null,
  firstPage = null,
  search = '',
}: TablePagination) => {
  return await axios.get('/activity-logs', {
    params: {
      page,
      perPage,
      nextPage,
      lastPage,
      prevPage,
      firstPage,
      search,
    },
  })
}
