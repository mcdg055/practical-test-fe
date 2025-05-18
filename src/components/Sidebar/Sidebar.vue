<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import { LayoutDashboard, UsersRound } from 'lucide-vue-next'
import Logout from '@/components/Sidebar/Logout.vue'

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
  },
]
</script>

<template>
  <div class="flex-grow max-w-[300px] h-full py-3 ps-3">
    <div class="bg-white h-full rounded-2xl drop-shadow-sm flex flex-col">
      <div class="p-5 flex items-center justify-center">
        <Logo />
      </div>
      <hr class="border-gray-200" />

      <div class="p-5">
        <div v-for="item in sidebarItems" :key="item.name" class="mb-4">
          <router-link :to="item.path" class="flex items-center gap-3 text-sm">
            <div
              class="bg-gray-200 rounded-lg w-[32px] h-[32px] flex items-center justify-center"
              :class="{
                'bg-primary text-white': $route.path === item.path,
              }"
            >
              <component :is="item.icon" class="w-[14px] h-[14px]" />
            </div>
            {{ item.name }}
          </router-link>
        </div>
      </div>

      <Logout />
    </div>
  </div>
</template>
