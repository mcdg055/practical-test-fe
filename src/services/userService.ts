import { fetchUsers, fetchRoles } from './../api/users'
import { useUsersStore } from '@/stores/users'
import type { TablePagination } from '@/types'

export const fetchUsersService = async (pagination: TablePagination) => {
  const userStore = useUsersStore()

  userStore.setLoading({
    users: true,
  })

  return await fetchUsers(pagination)
    .then((res) => {
      userStore.setUsers(res.data.data)

      const page = res.data.meta.current_page
      const lastPage = res.data.meta.last_page

      userStore.setPagination({
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
      userStore.setLoading({
        users: false,
      })
    })
}

export const fetchRolesService = async () => {
  const usersStore = useUsersStore()
  usersStore.setLoading({
    roles: true,
  })
  return await fetchRoles()
    .then((res) => {
      usersStore.setRoles(res.data)
    })
    .finally(() => {
      usersStore.setLoading({
        roles: false,
      })
    })
}
