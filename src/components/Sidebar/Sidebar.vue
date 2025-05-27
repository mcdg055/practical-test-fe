<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import { Globe, LayoutDashboard, UsersRound } from 'lucide-vue-next'
import Logout from '@/components/Sidebar/Logout.vue'
import { ROLE_SUPER_ADMIN } from '@/constants'
import { useAuthStore } from '@/stores/useAuthStore'
import { computed } from 'vue'
import Skeleton from '../ui/skeleton/Skeleton.vue'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()

const { roles } = storeToRefs(authStore)

const sidebarItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Users',
    path: '/users',
    icon: UsersRound,
    roles: [ROLE_SUPER_ADMIN],
  },
  {
    name: 'IP Address',
    path: '/ip-address',
    icon: Globe,
  },
]

const visibleSidebarItems = computed(() => {
  const userRoles = roles.value || []
  return sidebarItems.filter((item) => {
    return !item.roles || item.roles.some((r) => userRoles.includes(r))
  })
})
</script>

<template>
  <div class="flex-grow max-w-[300px] h-full py-3 ps-3">
    <div class="bg-white h-full rounded-2xl drop-shadow-sm flex flex-col">
      <div class="p-5 flex items-center justify-center">
        <Logo />
      </div>
      <hr class="border-gray-200" />

      <div class="p-5">
        <template v-if="authStore.loading">
          <Skeleton
            v-for="i in sidebarItems.length"
            :key="`skeleton-${i}`"
            class="h-[32px] w-full mb-3"
          />
        </template>

        <template v-else>
          <div v-for="item in visibleSidebarItems" :key="item.name" class="mb-3">
            <router-link :to="item.path" class="flex items-center gap-3 text-sm font-semibold">
              <div
                class="bg-gray-200 rounded-lg w-[32px] h-[32px] flex items-center justify-center"
                :class="{ 'bg-primary text-white': $route.path === item.path }"
              >
                <component :is="item.icon" class="w-[14px] h-[14px]" />
              </div>
              {{ item.name }}
            </router-link>
          </div>
        </template>
      </div>

      <Logout />
    </div>
  </div>
</template>
