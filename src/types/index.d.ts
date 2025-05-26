export interface User {
  id?: number
  name: string
  email: string
  password?: string
  roles?: string[]
  permissions?: string[]
}

export interface TablePagination {
  page: number
  perPage: number
  totalPages?: number
  nextPage?: null | number
  lastPage?: null | number
  prevPage?: null | number
  firstPage?: null | number
  search?: string
}

export interface IPAddress {
  id?: number
  ip: string
  type: string
  label: string
  comment?: string
  createdAt?: string
  updatedAt?: string
  user?: User
}
