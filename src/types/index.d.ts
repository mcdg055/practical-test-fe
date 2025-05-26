export interface User {
  id?: number
  name: string
  email: string
  password?: string
  roles?: string[]
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
