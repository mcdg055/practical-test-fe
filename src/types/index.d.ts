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

export interface ActivityLog {
  id: number
  description: string
  log_name: string
  event: string
  causer: Record<string, any> | null
  properties: Record<string, any> | null
  subject_type: string
  subject_id: string
  created_at: string
}
