<script setup lang="ts">
import { LOG_ACTIONS } from '@/constants'

defineProps<{
  action: string
}>()
</script>
<template>
  <div
    class="action-type relative font-semibold text-[12px] border border-gray-200 rounded-xl ps-6 pe-3 py-1 w-fit"
    :class="{
      'text-green-600 before:bg-green-600 bg-green-50 border-green-200':
        action === LOG_ACTIONS.CREATE,
      'text-orange-400 before:bg-orange-400 bg-orange-50 border-orange-200':
        action === LOG_ACTIONS.UPDATE,
      'text-red-600 before:bg-red-600 bg-red-50 border-red-200': action === LOG_ACTIONS.DELETE,
      'text-blue-600 before:bg-blue-600 bg-blue-50 border-blue-200': action === LOG_ACTIONS.LOGIN,
      'text-gray-600 before:bg-gray-600 bg-gray-50 border-gray-200': action === LOG_ACTIONS.LOGOUT,
    }"
  >
    {{ action }}
  </div>
</template>

<style scoped>
.action-type::before {
  content: '';
  position: absolute;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  width: 6px;
  height: 6px;
}
</style>
