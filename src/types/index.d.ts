export interface User {
  id: number
  name: string
  email: string
}

export interface tableFilter {
  page: number
  perPage: number
  search: string
}
