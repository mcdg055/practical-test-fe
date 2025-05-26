import { updateUserService } from './userService'
import type { IPAddress, TablePagination } from '@/types'
import { fetchIpAddresses, saveIPAddress } from '@/api/ipAddress'
import { useIPAddressStore } from '@/stores/useIPAddressStore'
import { storeToRefs } from 'pinia'

export const fetchIpAddressesService = async (pagination: TablePagination) => {
  const ipAddressStore = useIPAddressStore()

  const { loading } = storeToRefs(ipAddressStore)

  if (loading.value.ipAddresses) return

  ipAddressStore.setLoading({
    ipAddresses: true,
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
        ipAddresses: false,
      })
    })
}

export const saveIpAddressService = async (ipAddress: IPAddress) => {
  const ipAddressStore = useIPAddressStore()

  ipAddressStore.setLoading({
    save: true,
  })
  return await saveIPAddress(ipAddress)
    .then((res) => {
      ipAddressStore.addIPAddress(res.data)
    })
    .finally(() => {
      ipAddressStore.setLoading({
        save: false,
      })
    })
}

export const updateIpAddressService = async (id: number, ipAddress: IPAddress) => {}
