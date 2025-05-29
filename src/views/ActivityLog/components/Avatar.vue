<script setup lang="ts">
import { computed } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Causer {
  id: number
  name: string
  email: string
}

const props = defineProps<{
  causer: Causer
}>()

const intialsUrl = computed(() => {
  return `https://ui-avatars.com/api/?name=${props.causer.name}&background=random&bold=true&format=svg`
})

const avatarFallback = computed(() =>
  props.causer.name
    .split(' ')
    .filter((part) => part.length > 0)
    .map((part) => part[0].toUpperCase())
    .join(''),
)
</script>
<template>
  <div class="flex items-center gap-2 py-1">
    <Avatar class="w-9 h-9">
      <AvatarImage :src="intialsUrl" :alt="causer.name || 'Avatar'" />
      <AvatarFallback class="text-sm font-semibold">
        {{ avatarFallback }}
      </AvatarFallback>
    </Avatar>
    <div class="flex flex-col">
      <div class="font-semibold">{{ causer.name }}</div>
      <div class="text-xs text-gray-500">{{ causer.email }}</div>
    </div>
  </div>
</template>
