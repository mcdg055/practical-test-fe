import { createRouter, createWebHistory } from 'vue-router'
import { fetchUserProfileService } from '@/services/authService'
import { ROLE_SUPER_ADMIN } from '@/constants'
import { useAuthStore } from '@/stores/useAuthStore'

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
      name: 'ip-address',
      component: () => import('../views/IPAddresses/Index.vue'),
      meta: {
        requiresAuth: true,
        title: 'Manage IP Addresses',
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/Users/Index.vue'),
      meta: {
        requiresAuth: true,
        title: 'Manage Users',
        roles: [ROLE_SUPER_ADMIN],
      },
    },
    {
      path: '/activity-logs',
      name: 'activity-logs',
      component: () => import('../views/ActivityLog/Index.vue'),
      meta: {
        requiresAuth: true,
        title: 'Activity Logs',
        roles: [ROLE_SUPER_ADMIN],
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null

  if (isAuthenticated) {
    fetchUserProfileService()
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
    return
  }

  if (to.meta.roles && isAuthenticated) {
    const authStore = useAuthStore()

    const userRoles = authStore.roles || []

    if (userRoles.includes(ROLE_SUPER_ADMIN)) {
      next()
      return
    }

    if (!authStore.roles.some((role) => to.meta.roles.includes(role))) {
      next({ name: 'ip-address' })
      return
    }
  }

  const { title } = to.meta

  if (title) {
    document.title = title as string
  }

  if (to.name === 'login' && isAuthenticated) {
    next({ name: 'ip-address' })
    return
  }

  next()
})

export default router
