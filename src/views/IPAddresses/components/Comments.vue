<script setup lang="ts">
import { CalendarIcon } from 'lucide-vue-next'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

const props = defineProps<{
  comment: string
}>()
</script>

<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <Button variant="link" class="max-w-[150px] p-0 flex items-center justify-start">
        <span class="truncate">{{ comment }}</span>
      </Button>
    </HoverCardTrigger>
    <HoverCardContent class="w-80 border border-gray-200 dark:border-gray-700">
      <div class="flex justify-between space-x-4">
        {{ comment }}
      </div>
    </HoverCardContent>
  </HoverCard>
</template>
