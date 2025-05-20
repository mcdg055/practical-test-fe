export interface User {
  id: number
  name: string
  email: string
  roles?: Role[]
}

export interface UserForm {
  name: string
  email: string
  password: string
}

export interface TablePagination {
  page: number
  perPage: number
  totalPages?: number
  nextPage?: null | number
  lastPage?: null | number
  prevPage?: null | number
  firstPage?: null | number
}
export interface Role {
  id: number
  name: string
}
