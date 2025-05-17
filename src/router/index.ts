import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { axios } from '@/services/axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Authentication/Login.vue'),
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/Dashboard/Index.vue'),
      meta: {
        requiresAuth: true,
        title: 'Dashboard',
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/Users/Index.vue'),
      meta: {
        requiresAuth: true,
        title: 'Users',
      },
    },
  ],
})

async function fetchUser() {
  const authStore = useAuthStore()

  if (authStore.user === null) {
    await axios.get('/me').then((response) => {
      if (response.status === 200) {
        authStore.setUser(response.data)
      }
    })
  }
}

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null

  if (isAuthenticated) {
    fetchUser()
  }

  const { title } = to.meta

  if (title) {
    document.title = title as string
  }

  if (to.name === 'login' && isAuthenticated) {
    next({ name: 'dashboard' })
    return
  }

  if (!isAuthenticated && to.name !== 'login') {
    next({ name: 'login' })
    return
  }

  next()
})

export default router
