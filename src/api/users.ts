import { axios } from '@/services/axios'
import type { TablePagination, UserForm } from '@/types'

export const fetchUsers = async ({
  page = 1,
  perPage = 10,
  nextPage = null,
  lastPage = null,
  prevPage = null,
  firstPage = null,
}: TablePagination) => {
  return await axios.get('/users', {
    params: {
      page,
      perPage,
      nextPage,
      lastPage,
      prevPage,
      firstPage,
    },
  })
}

export const fetchRoles = async () => {
  return await axios.get('/roles')
}

export const saveUser = async (data: UserForm) => {
  return await axios.post('/users', data)
}
