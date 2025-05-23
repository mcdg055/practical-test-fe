<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import Button from './Button.vue'
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    loading?: boolean
    loadingText?: string
  }>(),
  {
    loading: false,
    loadingText: 'Loading...',
  },
)
</script>

<template>
  <Button v-bind="$attrs" :disabled="loading">
    <div v-if="loading" class="flex items-center justify-center">
      <Loader2 class="w-4 h-4 mr-2 animate-spin" /> {{ loadingText }}
    </div>
    <slot v-else />
  </Button>
</template>
