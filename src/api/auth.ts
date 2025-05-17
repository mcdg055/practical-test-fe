import { axios } from '@/services/axios'

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post('/login', data)
    return response
  } catch (error) {
    throw error
  }
}

export const logout = async () => {
  return await axios.post('/logout')
}
