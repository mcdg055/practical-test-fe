<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, onMounted, watch } from 'vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()
const router = useRouter()

const pageTitle = computed(() => router.currentRoute.value.meta.title as string)

document.title = pageTitle.value

const intialsUrl = computed(() => {
  return `https://ui-avatars.com/api/?name=${authStore.user?.name}&background=random&bold=true&format=svg`
})

const avatarFallback = computed(() => {
  return authStore.user?.name
    ? authStore.user.name
        .split(' ')
        .filter((part) => part.length > 0)
        .map((part) => part[0].toUpperCase())
        .join('')
    : '?'
})
</script>

<template>
  <div class="flex items-stretch h-screen">
    <Sidebar />
    <main class="h-screen flex-grow">
      <div class="overflow-y-auto h-full px-4 py-3 ps-8">
        <nav class="p-4 flex items-center justify-between bg-white rounded-xl drop-shadow-xl">
          <div>
            <div class="breadcrumb text-sm">
              <span class="text-gray-500">Pages</span> / <span>{{ pageTitle }}</span>
            </div>
            <div>
              <h1 class="text-md font-bold">{{ pageTitle }}</h1>
            </div>
          </div>

          <div v-if="authStore.user" class="flex items-center gap-4 me-6">
            <Avatar class="w-10 h-10">
              <AvatarImage :src="intialsUrl" :alt="authStore.user.name || 'Avatar'" />
              <AvatarFallback class="text-sm font-semibold">
                {{ avatarFallback }}
              </AvatarFallback>
            </Avatar>
            <div>
              <span class="text-sm font-semibold">{{ authStore.user.name }}</span>
              <div class="text-xs text-gray-500">{{ authStore.user.email }}</div>
            </div>
          </div>
        </nav>

        <slot />
      </div>
    </main>
  </div>
</template>
