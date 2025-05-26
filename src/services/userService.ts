import { fetchUsers, fetchRoles, saveUser, updateUser, deleteUser } from './../api/users'
import { useUsersStore } from '@/stores/users'
import type { TablePagination } from '@/types'

export const fetchUsersService = async (pagination: TablePagination) => {
  const userStore = useUsersStore()

  if (userStore.loading.users) return

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

  if (usersStore.loading.roles) return

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

export const saveUserService = async (data: any) => {
  const usersStore = useUsersStore()

  usersStore.setLoading({
    form: true,
  })

  return await saveUser(data)
    .then((res) => {
      usersStore.addUser(res.data)
    })
    .catch((error) => {})
    .finally(() => {
      usersStore.setLoading({
        form: false,
      })
    })
}

export const updateUserService = async (id: number, data: any) => {
  const usersStore = useUsersStore()

  usersStore.setLoading({
    form: true,
  })

  return await updateUser(id, data)
    .then((res) => {
      usersStore.updateUser(res.data)
    })
    .catch((error) => {})
    .finally(() => {
      usersStore.setLoading({
        form: false,
      })
    })
}

export const deleteUserService = async (id: number) => {
  const usersStore = useUsersStore()

  usersStore.setLoading({
    delete: true,
  })

  return await deleteUser(id)
    .then((res) => {
      usersStore.deleteUser(id)
    })
    .catch((error) => {})
    .finally(() => {
      usersStore.setLoading({
        delete: false,
      })
    })
}
