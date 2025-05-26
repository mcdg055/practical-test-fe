import { axios } from '@/services/axios'

export const login = async (data: { email: string; password: string }) => {
  return await axios.post('/login', data)
}

export const logout = async () => {
  return await axios.post('/logout')
}

export const fetchUserProfile = async () => {
  return await axios.get('/me')
}
