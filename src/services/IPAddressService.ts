import type { TablePagination } from '@/types'
import { fetchIpAddresses } from '@/api/ipAddress'
import { useIPAddressStore } from '@/stores/useIPAddressStore'

export const fetchIpAddressesService = async (pagination: TablePagination) => {
  const ipAddressStore = useIPAddressStore()

  ipAddressStore.setLoading({
    ipAdresses: true,
  })

  return await fetchIpAddresses(pagination)
    .then((res) => {
      ipAddressStore.setIPAddresses(res.data.data)

      const page = res.data.meta.current_page
      const lastPage = res.data.meta.last_page

      ipAddressStore.setPagination({
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
      ipAddressStore.setLoading({
        ipAdresses: false,
      })
    })
}
