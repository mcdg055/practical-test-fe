<script setup lang="ts">
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const pageTitle = router.currentRoute.value.meta.title
</script>

<template>
  <div class="flex items-stretch h-screen">
    <Sidebar />
    <main class="h-full flex-grow px-4 py-3 ps-8">
      <nav class="p-4 flex items-center justify-between bg-white rounded-xl drop-shadow-xl">
        <div>
          <div class="breadcrumb text-sm">
            <span class="text-gray-500">Pages</span> / <span>{{ pageTitle }}</span>
          </div>
          <div>
            <h1 class="text-md font-bold">{{ pageTitle }}</h1>
          </div>
        </div>
      </nav>

      <slot />
    </main>
  </div>
</template>
