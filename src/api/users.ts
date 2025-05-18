import { axios } from '@/services/axios'

export const fetchUsers = async ({
  page = 1,
  perPage = 10,
  search = '',
}: {
  page: number
  perPage: number
  search: string
}) => {
  return await axios.get('/users', {
    params: {
      page,
      perPage,
      search,
    },
  })
}

export const logout = async () => {
  return await axios.post('/logout')
}
