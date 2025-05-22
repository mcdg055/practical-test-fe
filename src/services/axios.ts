import axios, { type AxiosInstance, type InternalAxiosRequestConfig, AxiosError } from 'axios'
import router from '@/router'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VUE_APP_API_BASE_URL || 'http://localhost:8000/api',
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

// Response interceptor with refresh token handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem('refresh_token')
      if (!refreshToken) {
        localStorage.removeItem('token')
        router.push({ name: 'login' })
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token
          return api(originalRequest)
        })
      }

      isRefreshing = true

      try {
        const { data } = await axios.post(
          import.meta.env.VUE_APP_API_BASE_URL || 'http://localhost:8000/api' + '/auth/refresh',
          null,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        )

        const token = data?.authorization?.token
        if (!token) throw new Error('Invalid refresh response')

        localStorage.setItem('token', token)
        api.defaults.headers.common['Authorization'] = 'Bearer ' + token
        processQueue(null, token)

        originalRequest.headers['Authorization'] = 'Bearer ' + token
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)

        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')

        setTimeout(() => {
          if (router.currentRoute.value.name !== 'login') {
            router.push({ name: 'login' })
          }
        }, 0)

        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export { api as axios }
