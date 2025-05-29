import { useActivityLogStore } from '@/stores/useActivityLogStore'
import { fetchActivityLogs } from './../api/activityLogs'
import type { TablePagination } from '@/types'

export const fetchActivityLogsService = async (pagination: TablePagination) => {
  const activityLogStore = useActivityLogStore()

  if (activityLogStore.loading.activityLogs) return

  activityLogStore.setLoading({
    activityLogs: true,
  })

  return await fetchActivityLogs(pagination)
    .then((res) => {
      activityLogStore.setActivityLogs(res.data.data)

      const page = res.data.meta.current_page
      const lastPage = res.data.meta.last_page

      activityLogStore.setPagination({
        page: page,
        perPage: res.data.meta.per_page,
        totalPages: lastPage,
        nextPage: page < lastPage ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
        lastPage: page === lastPage ? null : lastPage,
        firstPage: page != 1 ? 1 : null,
      })
    })
    .finally(() => {
      activityLogStore.setLoading({
        activityLogs: false,
      })
    })
}
