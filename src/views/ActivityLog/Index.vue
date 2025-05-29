<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue'
import { useActivityLogStore } from '@/stores/useActivityLogStore'
import { fetchActivityLogsService } from '@/services/activityLogService'
import ActivityLogsTable from './components/ActivityLogsTable.vue'
import { onBeforeMount } from 'vue'

const activityLogStore = useActivityLogStore()

onBeforeMount(() => {
  fetchActivityLogsService(activityLogStore.pagination)
})
</script>

<template>
  <AppLayout>
    <div class="bg-white drop-shadow-lg rounded-2xl p-5 mt-5">
      <div>
        <h1 class="font-bold text-lg">Activity Logs</h1>
      </div>
      <div>
        <ActivityLogsTable />
      </div>
    </div>
  </AppLayout>
</template>
