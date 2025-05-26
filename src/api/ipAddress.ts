import { axios } from '@/services/axios'
import type { TablePagination, IPAddress } from '@/types'

export const fetchIpAddresses = async ({
  page = 1,
  perPage = 10,
  nextPage = null,
  lastPage = null,
  prevPage = null,
  firstPage = null,
  search = '',
}: TablePagination) => {
  return await axios.get('/ip-addresses', {
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

export const saveIPAddress = async (data: IPAddress) => {
  return await axios.post('/ip-addresses', data)
}

export const updateIPAddress = async (id: number, data: IPAddress) => {
  return await axios.patch(`/ip-addresses/${id}`, data)
}

export const deleteIPAdress = async (id: number) => {
  return await axios.delete(`/ip-addresses/${id}`)
}
